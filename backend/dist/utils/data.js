"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMockData = void 0;
const general_1 = require("../enums/general");
const locations_1 = require("./locations");
const generateMockData = () => {
    const statuses = Object.values(general_1.OrderStatus);
    let orders = [];
    for (let i = 0; i < 300; i++) {
        const order = {
            title: `Order ${i + 1}`,
            location: (0, locations_1.getRandomLocation)(),
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
exports.generateMockData = generateMockData;
