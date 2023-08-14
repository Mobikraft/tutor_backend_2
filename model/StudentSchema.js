const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  tutorName: {
    type: String,
    // required: true,
  },
  teachingCity: {
    type: String,
    // required: true,
  },
  cityLocation: {
    type: String,
    // required: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  token: {
    type: String,
  },
});
module.exports = mongoose.model("Student", studentSchema);
