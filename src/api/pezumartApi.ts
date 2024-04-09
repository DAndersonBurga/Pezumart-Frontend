import axios from "axios";

let jwtParse = null;

const jwt = localStorage.getItem("jwt") || ""

if(jwt.trim() !== "") {
    try {
        jwtParse = JSON.parse(jwt)
    } catch (error) {
        localStorage.removeItem("jwt")
    }
}

export const pezumartApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})
