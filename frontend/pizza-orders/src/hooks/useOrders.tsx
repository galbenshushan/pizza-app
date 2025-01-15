import { useContext } from "react";
import { OrdersContext } from "../store/OrdersContext";

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within a OrdersProvider");
  }
  return context;
};