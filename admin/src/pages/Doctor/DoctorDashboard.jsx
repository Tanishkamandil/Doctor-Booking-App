import React, { useEffect, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const {
    dashData,
    getDashData,
    dToken,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-5">
        {/* ==== Summary Cards ==== */}
        <div className="flex flex-wrap gap-3">
          {/* Earning */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="Earnings" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency}
                {dashData.earnings}
              </p>
              <p className="text-gray-400">Earning</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              className="w-14"
              src={assets.appointments_icon}
              alt="Appointments"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="Patients" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        {/* ==== Latest Bookings ==== */}
        <div className="bg-white mt-10 rounded border">
          <div className="flex items-center gap-2.5 px-4 pt-4 pb-2 rounded-t border-b border-gray-200 bg-white">
            <img src={assets.list_icon} alt="list" />
            <p className="font-medium text-gray-700">Latest Bookings</p>
          </div>
          <div className="mt-2 border-t border-gray-200">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b px-6 py-3 hover:bg-gray-100 transition-all"
              >
                {/* Left: Patient Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.userData.image}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.userData.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                </div>

                {/* Right: Status or Actions */}
                <div className="flex items-center gap-3">
                  {item.cancelled ? (
                    <p className="text-red-500 font-medium text-sm">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 font-medium text-sm">
                      Completed
                    </p>
                  ) : (
                    <div className="flex items-center gap-3">
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        className="w-7 cursor-pointer hover:scale-110 transition-transform"
                        src={assets.cancel_icon}
                        alt="Cancel"
                        title="Cancel Appointment"
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        className="w-7 cursor-pointer hover:scale-110 transition-transform"
                        src={assets.tick_icon}
                        alt="Complete"
                        title="Mark as Completed"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
