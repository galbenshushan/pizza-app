import Order from "../models/orderModel";
import { OrderStatus } from "../enums/general";
class OrderService {
  async getAllOrders() {
    try {
      return await Order.find();
    } catch (error: any) {
      throw new Error("Error fetching orders: " + error.message);
    }
  }

  updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const order = await Order.findById(orderId);

      if (!order) {
        throw new Error("Order not found");
      }

      order.status = status;
      await order.save();
      return order;
    } catch (error: any) {
      throw new Error("Error updating order status: " + error.message);
    }
  };
}

export default new OrderService();
