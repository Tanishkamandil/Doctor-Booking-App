import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/*---left side */}
      <div className="flex flex-col items-center justify-center gap-4 py-10 md:py-[10vw] m-auto md:w-1/2 md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white lg:leading-tight md:leading-tight leading-tight">
          Book Appointment <br />
          With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white  text-sm">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="bg-white text-gray-600 py-3 px-8 rounded-full flex items-center gap-2 text-sm m-auto  md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book appointment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/*---right side */}
      <div className="md:w-1/2 relative ">
        <img
          className="md:absolute w-full  bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt="header img"
        />
      </div>
    </div>
  );
};

export default Header;
