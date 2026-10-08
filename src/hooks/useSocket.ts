import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (url: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url);

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [url]);

  return {
    socket: socketRef.current,
    isConnected,
  };
};
