import mongoose from "mongoose";
import bcrypt from "bcrypt";
import doctorModel from "./models/doctorModel.js"; // adjust path if needed

// 🔗 Your MongoDB connection string
const MONGO_URI =
  "mongodb+srv://tanishka:tanishka234@cluster0.n3tc23l.mongodb.net/prescripto";

// 🔐 New default password for all doctors
const newPassword = "Doctor@123";

const resetAllPasswords = async () => {
  try {
    // connect to your DB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update password for all doctors
    const result = await doctorModel.updateMany(
      {},
      { password: hashedPassword }
    );

    console.log(`✅ Password reset for ${result.modifiedCount} doctors.`);
    console.log(`👉 New password for all: ${newPassword}`);
  } catch (error) {
    console.error("❌ Error resetting passwords:", error);
  } finally {
    mongoose.connection.close();
  }
};

resetAllPasswords();
