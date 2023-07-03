import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      port: parseInt(process.env.CLIENT_PORT ?? "3000"),
      proxy: {
        "/api": {
          target: `http://localhost:${process.env.SERVER_PORT ?? 8000}`,
          ws: true,
        },
      },
    },
  };
});
