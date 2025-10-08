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
  // Fetch doctor info based on docId

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };
  const getAvailableSlots = async () => {
    // 🧠 Prevent running before docInfo is ready
    if (!docInfo || !docInfo.slots_booked) {
      return;
    }

    setDocSlots([]);

    const today = new Date();
    const slotsArray = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      let timeSlots = [];

      if (i === 0) {
        const now = new Date();

        if (now.getHours() >= 21) {
          timeSlots = [];
        } else {
          const start = new Date(now);
          if (start.getHours() < 10) start.setHours(10, 0, 0, 0);
          else {
            const minutes = start.getMinutes();
            start.setMinutes(minutes > 30 ? 60 : 30, 0, 0);
          }
          currentDate.setHours(start.getHours(), start.getMinutes(), 0, 0);
        }
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const slotDate = `${currentDate.getDate()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getFullYear()}`;

        const isSlotAvailable = !(
          docInfo.slots_booked?.[slotDate] &&
          docInfo.slots_booked[slotDate].includes(formattedTime)
        );

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slotsArray.push(timeSlots);
    }

    setDocSlots(slotsArray);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      const slotDate = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;

      const payload = {
        docId,
        slotDate,
        slotTime,
        userId: userData._id,
        userData,
        docData: docInfo,
        amount: docInfo.fees,
        payment: true,
        date: Date.now(),
      };

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        payload,
        {
          headers: { token },
        }
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
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div>
        {/* Doctor details */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="w-full bg-primary sm:max-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>
          {/* Doctor info */}
          <div className="flex-1 border border-gray-400  rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-md">
            <p className="text-2xl font-medium flex items-center gap-2">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* doctor about  */}
            <div>
              <p className="font-medium mt-4 mb-1 flex items-center gap-1 text-sm text-gray-900">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className=" text-gray-500 font-medium mt-4">
              Appointment fee:
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex items-center w-full overflow-x-scroll gap-3 mt-4">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`py-6 text-center border rounded-full min-w-16 cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "bg-white border border-gray-200 text-gray-700"
                  }`}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* time slots */}
          <div className="flex items-center w-full overflow-x-scroll gap-3 mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  key={index}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  onClick={() => setSlotTime(item.time)}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookAppointment}
            className="bg-primary text-white px-14 py-3 rounded-full my-6 text-sm"
          >
            Book an appointment
          </button>
        </div>
        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
