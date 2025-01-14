import Order from "../models/orderModel";
import { OrderStatus } from "../enums/general";
import { Location, SubItem } from "../types/general";

class OrderService {
  async createOrder(
    title: string,
    location: Location,
    orderTime: Date,
    status: OrderStatus,
    subItems: SubItem[]
  ) {
    try {
      const newOrder = new Order({
        title,
        location,
        orderTime,
        status,
        subItems,
      });
      await newOrder.save();
      return newOrder;
    } catch (error: any) {
      throw new Error("Error creating the order: " + error.message);
    }
  }

  async getAllOrders() {
    try {
      return await Order.find();
    } catch (error: any) {
      throw new Error("Error fetching orders: " + error.message);
    }
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    try {
      const order = await Order.findById(orderId);
      if (!order) throw new Error("Order not found");

      order.status = status;
      await order.save();
      return order;
    } catch (error: any) {
      throw new Error("Error updating order status: " + error.message);
    }
  }

  async getOrdersByStatus(status: OrderStatus) {
    try {
      return await Order.find({ status });
    } catch (error: any) {
      throw new Error("Error fetching orders by status: " + error.message);
    }
  }

  async getUndeliveredOrders() {
    try {
      return await Order.find({ status: { $ne: OrderStatus.Delivered } });
    } catch (error: any) {
      throw new Error("Error fetching undelivered orders: " + error.message);
    }
  }
}

export default new OrderService();
