import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row bg-primary rounded-lg px-6 md:px-10 lg:px-20 overflow-hidden">
      {/* Left */}
      <div className="flex flex-col items-center md:items-start justify-center gap-4 py-10 md:py-[10vw] m-auto md:w-1/2 text-center md:text-left w-full">
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Book Appointment <br />
          With Trusted Doctors
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm">
          <img className="w-24 sm:w-28" src={assets.group_profiles} alt="" />
          <p className="max-w-xs sm:max-w-sm">
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          className="bg-white text-gray-600 py-3 px-8 rounded-full flex items-center gap-2 text-sm hover:scale-105 transition-all duration-300"
        >
          Book appointment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* Right */}
      <div className="md:w-1/2 flex justify-center md:justify-end w-full mt-6 md:mt-0">
        <img
          className="w-[90%] sm:w-[80%] md:w-full max-w-[420px] md:max-w-none h-auto rounded-lg"
          src={assets.header_img}
          alt="header img"
        />
      </div>
    </div>
  );
};

export default Header;
