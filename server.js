import express from 'express';
import mongoose from "mongoose";
import cors from "cors"
import multer from "multer";
import authRoute from './routes/auth.js'
import projectRoute from './routes/project.js'
import 'dotenv/config.js'
import { config } from "dotenv";
import './loadEnv.js'


const app = express()

app.use(cors(
    {origin: "https://projectcompass-server-production.up.railway.app"}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://projectcompass-server-production.up.railway.app"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.urlencoded({ extended: true }))
app.use(express.json({limit: '50mb'}));
app.use('/uploads', express.static('./uploads'))
app.use('/api/auth', authRoute)
app.use('/api/project', projectRoute)
async function start() {
    console.log(process.env.MONGODB_URI)
    try {
        await mongoose.connect(
            // 'mongodb+srv://admin:admin@projectcompass.auw8uel.mongodb.net/?retryWrites=true&w=majority'
            process.env.MONGODB_URI
        )
        app.listen(3001, () => console.log('Сервер успешно запущен'))
    } catch (error) {
        console.log(error)
    }
}
start();