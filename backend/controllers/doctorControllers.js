import doctorModel from "../models/doctorModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// ✅ API to get doctor list
const doctorList = async (req, res) => {
  try {
    // Exclude password and email fields
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, data: doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ API to change doctor availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);

    if (!docData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//API for doctor login

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find doctor by email
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: doctor._id.toString(),
        role: "doctor",
      },
      process.env.JWT_SECRET
    );

    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API  to get doctor appointment for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.userId; // Get doctor ID from token
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API to complete appointment
const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.userId;

    console.log("Appointment ID:", appointmentId);
    console.log("Doctor ID from JWT:", docId);

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.docId.toString() !== docId) {
      return res.json({ success: false, message: "Unauthorized doctor" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
    });

    res.json({ success: true, message: "Appointment completed" });
  } catch (error) {
    console.error("Error completing appointment:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to cancel appointment

const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const docId = req.userId;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId.toString() === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment cancelled" });
    } else {
      return res.json({ success: false, message: "Appointment not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get dashboard data for doctor panel
const getDashboardData = async (req, res) => {
  try {
    const docId = req.userId; //  get doctor ID from auth middleware

    // Get all appointments of this doctor
    const appointments = await appointmentModel.find({ docId });

    //  Calculate earnings
    const earnings = appointments.reduce(
      (total, item) => total + item.amount,
      0
    );

    //  Unique patients
    let patients = [];
    appointments.forEach((item) => {
      if (!patients.includes(item.userId.toString())) {
        patients.push(item.userId.toString());
      }
    });

    //  Prepare dashboard data
    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    return res.json({ success: true, data: dashData });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.json({ success: false, message: error.message });
  }
};
//API to get doctor profile

const doctorProfile = async (req, res) => {
  try {
    const docId = req.userId;
    const profileData = await doctorModel.findById(docId).select("-password");
    console.log("Doctor ID from middleware:", req.userId);

    res.json({ success: true, data: profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.userId;
    const { fees, address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export {
  doctorList,
  changeAvailability,
  loginDoctor,
  appointmentsDoctor,
  completeAppointment,
  cancelAppointment,
  getDashboardData,
  updateDoctorProfile,
  doctorProfile,
};
