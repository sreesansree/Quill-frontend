import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Use environment variables for the base URL

const backendURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: backendURL,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
