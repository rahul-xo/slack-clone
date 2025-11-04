import mongoose from "mongoose";
import ENV from "./env.js";

export const connectDB=async()=>{
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log("mongoDB connected successfully.");
        
    } catch (error) {
        console.log("error while connecting .",error);
        process.exit(1);
    }
}