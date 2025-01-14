import { OrderStatus } from "../enums/general";
import { getRandomLocation } from "./locations";

export const generateMockData = () => {
  const statuses: OrderStatus[] = Object.values(OrderStatus);
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
