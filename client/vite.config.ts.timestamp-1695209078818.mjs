// vite.config.ts
import * as path from "path";
import { defineConfig, loadEnv } from "file:///C:/Users/asdjkl/Desktop/BiseoDev/biseo/node_modules/.pnpm/vite@4.0.0_@types+node@20.4.7/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/asdjkl/Desktop/BiseoDev/biseo/node_modules/.pnpm/@vitejs+plugin-react@3.0.0_vite@4.0.0/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///C:/Users/asdjkl/Desktop/BiseoDev/biseo/node_modules/.pnpm/vite-plugin-svgr@3.2.0_vite@4.0.0/node_modules/vite-plugin-svgr/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\asdjkl\\Desktop\\BiseoDev\\biseo\\client";
var vite_config_default = defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return {
    plugins: [svgr(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
      }
    },
    server: {
      port: parseInt(process.env.CLIENT_PORT ?? "3000"),
      proxy: {
        "/api": {
          target: `http://localhost:${process.env.SERVER_PORT ?? 8e3}`,
          ws: true
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhc2Rqa2xcXFxcRGVza3RvcFxcXFxCaXNlb0RldlxcXFxiaXNlb1xcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGFzZGprbFxcXFxEZXNrdG9wXFxcXEJpc2VvRGV2XFxcXGJpc2VvXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvYXNkamtsL0Rlc2t0b3AvQmlzZW9EZXYvYmlzZW8vY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCBzdmdyIGZyb20gXCJ2aXRlLXBsdWdpbi1zdmdyXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgT2JqZWN0LmFzc2lnbihwcm9jZXNzLmVudiwgbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbc3ZncigpLCByZWFjdCgpXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHBvcnQ6IHBhcnNlSW50KHByb2Nlc3MuZW52LkNMSUVOVF9QT1JUID8/IFwiMzAwMFwiKSxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICBcIi9hcGlcIjoge1xyXG4gICAgICAgICAgdGFyZ2V0OiBgaHR0cDovL2xvY2FsaG9zdDoke3Byb2Nlc3MuZW52LlNFUlZFUl9QT1JUID8/IDgwMDB9YCxcclxuICAgICAgICAgIHdzOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVVLFlBQVksVUFBVTtBQUM3VixTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFNBQU8sT0FBTyxRQUFRLEtBQUssUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUUzRCxTQUFPO0FBQUEsSUFDTCxTQUFTLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztBQUFBLElBQ3pCLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQVUsYUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDcEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNLFNBQVMsUUFBUSxJQUFJLGVBQWUsTUFBTTtBQUFBLE1BQ2hELE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxVQUNOLFFBQVEsb0JBQW9CLFFBQVEsSUFBSSxlQUFlO0FBQUEsVUFDdkQsSUFBSTtBQUFBLFFBQ047QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
