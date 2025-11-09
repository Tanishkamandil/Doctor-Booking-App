import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData,
    userData,
  } = useContext(AppContext);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch Doctor Info
  const fetchDocInfo = () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
  };

  // ✅ Get Available Slots (7 Days)
  const getAvailableSlots = () => {
    if (!docInfo) return;

    const slotsArray = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const dateObj = new Date(today);
      dateObj.setDate(today.getDate() + i);

      let startTime = new Date(dateObj);
      let endTime = new Date(dateObj);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        const now = new Date();

        if (now.getHours() >= 21) {
          slotsArray.push([]);
          continue;
        }

        startTime = new Date(now);
        if (startTime.getHours() < 10) {
          startTime.setHours(10, 0, 0, 0);
        } else {
          const minutes = startTime.getMinutes();
          startTime.setMinutes(minutes > 30 ? 60 : 30, 0, 0);
        }
      } else {
        startTime.setHours(10, 0, 0, 0);
      }

      const dailySlots = [];
      const slotDate = `${startTime.getDate()}-${
        startTime.getMonth() + 1
      }-${startTime.getFullYear()}`;
      const bookedSlots = docInfo.slots_booked?.[slotDate] || [];

      while (startTime < endTime) {
        const time = startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        if (!bookedSlots.includes(time)) {
          dailySlots.push({
            datetime: new Date(startTime),
            time,
          });
        }

        startTime.setMinutes(startTime.getMinutes() + 30);
      }

      slotsArray.push(dailySlots);
    }

    setDocSlots(slotsArray);
  };

  // ✅ Book Appointment Call
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.error("Please select a time slot");
      return;
    }

    const selectedSlot = docSlots[slotIndex].find(
      (slot) => slot.time === slotTime
    );

    if (!selectedSlot) {
      toast.error("Invalid slot selection");
      return;
    }

    const date = selectedSlot.datetime;
    const slotDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    const payload = {
      docId,
      slotDate,
      slotTime,
      userId: userData._id,
      amount: docInfo.fees,
    };

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        payload,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Appointment booked successfully");
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* ✅ Doctor Details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="w-full bg-primary sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 shadow-md">
            <p className="text-2xl font-medium flex items-center gap-2">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <p className="text-sm mt-1 text-gray-600">
              {docInfo.degree} – {docInfo.speciality} ({docInfo.experience})
            </p>

            <p className="font-medium mt-4 text-sm text-gray-900">About</p>
            <p className="text-gray-500">{docInfo.about}</p>

            <p className="text-gray-500 font-medium mt-4">
              Appointment Fee: {currencySymbol}
              {docInfo.fees}
            </p>
          </div>
        </div>

        {/* ✅ Slot Selector */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>

          {/* Dates */}
          <div className="flex items-center overflow-x-scroll gap-3 mt-4">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime("");
                  }}
                  className={`py-4 px-4 text-center border rounded-full cursor-pointer min-w-16 ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "bg-white border-gray-200 text-gray-600"
                  }`}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* Times */}
          <div className="flex overflow-x-scroll gap-3 mt-4">
            {docSlots.length > 0 &&
              docSlots[slotIndex]?.map((slot, index) => (
                <p
                  key={index}
                  className={`text-sm px-5 py-2 rounded-full cursor-pointer ${
                    slotTime === slot.time
                      ? "bg-primary text-white"
                      : "border border-gray-300 text-gray-500"
                  }`}
                  onClick={() => setSlotTime(slot.time)}
                >
                  {slot.time.toLowerCase()}
                </p>
              ))}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-primary text-white px-14 py-3 rounded-full my-6 text-sm"
          >
            Book Appointment
          </button>
        </div>

        {/* ✅ Recommended Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
