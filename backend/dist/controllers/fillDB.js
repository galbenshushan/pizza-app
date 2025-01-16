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
exports.populateDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const general_1 = require("../enums/general");
const orderModel_1 = __importDefault(require("../models/orderModel"));

const ISRAEL_BOUNDS = {
    minLat: 29.5,
    maxLat: 33.5,
    minLng: 34.3,
    maxLng: 35.5,
};

const getRandomLocation = () => {
    const lat = Math.random() * (ISRAEL_BOUNDS.maxLat - ISRAEL_BOUNDS.minLat) + ISRAEL_BOUNDS.minLat;
    const lng = Math.random() * (ISRAEL_BOUNDS.maxLng - ISRAEL_BOUNDS.minLng) + ISRAEL_BOUNDS.minLng;
    return { lat, lng };
};

const generateMockData = () => {
    const statuses = [
        general_1.OrderStatus.Received,
        general_1.OrderStatus.Preparing,
        general_1.OrderStatus.Ready,
        general_1.OrderStatus.EnRoute,
        general_1.OrderStatus.Delivered,
    ];
    let orders = [];
    for (let i = 0; i < 300; i++) {
        const order = {
            title: `Order ${i + 1}`,
            location: getRandomLocation(), 
            orderTime: new Date(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            subItems: [
                {
                    title: `Pizza ${i + 1}`,
                    amount: Math.floor(Math.random() * 3) + 1,
                    type: "Pizza",
                },
            ],
        };
        orders.push(order);
    }
    return orders;
};

const populateDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = generateMockData();
    try {
        yield mongoose_1.default.connect(process.env.DB_URI);
        yield orderModel_1.default.insertMany(orders);
        console.log("Successfully inserted 300 orders!");
        mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error("Error inserting mock data:", error);
    }
});
exports.populateDatabase = populateDatabase;
