import { socket } from "@biseo/web/socket";
import { useChatStore } from "./store";

socket.on("chat.received", message => {
  useChatStore.getState().append(message);
  if (message.type === "adminnotice") {
    useChatStore.getState().appendNotice(message);
  }
});

socket.on("chat.updated", message => {
  const store = useChatStore.getState();
  store.append(message);

  if (message.type === "adminnotice") {
    store.appendNotice(message);
  } else {
    store.removeNotice(message.id);
  }
});
