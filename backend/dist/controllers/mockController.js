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
exports.cleanDatabase = exports.populateDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
const data_1 = require("../utils/data");
const populateDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = (0, data_1.generateMockData)();
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
const cleanDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.DB_URI);
        yield orderModel_1.default.deleteMany({});
        console.log("Successfully cleared all orders!");
        mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error("Error clearing the database:", error);
    }
});
exports.cleanDatabase = cleanDatabase;
