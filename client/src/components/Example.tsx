import React, { useEffect } from "react";
import { useSocket } from "@/hooks";

/**
 * An example usage of a component structure,
 * raw socket usage, etc.
 */
export const Example: React.FC = () => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;  // Client is not signed in

    socket.on("event", () => {
      // do something
    });

    return () => {
      socket.off("event");
    }; // Cleanup event listener
  }, [socket]);

  return (
    <div>example</div>
  );
};
