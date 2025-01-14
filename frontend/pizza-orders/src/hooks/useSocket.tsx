import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [url]);

  const sendEvent = (event: string, data: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  const subscribeToEvent = (event: string) => {
    if (socket) {
      socket.on(event, (newData: any) => {
        setData(newData);
      });
    }
  };

  return {
    socket,
    sendEvent,
    subscribeToEvent,
    data,
  };
};

export default useSocket;
