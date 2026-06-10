import axios from "axios";

const api = axios.create({
  baseURL: "https://smartcampus-backend-a6g3.onrender.com",
});

export default api;