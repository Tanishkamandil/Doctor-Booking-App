import mongoose from "mongoose";
import bcrypt from "bcrypt";
import doctorModel from "./models/doctorModel.js"; // ✅ correct path if in backend folder

const MONGO_URI =
  "mongodb+srv://tanishka:tanishka234@cluster0.n3tc23l.mongodb.net/prescripto";

const email = "richard@demo.com"; // doctor's email
const newPassword = "Doctor@123r"; // new password

const resetPassword = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await doctorModel.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    if (result) {
      console.log(`✅ Password reset successful for ${email}`);
      console.log(`👉 New password: ${newPassword}`);
    } else {
      console.log("❌ Doctor not found!");
    }
  } catch (error) {
    console.error("❌ Error resetting password:", error);
  } finally {
    mongoose.connection.close();
  }
};

resetPassword();
