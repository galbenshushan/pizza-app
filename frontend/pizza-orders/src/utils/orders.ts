import { Order } from "../types/orders";

export const sortBy = (orders: Order[], sortOption: string) => {
  return orders.sort((a: Order, b: Order) => {
    switch (sortOption) {
      case "a-z":
        return a.title.localeCompare(b.title);
      case "z-a":
        return b.title.localeCompare(a.title);
      case "newsFirst":
        return (
          new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime()
        );
      default:
        return 0;
    }
  });
};
