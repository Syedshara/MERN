import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import user from  './routes/user.js'
dotenv.config();
const app = express();

mongoose.connect(process.env.URL_DB)
        .then(()=>{
            app.listen(3000,()=>{
                console.log("server is running on port 3000! ")
            })
        })
       .catch((err)=>{
            console.log(err)
       }) 

app.use('/api/user',user)