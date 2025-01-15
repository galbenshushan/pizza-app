import express, { Request, Response } from "express";
import { OrderStatus } from "../enums/general";
import OrdersService from "../services/OrdersService";
import { io } from "../app";

export const createNewOrder = async (req: Request, res: Response) => {
  const { title, location, orderTime, status, subItems } = req.body;
  try {
    if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const newOrder = await OrdersService.createOrder(
      title,
      location,
      orderTime,
      status,
      subItems
    );
    res.status(201).json(newOrder);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrdersService.getAllOrders();
    io.emit("ordersUpdated", orders);
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const updatedOrder = await OrdersService.updateOrderStatus(id, status);
    res.status(200).json(updatedOrder);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersByStatus = async (req: Request, res: Response) => {
  const { status } = req.params;

  if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
    return res.status(400).json({ message: "Invalid order status" });
  }

  try {
    const orders = await OrdersService.getOrdersByStatus(status as OrderStatus);
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUndeliveredOrders = async (req: Request, res: Response) => {
  try {
    const undeliveredOrders = await OrdersService.getUndeliveredOrders();
    res.status(200).json(undeliveredOrders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersInterval = async (intervalTime: number) => {
  setInterval(async () => {
    const orders = await OrdersService.getAllOrders();
    io.emit("orders", orders);
    io.emit("interval", intervalTime);
  }, intervalTime);
};
