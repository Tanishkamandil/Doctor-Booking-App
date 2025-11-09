import jwt from "jsonwebtoken";

// Middleware to authenticate doctor using JWT
const authDoctor = (req, res, next) => {
  try {
    const dToken = req.headers["dtoken"]; // must match Postman header
    if (!dToken) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const decoded = jwt.verify(dToken, process.env.JWT_SECRET);

    // attach userId to req object
    req.userId = decoded.id;

    next(); // go to route
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authDoctor;
