'use client';

import React, { useEffect, useState } from 'react';
import ItemForm from "@/app/components/ItemForm/ItemForm";
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
                <AddItemForm newJob={newJob} setNewJob={setNewJob} handleAddJob={handleAddJob} setIsAdding={setIsAdding}/>
            )}

            {jobs.map((job) => (
                <ItemForm job={job} deleteJob={deleteJob}/>
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

export type JobForm = Omit<Job, 'id'>;
