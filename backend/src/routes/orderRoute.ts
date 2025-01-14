// routes/orderRoutes.js
import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();

// Create a new order
router.post("/orders", async (req, res) => {
  const { title, location, orderTime, status, subItems } = req.body;
  try {
    const newOrder = new Order({
      title,
      location,
      orderTime,
      status,
      subItems,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Update order status
router.patch("/orders/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    await order.save();
    res.status(200).json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Fetch orders by status
router.get("/orders/status/:status", async (req, res) => {
  const { status } = req.params;
  try {
    const orders = await Order.find({ status });
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
