"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersController_1 = require("../controllers/ordersController");
const router = express_1.default.Router();
router.post("/orders", ordersController_1.createNewOrder);
router.get("/orders", ordersController_1.getAllOrders);
router.patch("/orders/:id", ordersController_1.updateOrder);
router.get("/orders/status/:status", ordersController_1.getOrdersByStatus);
router.get("/orders/undelivered", ordersController_1.getUndeliveredOrders);
exports.default = router;
