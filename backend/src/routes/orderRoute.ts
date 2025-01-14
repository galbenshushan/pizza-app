import express from "express";
import {
  createNewOrder,
  getAllOrders,
  getOrdersByStatus,
  getUndeliveredOrders,
  updateOrder,
} from "../controllers/ordersController";

const router = express.Router();

router.post("/orders", createNewOrder);

router.get("/orders", getAllOrders);

router.patch("/orders/:id", updateOrder);

router.get("/orders/status/:status", getOrdersByStatus);

router.get("/orders/undelivered", getUndeliveredOrders);

export default router;
