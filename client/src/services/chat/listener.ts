import { socket } from "@/socket";
import { useChatStore } from "./store";

socket.on("chat.received", message => {
  useChatStore.getState().append(message);
});
