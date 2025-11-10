import axios from "axios";

// https://slack-backend-three-nu.vercel.app/

const BASE_URL= import.meta.env.MODE==="development"? "http://localhost:5001/api": "https://slack-backend-three-nu.vercel.app/api";

export const axiosInstance=axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
})