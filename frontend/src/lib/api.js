import {axiosInstance} from "./axios.js"

export async function getStreamToken() {
    const response=await axiosInstance.get("/chats/token");
    return response.data;
}