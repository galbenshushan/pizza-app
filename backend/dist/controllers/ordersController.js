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
exports.getOrdersInterval = exports.updateOrderStatus = exports.getAllOrders = void 0;
const OrdersService_1 = __importDefault(require("../services/OrdersService"));
const app_1 = require("../app");
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield OrdersService_1.default.getAllOrders();
        app_1.io.emit("ordersUpdated", orders);
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllOrders = getAllOrders;
const updateOrderStatus = (socket_1, _a) => __awaiter(void 0, [socket_1, _a], void 0, function* (socket, { orderId, newStatus }) {
    try {
        const updatedOrder = yield OrdersService_1.default.updateOrderStatus(orderId, newStatus);
        const allOrders = yield OrdersService_1.default.getAllOrders();
        app_1.io.emit("ordersUpdated", allOrders);
        socket.emit("statusUpdated", updatedOrder);
    }
    catch (error) {
        socket.emit("error", {
            message: "Error updating order status: " + error.message,
        });
    }
});
exports.updateOrderStatus = updateOrderStatus;
const getOrdersInterval = (intervalTime) => __awaiter(void 0, void 0, void 0, function* () {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield OrdersService_1.default.getAllOrders();
        app_1.io.emit("orders", orders);
        app_1.io.emit("interval", intervalTime);
    }), intervalTime);
});
exports.getOrdersInterval = getOrdersInterval;
