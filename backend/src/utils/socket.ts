import socketIo from "socket.io";
import { getOrdersInterval } from "../controllers/ordersController";
import fs from "fs";
import { createConfigFileIfNotExist, readConfigFile } from "./fs";
import { configFilePath, defaultConfig } from "../consts/socket";
import Order from "../models/orderModel";

let defaultInterval = defaultConfig.defaultInterval;
let ordersInterval: NodeJS.Timeout | null = null;

createConfigFileIfNotExist();
readConfigFile();

export const socketHandler = (socket: socketIo.Socket) => {
  getOrdersInterval(defaultInterval);
  socket.on("updatePollingTime", updateIntervalHandler);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
};

export const streamLive = () => {
  // const changeStream = Order.watch();
  // console.log("Change stream started", changeStream);
  // changeStream.on("change", (change) => {
  //   console.log("Database change detected:");
  // socket.emit("orderUpdated", change); // Send change details to the client (you can modify this to send only orders)
  // });
};
export const updateIntervalHandler = (newInterval: number) => {
  if (ordersInterval) {
    clearInterval(ordersInterval);
  }

  const newConfig = { defaultInterval: newInterval };
  fs.writeFileSync(configFilePath, JSON.stringify(newConfig, null, 2));
  getOrdersInterval(newInterval);
};
