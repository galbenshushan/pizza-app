import mongoose from "mongoose";
import Order from "../models/orderModel";
import { generateMockData } from "../utils/data";

export const populateDatabase = async () => {
  const orders = generateMockData();
  try {
    await mongoose.connect(process.env.DB_URI as string);
    await Order.insertMany(orders);
    console.log("Successfully inserted 300 orders!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error inserting mock data:", error);
  }
};

export const cleanDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    await Order.deleteMany({});
    console.log("Successfully cleared all orders!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error clearing the database:", error);
  }
};