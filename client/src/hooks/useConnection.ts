import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { io } from "socket.io-client";
import { socketState, tokenState } from "@/store/socket";

export const useConnection = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const [socket, setSocket] = useRecoilState(socketState);

  useEffect(() => {
    if (!token) {
      socket?.disconnect();
      setSocket(null);
    } else {
      setSocket(io({ auth: { token } }));
    }
  }, [token, setSocket]);

  return {
    connect: (token: string) => setToken(token),
    disconnect: () => setToken(null),
  };
};
