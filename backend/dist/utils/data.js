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
exports.generateMockData = void 0;
const general_1 = require("../enums/general");
const orderModel_1 = __importDefault(require("../models/orderModel"));
const locations_1 = require("./locations");
const getRandomToppings = () => {
    const toppings = [
        "Cheese",
        "Pepperoni",
        "Mushrooms",
        "Olives",
        "Green Peppers",
        "Onions",
        "Bacon",
    ];
    const randomToppingsCount = Math.floor(Math.random() * 3) + 1;
    const selectedToppings = [];
    for (let i = 0; i < randomToppingsCount; i++) {
        const topping = toppings[Math.floor(Math.random() * toppings.length)];
        if (!selectedToppings.includes(topping)) {
            selectedToppings.push(topping);
        }
    }
    return selectedToppings;
};
const generateMockData = () => __awaiter(void 0, void 0, void 0, function* () {
    const statuses = Object.values(general_1.OrderStatus);
    const drinks = ["Coca-Cola", "Sprite", "Water", "Fanta"];
    let orders = [];
    for (let i = 0; i < 300; i++) {
        const order = {
            title: `Order No. ${i + 1}`, // Ensure title is set
            location: (0, locations_1.getRandomLocation)(),
            orderTime: new Date(), // Ensure orderTime is set
            status: statuses[Math.floor(Math.random() * statuses.length)], // Ensure status is set
            subItems: [],
        };
        // Generate a random number of sub-items (at least one item, max 5 items per order)
        const subItemCount = Math.floor(Math.random() * 5) + 1; // between 1 and 5 sub-items
        let subItems = [];
        // Randomly choose sub-items (pizza, drink, salad)
        for (let j = 0; j < subItemCount; j++) {
            const subItemType = ["drink", "salad", "pizza"][Math.floor(Math.random() * 3)];
            let subItem = {
                title: "",
                amount: Math.floor(Math.random() * 3) + 1, // Random amount from 1 to 3
                type: subItemType,
            };
            if (subItemType === "pizza") {
                const toppings = getRandomToppings();
                subItem = Object.assign(Object.assign({}, subItem), { title: `Pizza ${toppings.length > 0 ? `with ${toppings.join(", ")}` : ""}`, toppings: toppings, type: "Pizza" });
            }
            else if (subItemType === "drink") {
                subItem = Object.assign(Object.assign({}, subItem), { title: drinks[Math.floor(Math.random() * drinks.length)], type: "Drink" });
            }
            else if (subItemType === "salad") {
                subItem = Object.assign(Object.assign({}, subItem), { title: `Salad`, type: "Salad" });
            }
            subItems.push(subItem);
        }
        order.subItems = subItems; // Assign the sub-items to the order
        orders.push(order);
    }
    orderModel_1.default.insertMany(orders);
    return orders;
});
exports.generateMockData = generateMockData;
