import { useRecoilValue } from "recoil";
import { socketState } from "@/store/socket";

/**
 * Provides a readonly socket.io instance.
 * Will return `null` when client is not authenticated
 * since a socket connection requires authentication.
 */
export const useSocket = () => useRecoilValue(socketState);
