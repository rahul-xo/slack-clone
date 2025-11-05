import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    clerkId:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        required:true,   
    }
},{timestamps:true})

export const User=mongoose.model("User",userSchema);