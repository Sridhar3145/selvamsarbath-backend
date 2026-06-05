const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Email is invalid"],
  },
  contactno: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, "Enter valid 10-digit phone number"],
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Contact", formSchema);
