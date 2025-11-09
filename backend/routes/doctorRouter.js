import express from "express";
import {
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  completeAppointment,
  cancelAppointment,
} from "../controllers/doctorControllers.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/complete-appointment", authDoctor, completeAppointment);
doctorRouter.post("/cancel-appointment", authDoctor, cancelAppointment);

export default doctorRouter;
