export const API_URL = import.meta.env.VITE_API_URL ?? "/api";
export const SOCKET_URL = API_URL.replace(/^http/, "ws") + "/socket";
