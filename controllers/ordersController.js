const order = require("../models/ordersModel");

const Cart = require("../models/cartModel");
const Order = require("../models/ordersModel");

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone, address } = req.body.customer;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      title: item.productId.title,
      price: item.productId.price,
      image: item.productId.image,
      qty: item.qty,
    }));

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const newOrder = await order.create({
      userId,
      name,
      email,
      phone,
      address,
      order: orderItems,
      total,
      status: "Pending Payment",
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Order Save Error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder =
      await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

    if (!updatedOrder) {
      return res.status(404).json({
        message:
          "Order not found",
      });
    }

    res.status(200).json({
      message:
        "Status updated successfully",
      order: updatedOrder,
    });

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to update status",
    });
  }
};

module.exports = { placeOrder, getOrders, updateOrderStatus };
