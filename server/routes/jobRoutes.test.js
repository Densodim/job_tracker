import request from 'supertest';
import express from 'express';
import { router } from './jobRoutes.js';  // Путь к вашему маршруту
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

// Создаем приложение Express и подключаем роуты
const app = express();
app.use(express.json());
app.use(router);

// Мокаем модель Job для тестов
const mockJob = {
    _id: "63456789abcdef1234567890",
    company: "Google",
    position: "Software Engineer",
    salary: 100000,
    status: "Applied",
    note: "Waiting for response"
};

beforeEach(() => {
    // Очищаем mockingoose перед каждым тестом
    mockingoose.resetAll();
});

afterAll(() => {
    mongoose.disconnect();
});

describe('Job API', () => {
    describe('GET /api/jobs', () => {
        it('должен вернуть список вакансий', async () => {
            mockingoose(Job).toReturn([mockJob], 'find');

            const response = await request(app).get('/api/jobs');

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toMatchObject({
                company: 'Google',
                position: 'Software Engineer',
                salary: 100000,
                status: 'Applied',
                note: 'Waiting for response',
            });
        });

        it('должен вернуть ошибку при неудаче', async () => {
            mockingoose(Job).toReturn(new Error('Error'), 'find');

            const response = await request(app).get('/api/jobs');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Ошибка при получении вакансий');
        });
    });

    describe('POST /api/jobs', () => {
        it('должен добавить новую вакансию', async () => {
            const newJob = {
                company: "Google",
                position: "Software Engineer",
                salary: 100000,
                status: "Applied",
                note: "Waiting for response"
            };

            mockingoose(Job).toReturn(newJob, 'save');

            const response = await request(app)
                .post('/api/jobs')
                .send(newJob);

            expect(response.status).toBe(201);
            expect(response.body).toMatchObject(newJob);
        });

        it('должен вернуть ошибку при добавлении вакансии', async () => {
            const newJob = {
                company: "Google",
                position: "Software Engineer",
                salary: 100000,
                status: "Applied",
                note: "Waiting for response"
            };

            mockingoose(Job).toReturn(new Error('Error'), 'save');

            const response = await request(app)
                .post('/api/jobs')
                .send(newJob);

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Ошибка при добавлении вакансии');
        });
    });

    describe('PUT /api/jobs/:id', () => {
        it('должен обновить вакансию', async () => {
            const updatedJob = {
                company: "Google",
                position: "Senior Software Engineer",
                salary: 150000,
                status: "Interviewed",
                note: "Interview scheduled"
            };

            mockingoose(Job).toReturn(updatedJob, 'findByIdAndUpdate');

            const response = await request(app)
                .put(`/api/jobs/${mockJob._id}`)
                .send(updatedJob);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject(updatedJob);
        });

        it('должен вернуть ошибку, если вакансия не найдена', async () => {
            const updatedJob = {
                company: "Google",
                position: "Senior Software Engineer",
                salary: 150000,
                status: "Interviewed",
                note: "Interview scheduled"
            };

            mockingoose(Job).toReturn(null, 'findByIdAndUpdate');

            const response = await request(app)
                .put(`/api/jobs/${mockJob._id}`)
                .send(updatedJob);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Вакансия не найдена');
        });

        it('должен вернуть ошибку при обновлении вакансии', async () => {
            const updatedJob = {
                company: "Google",
                position: "Senior Software Engineer",
                salary: 150000,
                status: "Interviewed",
                note: "Interview scheduled"
            };

            mockingoose(Job).toReturn(new Error('Error'), 'findByIdAndUpdate');

            const response = await request(app)
                .put(`/api/jobs/${mockJob._id}`)
                .send(updatedJob);

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Ошибка при обновлении вакансии');
        });
    });

    describe('DELETE /api/jobs/:id', () => {
        it('должен удалить вакансию', async () => {
            mockingoose(Job).toReturn(mockJob, 'findByIdAndDelete');

            const response = await request(app).delete(`/api/jobs/${mockJob._id}`);

            expect(response.status).toBe(204);
            expect(response.body.message).toBe('Вакансия удалена');
        });

        it('должен вернуть ошибку, если вакансия не найдена', async () => {
            mockingoose(Job).toReturn(null, 'findByIdAndDelete');

            const response = await request(app).delete(`/api/jobs/${mockJob._id}`);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Вакансия не найдена');
        });

        it('должен вернуть ошибку при удалении вакансии', async () => {
            mockingoose(Job).toReturn(new Error('Error'), 'findByIdAndDelete');

            const response = await request(app).delete(`/api/jobs/${mockJob._id}`);

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Ошибка при удалении вакансии');
        });
    });
});
