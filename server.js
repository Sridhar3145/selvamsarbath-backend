require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const contactRoutes = require('./routes/contactRoutes')
const orderRoutes = require('./routes/ordersRoutes')
const cartRoutes = require("./routes/cartRoutes");

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use("/form", contactRoutes);
app.use("/orders", orderRoutes);
app.use("/cart", cartRoutes);

app.get("/health", (req, res) => {
 res.status(200).send("OK")
})

const DBconnect = async () => {
 try {
  await mongoose.connect(MONGO_URL)
  console.log('MongoDB Connected Successfully ');

 } catch (error) {
  console.log("DB error:", error.message);
 }
}
DBconnect()


app.listen(PORT, () => console.log(`Server Running On ${PORT}`))