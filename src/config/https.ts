import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export function basicInstance() {
    const basicInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    return basicInstance;
}
