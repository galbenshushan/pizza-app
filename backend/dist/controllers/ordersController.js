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
exports.getOrdersInterval = exports.getUndeliveredOrders = exports.getOrdersByStatus = exports.updateOrder = exports.getAllOrders = exports.createNewOrder = void 0;
const general_1 = require("../enums/general");
const OrdersService_1 = __importDefault(require("../services/OrdersService"));
const app_1 = require("../app");
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, location, orderTime, status, subItems } = req.body;
    try {
        if (!Object.values(general_1.OrderStatus).includes(status)) {
            return res.status(400).json({ message: "Invalid order status" });
        }
        const newOrder = yield OrdersService_1.default.createOrder(title, location, orderTime, status, subItems);
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createNewOrder = createNewOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield OrdersService_1.default.getAllOrders();
        console.log(orders);
        app_1.io.emit("ordersUpdated", orders); // Emit data to frontend
        res.status(200).json(orders); // Send the orders as the response
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllOrders = getAllOrders;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if (!Object.values(general_1.OrderStatus).includes(status)) {
            return res.status(400).json({ message: "Invalid order status" });
        }
        const updatedOrder = yield OrdersService_1.default.updateOrderStatus(id, status);
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateOrder = updateOrder;
const getOrdersByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.params;
    if (!Object.values(general_1.OrderStatus).includes(status)) {
        return res.status(400).json({ message: "Invalid order status" });
    }
    try {
        const orders = yield OrdersService_1.default.getOrdersByStatus(status);
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getOrdersByStatus = getOrdersByStatus;
const getUndeliveredOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const undeliveredOrders = yield OrdersService_1.default.getUndeliveredOrders();
        res.status(200).json(undeliveredOrders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUndeliveredOrders = getUndeliveredOrders;
const getOrdersInterval = () => __awaiter(void 0, void 0, void 0, function* () {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const orders = yield OrdersService_1.default.getAllOrders();
        app_1.io.emit("orders", orders);
    }), 5000);
});
exports.getOrdersInterval = getOrdersInterval;
