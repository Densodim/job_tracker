'use client';

import React, { useEffect, useState } from 'react';
import AddItemForm from "@/app/components/AddItemForm/AddItemForm";

const JobPage = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newJob, setNewJob] = useState<JobForm>({
        company: '',
        position: '',
        salary: '',
        status: '',
        note: '',
    });

    const fetchJobs = async () => {
        try {
            const response = await fetch('/api/jobs');
            if (!response.ok) throw new Error('Ошибка загрузки вакансий');
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteJob = async (id: string) => {
        try {
            await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
            fetchJobs();
        } catch (error) {
            console.error('Ошибка при удалении:', error);
        }
    };

    const handleAddJob = async () => {
        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newJob),
            });
            if (!response.ok) throw new Error('Ошибка добавления вакансии');
            fetchJobs();
            setIsAdding(false);
            setNewJob({ company: '', position: '', salary: '', status: '', note: '' });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Вакансии</h1>
                <button
                    onClick={() => setIsAdding((prev) => !prev)}
                    className="bg-green-500 text-white text-xl rounded-full w-10 h-10 flex items-center justify-center"
                >
                    +
                </button>
            </div>

            {isAdding && (
                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6 shadow">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Компания</label>
                        <input
                            type="text"
                            value={newJob.company}
                            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                            className="w-full border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Вакансия</label>
                        <input
                            type="text"
                            value={newJob.position}
                            onChange={(e) => setNewJob({ ...newJob, position: e.target.value })}
                            className="w-full border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Зарплата</label>
                        <input
                            type="text"
                            value={newJob.salary}
                            onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                            className="w-full border-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">Статус</label>
                        <select
                            value={newJob.status}
                            onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                            className="w-full border-gray-300 rounded-md p-2"
                        >
                            <option value="">Выберите статус</option>
                            <option value="Open">Открыта</option>
                            <option value="Closed">Закрыта</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={handleAddJob}
                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                            Сохранить
                        </button>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            )}

            {jobs.map((job) => (
                <AddItemForm job={job} deleteJob={deleteJob}/>
            ))}
        </div>
    );
};

export default JobPage;

// Типы
export type Job = {
    id: string;
    company: string;
    position: string;
    salary: string;
    status: string;
    note: string;
};

type JobForm = Omit<Job, 'id'>;
