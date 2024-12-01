import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(() => {
  const API_URL = import.meta.env.REACT_APP_API_URLL || "http://localhost:5000";
  return {
    server: {
      proxy: {
        "/api": {
          target: API_URL,
          secure: false,
        },
      },
    },
    plugins: [react()],
  };
});
