import axios from "axios";
import * as System from "../utils/system";

const api = axios.create({
    baseURL: System.BASE_API_URL,
    headers:{
        "Content-Type": "application/json",
    }
});

export default api;





