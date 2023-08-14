const Student = require("../model/StudentSchema");
const Profile=require("../model/Profile");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();


// register
exports.register = async (req, res) => {
  try {
    const { name, email, password,contactNumber,tutorName,teachingCity,cityLocation } = req.body;
   
    console.log("Printing Data from req body::",req.body);

    if (!name || !email || !password || !contactNumber ) {
        return res.status(400).json({ message: 'All fields are required' });
      }

    // Check if a student with the provided email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const profileDetails = await Profile.create({
      gender: null,
      tenthBoard: null,
      diploma:null,
      twenthBoard: null,
      graduation:null,
      postGraduation:null,
      AnyTeachingExperiance:null,
      idProof:null
    });

    // Create a new student document
    const newStudent = new Student({
        name,
        email,
        password: hashedPassword,
        contactNumber,
        additionalDetails: profileDetails._id,
        image:`https://api.dicebear.com/6.x/initials/svg?seed=${name}`
      });
  
      // Save the student to the database
      await newStudent.save();

    

    res.status(201).json({ message: "Successfully registered" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //  validation of data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "ALL fields are required, please try again",
      });
    }
    console.log("password",password)

    // Check if a student with the provided email exists
    const student = await Student.findOne({ email }).populate("additionalDetails");
    if (!student) {
      return res.status(404).json({ message: "Email not found" });
    }

    // // Compare passwords
    // const isPasswordValid = await bcrypt.compare(password, student.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Invalid password" });
    // }

    // // Create and send JWT token
    // const token = jwt.sign({ email: student.email }, "your_secret_key", {
    //   expiresIn: "1h",
    // });

    // cryaehae5u23546567898#@R%^&**&^%$#@#$&$#
    if(await bcrypt.compare(password, student.password)) {
      const token = jwt.sign(
        { email: student.email, id: student._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

    
    student.token = token;
    student.password = undefined;

    //  create cookie and send response
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      student,
      message: `student Login Success`,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Password is Incorrect",
    });
  }

    // res.status(200).json({ message: "Logged in Successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
