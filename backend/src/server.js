import express from 'express';
import ENV from './config/env.js';
import { connectDB } from './config/db.js';
import {clerkMiddleware} from '@clerk/express'
import { functions, inngest } from './config/inngest.js';
import {serve} from 'inngest/express';

const app=express();

app.use(express.json());
app.use(clerkMiddleware()); // Clerk middleware to handle authentication
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/',(req,res)=>{
    res.send("hello there");
})

const startServer=async()=>{
    try {
        await connectDB();
        if(ENV.NODE_ENV!=='production'){
            app.listen(ENV.PORT,()=>{
                console.log(`Server is running on port : ${ENV.PORT}`);
            })
        }
    } catch (error) {
        console.log("error : ",error);
        process.exit(1);
        
    }
}

startServer();

export default app;