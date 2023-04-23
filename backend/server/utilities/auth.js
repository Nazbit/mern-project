const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require('dotenv');
dotenv.config();

// Secret key for JWT signing and verification
const secretKey = "mySecretKey";

// Middleware function to check if user is authenticated
const isAuthenticated = async (req, res, next) => {
  try {
    // Get JWT from authorization header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication failed!" });
    }

    // Verify JWT
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    // Check if user exists in database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Authentication failed!" });
    }

    // Attach user object to request object
    req.user = user;

    // Call next middleware function
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Authentication failed!" });
  }
};

// Middleware function to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Authorization failed!" });
  }
};



module.exports = {
  isAuthenticated,
  isAdmin
};
