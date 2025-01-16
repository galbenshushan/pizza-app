import express, { Request, Response } from "express";
import { OrderStatus } from "../enums/general";
import OrdersService from "../services/OrdersService";
import { io } from "../app";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrdersService.getAllOrders();
    io.emit("ordersUpdated", orders);
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (
  socket: any,
  { orderId, newStatus }: { orderId: string; newStatus: OrderStatus }
) => {
  try {
    const updatedOrder = await OrdersService.updateOrderStatus(
      orderId,
      newStatus
    );

    const allOrders = await OrdersService.getAllOrders();
    io.emit("ordersUpdated", allOrders);
    socket.emit("statusUpdated", updatedOrder);
  } catch (error: any) {
    socket.emit("error", {
      message: "Error updating order status: " + error.message,
    });
  }
};

export const getOrdersInterval = async (intervalTime: number) => {
  setInterval(async () => {
    const orders = await OrdersService.getAllOrders();
    io.emit("orders", orders);
    io.emit("interval", intervalTime);
  }, intervalTime);
};
