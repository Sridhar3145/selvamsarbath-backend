const Contact = require("../models/contactModel");

const submitForm = async (req, res) => {
  try {
    const { name, email, contactno, message } = req.body;
    await Contact.create({
      name,
      email,
      contactno,
      message,
    });

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).json({ error: "Form submission failed" });
  }
};

module.exports = { submitForm };
