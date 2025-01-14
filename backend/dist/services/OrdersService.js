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
const orderModel_1 = __importDefault(require("../models/orderModel"));
const general_1 = require("../enums/general");
class OrderService {
    createOrder(title, location, orderTime, status, subItems) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newOrder = new orderModel_1.default({
                    title,
                    location,
                    orderTime,
                    status,
                    subItems,
                });
                yield newOrder.save();
                return newOrder;
            }
            catch (error) {
                throw new Error("Error creating the order: " + error.message);
            }
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield orderModel_1.default.find();
            }
            catch (error) {
                throw new Error("Error fetching orders: " + error.message);
            }
        });
    }
    updateOrderStatus(orderId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield orderModel_1.default.findById(orderId);
                if (!order)
                    throw new Error("Order not found");
                order.status = status;
                yield order.save();
                return order;
            }
            catch (error) {
                throw new Error("Error updating order status: " + error.message);
            }
        });
    }
    getOrdersByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield orderModel_1.default.find({ status });
            }
            catch (error) {
                throw new Error("Error fetching orders by status: " + error.message);
            }
        });
    }
    getUndeliveredOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield orderModel_1.default.find({ status: { $ne: general_1.OrderStatus.Delivered } });
            }
            catch (error) {
                throw new Error("Error fetching undelivered orders: " + error.message);
            }
        });
    }
}
exports.default = new OrderService();
