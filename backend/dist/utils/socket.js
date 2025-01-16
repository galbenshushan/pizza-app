"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIntervalHandler = exports.streamLive = exports.socketHandler = void 0;
const ordersController_1 = require("../controllers/ordersController");
const fs_1 = __importDefault(require("fs"));
const fs_2 = require("./fs");
const socket_1 = require("../consts/socket");
let defaultInterval = socket_1.defaultConfig.defaultInterval;
let ordersInterval = null;
(0, fs_2.createConfigFileIfNotExist)();
(0, fs_2.readConfigFile)();
const socketHandler = (socket) => {
    (0, ordersController_1.getOrdersInterval)(defaultInterval);
    socket.on("updatePollingTime", exports.updateIntervalHandler);
    socket.on("updateStatus", (_a) => __awaiter(void 0, [_a], void 0, function* ({ orderId, newStatus }) {
        if (!orderId || !newStatus) {
            socket.emit("error", { message: "Invalid order ID or status" });
            return;
        }
        yield (0, ordersController_1.updateOrderStatus)(socket, { orderId, newStatus });
    }));
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
};
exports.socketHandler = socketHandler;
const streamLive = () => {
    // const changeStream = Order.watch();
    // console.log("Change stream started", changeStream);
    // changeStream.on("change", (change) => {
    //   console.log("Database change detected:");
    // socket.emit("orderUpdated", change); // Send change details to the client (you can modify this to send only orders)
    // });
};
exports.streamLive = streamLive;
const updateIntervalHandler = (newInterval) => {
    if (ordersInterval) {
        clearInterval(ordersInterval);
    }
    const newConfig = { defaultInterval: newInterval };
    fs_1.default.writeFileSync(socket_1.configFilePath, JSON.stringify(newConfig, null, 2));
    (0, ordersController_1.getOrdersInterval)(newInterval);
};
exports.updateIntervalHandler = updateIntervalHandler;
