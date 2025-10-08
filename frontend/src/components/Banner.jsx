import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex md:px-14 lg:px-12 px-6 my-20 md:mx-10 justify-center bg-primary rounded-lg sm:px-10">
      {/*---left side ---*/}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 ">
        <div className="text-xl font-semibold sm:text-2xl md:text3xl lg:text-5xl text-white">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button
          className="bg-white text-gray-600 px-8 py-3 rounded-full  mt-6 hover:scale-105 transition-all duration-500"
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
        >
          Create Account
        </button>
      </div>
      {/*---right side ---*/}
      <div className="hidden md:block w-1/2 lg:w-[370px] relative ">
        <img src={assets.appointment_img} alt="" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Banner;
