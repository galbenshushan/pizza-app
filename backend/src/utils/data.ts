import { OrderStatus } from "../enums/general";
import Order from "../models/orderModel";
import { Location } from "../types/general";
import { getRandomLocation } from "./locations";

interface SubItem {
  title: string;
  amount: number;
  type: "Pizza" | "Drink" | "Salad";
  toppings?: string[];
}

interface OrderType {
  title: string;
  location: Location;
  orderTime: Date;
  status: OrderStatus;
  subItems: SubItem[];
}

const getRandomToppings = (): string[] => {
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
  const selectedToppings: string[] = [];
  for (let i = 0; i < randomToppingsCount; i++) {
    const topping = toppings[Math.floor(Math.random() * toppings.length)];
    if (!selectedToppings.includes(topping)) {
      selectedToppings.push(topping);
    }
  }
  return selectedToppings;
};
export const generateMockData = async () => {
  const statuses: OrderStatus[] = Object.values(OrderStatus);
  const drinks = ["Coca-Cola", "Sprite", "Water", "Fanta"];
  let orders: OrderType[] = [];

  for (let i = 0; i < 300; i++) {
    const order: OrderType = {
      title: `Order No. ${i + 1}`,
      location: getRandomLocation(),
      orderTime: new Date(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      subItems: [],
    };

    const subItemCount = Math.floor(Math.random() * 5) + 1;
    let subItems: SubItem[] = [];

    for (let j = 0; j < subItemCount; j++) {
      const subItemType = ["drink", "salad", "pizza"][
        Math.floor(Math.random() * 3)
      ];
      let subItem: SubItem = {
        title: "",
        amount: Math.floor(Math.random() * 3) + 1,
        type: subItemType as "Pizza" | "Drink" | "Salad",
      };

      if (subItemType === "pizza") {
        const toppings = getRandomToppings();

        subItem = {
          ...subItem,
          title: `Pizza ${
            toppings.length > 0 ? `with ${toppings.join(", ")}` : ""
          }`,
          toppings: toppings,
          type: "Pizza",
        };
      } else if (subItemType === "drink") {
        subItem = {
          ...subItem,
          title: drinks[Math.floor(Math.random() * drinks.length)],
          type: "Drink",
        };
      } else if (subItemType === "salad") {
        subItem = {
          ...subItem,
          title: `Salad`,
          type: "Salad",
        };
      }

      subItems.push(subItem);
    }

    order.subItems = subItems;

    orders.push(order);
  }
  Order.insertMany(orders);
  return orders;
};
