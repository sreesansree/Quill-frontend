import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(() => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  return {
    server: {
      proxy: {
        "/api": {
          target: API_URL,
          secure: false,
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
  };
});
