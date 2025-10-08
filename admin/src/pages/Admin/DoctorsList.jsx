import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium ">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl max-w-56 overflow-hidden cursor-pointer border-indigo-200 group"
          >
            <img
              src={item.image}
              alt=""
              className=" group-hover:bg-primary transition-all duration-500 border bg-indigo-50"
            />
            <div className="p-4">
              <p className="text-lg font-medium text-neutral-800">
                {item.name}
              </p>
              <p className="text-sm text-zinc-600">{item.speciality}</p>
              <div className="flex items-center gap-1 mt-2 text-sm ">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                  className=""
                />
                <p className="">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
