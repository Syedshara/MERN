import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import user from './routes/user.js'
import auth from './routes/auth.js'
import post from './routes/post.js'
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.URL_DB)
    .then(() => {
        app.listen(3000, () => {
            console.log("server is running on port 3000! ")
        })
    })
    .catch((err) => {
        console.log(err)
    })
app.use(cookieParser())
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api/post', post)

app.use((error, req, res, next) => {

    const status = error.status || 500
    const message = error.message || "Internal Server Error"
    const code = error.code || 1000

    res.status(status).json(
        {
            success: false,
            status,
            message,
            code,
        }
    )
})   