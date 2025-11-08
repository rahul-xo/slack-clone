import {StreamChat} from 'stream-chat';
import ENV from './env.js';

const streamClient= StreamChat.getInstance(ENV.STREAM_API_KEY,ENV.STREAM_API_SECRET);

export const upsertStreamUser=async(userData)=>{
    try {
        await streamClient.upsertUser(userData);
        console.log("Stream user upserted success",userData.name);
        return userData;
    } catch (error) {
        console.log("error :",error);
    }
}

export const deleteStreamUser=async(userId)=>{
    try {
        await streamClient.deleteUser(userId);
    } catch (error) {
        console.log("error in deleting user:",error);   
    }
}


export const generateStreamToken=(userId)=>{
    try {
        const userIdString=userId.toString();
        return streamClient.createToken(userIdString);
    } catch (error) {
        console.log("error generating token ",error);
        return null;
    }
}