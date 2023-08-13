const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
  try {
    // extract token
    if (!req) {
        return res.status(400).json({
          success: false,
          message: "Invalid request object",
        });
      }
      
    const token =
      req.cookies.token ||
      req.body.token ||
      (req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", ""));
    console.log("token", token);
    console.log("token", token);
    //  validate token, if token is missing return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token is missing",
      });
    }

    // verification of token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      //   verification Issue
      return res.status(401).json({
        success: false,
        message: "token is Invalid",
      });
    }
    next();
  } catch (error) {
    console.error("Error while processing the token:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};
