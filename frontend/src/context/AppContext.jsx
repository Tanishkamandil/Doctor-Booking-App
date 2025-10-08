import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //  Fetch all doctors
  const getDoctorsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/doctor/list`);
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Load logged-in user profile
  const loadUserProfileData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (res.data.success) {
        setUserData(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //  Load doctors on first mount
  useEffect(() => {
    getDoctorsData();
  }, []);

  //  Load user profile if token exists
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  //  Context values
  const value = {
    doctors,
    setDoctors,
    getDoctorsData,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
    currencySymbol,
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
