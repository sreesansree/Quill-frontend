import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Use environment variables for the base URL
// Log environment variable to check if it's loaded correctly
console.log("VITE_API_URL:", process.env.VITE_API_URL);  // Use process.env for debugging

// const backendURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://quill-backend-gaz3.onrender.com",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
