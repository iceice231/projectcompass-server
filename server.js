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

app.use(cors({origin: true}))
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.send(200);
    // Теперь вы готовы к новым высотам!
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