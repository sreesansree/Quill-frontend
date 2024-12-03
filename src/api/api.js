import axios from "axios";

const api = axios.create({
  baseURL: "https://quill-backend-gaz3.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
