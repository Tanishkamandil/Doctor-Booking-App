import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const token = req.headers["token"]; // must match Postman header
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach userId to req object
    req.userId = decoded.id;

    next(); // go to route
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
