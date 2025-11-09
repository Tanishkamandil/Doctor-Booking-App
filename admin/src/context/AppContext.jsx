import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const currency = "$";
const AppContextProvider = (props) => {
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    return age;
  };
  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "Invalid Date";

    let dateArray = slotDate.includes("_")
      ? slotDate.split("_")
      : slotDate.split("-");

    // If array length is not 3, try parsing as Date directly
    if (dateArray.length !== 3) {
      const d = new Date(slotDate);
      if (isNaN(d)) return "Invalid Date";
      return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }

    const day = dateArray[0];
    const monthIndex = Number(dateArray[1]);
    const year = dateArray[2];

    return `${day} ${months[monthIndex]} ${year}`;
  };

  const value = {
    calculateAge,
    slotDateFormat,
    currency,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
