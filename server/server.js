import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";
import {router} from "./routes/jobRoutes.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const dbUri = process.env.MONGO_PUBLIC_URL; // Укажите ваш URI для MongoDB

if (!dbUri) {
    console.error("Ошибка: Строка подключения не найдена!");
    process.exit(1);  // Завершаем выполнение, если строка подключения не найдена
}

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Маршруты
app.use(router);

// Подключение к базе данных MongoDB
mongoose
    .connect(dbUri)
    .then(() => {
        console.log('Подключение к базе данных успешно');
        app.listen(port, () => {
            console.log(`Сервер запущен на порту ${port}`);
        });
    })
    .catch((error) => {
        console.error('Ошибка при подключении к базе данных:', error);
    });
