import mongoose, { Schema } from "mongoose";
import { OrderStatus } from "../enums/general";
import { Order } from "../types/general";

const orderSchema: Schema = new Schema<Order>({
  title: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  orderTime: { type: Date, required: true },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    required: true,
  },
  subItems: [
    {
      title: { type: String, required: true },
      amount: { type: Number, required: true },
      type: { type: String, required: true },
      toppings: [{ type: String , required: false }],
    },
  ],
});

const Order = mongoose.model<Order>("Order", orderSchema);

export default Order;
