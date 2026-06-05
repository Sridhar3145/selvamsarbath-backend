const User = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {

 const { name, email, password } = req.body;

 try {
  const exists = await User.findOne({ email });

  if (exists) return res.status(400).json({ msg: "User Already Exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });

  res.status(201).json({ msg: "SignUp SuccessFully", userId: user._id });

 } catch (error) {
  res.status(500).json({ msg: "error in SignUp", error: error.message });
 }
}

const login = async (req, res) => {

 const { email, password } = req.body;

 try {
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User Not Found" });

  const passMatch = await bcrypt.compare(password, user.password);

  if (!passMatch) return res.status(400).json({ msg: "Password Not Match" });
  const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "3d" });

  res.status(200).json({ msg: "Login SuccessFully", token, name: user.name, email: user.email })

 } catch (error) {
  res.status(500).json({ msg: "error in Login", error: error.message })
 }

}

module.exports = { signUp, login };