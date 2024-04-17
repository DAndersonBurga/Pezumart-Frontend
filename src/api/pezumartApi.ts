import axios from "axios";

export const pezumartApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})
