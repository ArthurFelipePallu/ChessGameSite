import axios from "axios";

const VITE_API_URL="http://localhost:5036/api";

const api = axios.create({
    baseURL: VITE_API_URL,
    headers:{
        "Content-Type": "application/json",
    }
});

export default api;





