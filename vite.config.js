import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: import.meta.env.REACT_APP_API_URL || "http://localhost:5000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
