import jwt from "jsonwebtoken";

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const atoken = req.headers["atoken"]; // safer way to access
    if (!atoken) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, login again" });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(403).json({
        success: false,
        message: "Not authorized, login again",
      });
    }

    next(); // go to next middleware
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authAdmin;
