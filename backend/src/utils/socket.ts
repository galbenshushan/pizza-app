import socketIo from "socket.io";
import {
  getOrdersInterval,
  updateOrderStatus,
} from "../controllers/ordersController";
import fs from "fs";
import { createConfigFileIfNotExist, readConfigFile } from "./fs";
import { configFilePath, defaultConfig } from "../consts/socket";

let defaultInterval = defaultConfig.defaultInterval;
let ordersInterval: NodeJS.Timeout | null = null;

createConfigFileIfNotExist();
readConfigFile();

export const socketHandler = (socket: socketIo.Socket) => {
  getOrdersInterval(defaultInterval);
  socket.on("updatePollingTime", updateIntervalHandler);
  socket.on("updateStatus", async ({ orderId, newStatus }) => {
    if (!orderId || !newStatus) {
      socket.emit("error", { message: "Invalid order ID or status" });
      return;
    }

    await updateOrderStatus(socket, { orderId, newStatus });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
};

export const streamLive = () => {
  // const changeStream = Order.watch();
  // console.log("Change stream started", changeStream);
  // changeStream.on("change", (change) => {
  // socket.emit("orderUpdated", change);
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
