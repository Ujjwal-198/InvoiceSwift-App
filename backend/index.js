import express from 'express';
import dotenv from 'dotenv';
import DBconnection from './config/DBconnection.js';
import { invoiceRouter, userRouter } from './router/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middleware/authMiddleware.js';

const app = express();
dotenv.config();
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const port = process.env.PORT;
const uri = process.env.DB_URL;
DBconnection(uri);

app.use('/api/invoice', authMiddleware, invoiceRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('Hello from backend');
})

app.listen(port, () => {
    console.log(`Server started at port ${port} : http://localhost:${port}`);
})