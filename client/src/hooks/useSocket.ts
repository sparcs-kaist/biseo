import { io, type Socket } from "socket.io-client";
import { useEffect, useState } from "react";

/**
 * WIP
 */
const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    setSocket(io());

    return () => { socket?.disconnect(); };
  }, [socket]);
};
