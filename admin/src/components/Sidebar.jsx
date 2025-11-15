import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const [open, setOpen] = useState(false); // mobile menu state

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-3">
        <img
          src={assets.menu_icon}
          className="w-7 cursor-pointer"
          onClick={() => setOpen(true)}
          alt=""
        />
      </div>

      {/* Sidebar Container */}
      <div
        className={`fixed md:static top-0 left-0 bg-white border-r min-h-screen z-30 transition-all duration-300 
        ${open ? "w-60" : "w-0 md:w-60"} overflow-hidden`}
      >
        {/* Close Button only mobile */}
        <div className="md:hidden flex justify-end p-3">
          <img
            src={assets.cross_icon}
            className="w-7 cursor-pointer"
            onClick={() => setOpen(false)}
            alt=""
          />
        </div>

        {/* Admin Sidebar */}
        {aToken && (
          <ul className="text-[#515151] mt-5">
            <NavLink
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-5 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
              to={"/admin-dashboard"}
            >
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-5 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
              to={"/all-appointments"}
            >
              <img src={assets.appointment_icon} alt="" />
              <p>Appoinment</p>
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-5 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
              to={"/add-doctor"}
            >
              <img src={assets.add_icon} alt="" />
              <p>Add Doctor</p>
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-5 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
              to={"/doctors-list"}
            >
              <img src={assets.people_icon} alt="" />
              <p>Doctors List</p>
            </NavLink>
          </ul>
        )}

        {/* Doctor Sidebar */}
        {dToken && (
          <ul className="text-[#515151] mt-5">
            <NavLink
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-5 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
              to={"/doctor-dashboard"}
            >
              <img src={assets.home_icon} alt="" />
              <p>Dashboard</p>
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-5 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
              to={"/doctor-appointments"}
            >
              <img src={assets.appointment_icon} alt="" />
              <p>Appointment</p>
            </NavLink>

            <NavLink
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-5 cursor-pointer ${
                  isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
                }`
              }
              to={"/doctor-profile"}
            >
              <img src={assets.people_icon} alt="" />
              <p>Profile</p>
            </NavLink>
          </ul>
        )}
      </div>
    </>
  );
};

export default Sidebar;
