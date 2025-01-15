import React, { createContext, useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Order } from "../types/orders";
import { serverUrl } from "../consts/general";
import { SocketEvents } from "../enums/general";
import { SelectChangeEvent } from "@mui/material";
import { sortBy } from "../utils/orders";

interface OrdersContextType {
  socket: Socket | null;
  sortedOrders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<any[]>>;
  updatePollingTime: (newInterval: number) => void;
  pollingTime: number;
  handleSortChange: (event: SelectChangeEvent<string>) => void;
  sortOption: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const OrdersContext = createContext<OrdersContextType | undefined>(
  undefined
);

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sortOption, setSortOption] = useState<string>("newsFirst");

  const [socket, setSocket] = useState<Socket | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [pollingTime, setPollingTime] = useState<number>(0);
  const [filter, setFilter] = useState<string>("");
  const manipulateNewSocket = useCallback((newSocket: Socket) => {
    setSocket(newSocket);

    newSocket.on(SocketEvents.CONNECT, () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on(SocketEvents.ORDERS, (updatedOrders: Order[]) => {
      setOrders(updatedOrders);
    });

    newSocket.on(SocketEvents.INTERVAL, (interval: number) => {
      setPollingTime(interval);
    });
  }, []);

  const updatePollingTime = (newInterval: number) => {
    if (socket) {
      socket.emit(SocketEvents.UPDATE_POLLING_TIME, newInterval);
    }
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    console.log(event);

    setSortOption(event.target.value as string);
  };

  const filterAndSortOrders = (orders: Order[], sortOption: string) => {
    const sortedOrders = sortBy(orders, sortOption);
    if (filter) {
      return sortedOrders.filter((order) => order.status === filter);
    }
    return sortedOrders;
  };

  const sortedOrders = filterAndSortOrders(orders, sortOption);

  useEffect(() => {
    const newSocket = io(serverUrl);
    manipulateNewSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        socket,
        sortedOrders,
        sortOption,
        setOrders,
        updatePollingTime,
        pollingTime,
        handleSortChange,

        setFilter,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
