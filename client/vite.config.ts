import * as path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [svgr(), react()],
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
