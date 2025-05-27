const jwt = require("jsonwebtoken");
const User = require("../models/User"); // User model থেকে user role নিতে হবে

const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log("Decoded ID:", payload.id);


    const user = await User.findById(decoded.id);
    console.log(user)
    console.log(token);
    

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token or unauthorized" });
  }
};

module.exports = verifyAdmin;
