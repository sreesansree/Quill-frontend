import axios from "axios";

const api = axios.create({
  baseURL: "https://quill-backend-gaz3.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log( "VITE APIIIIIIIIIIII",import.meta.env.VITE_API_URL)
export default api;
