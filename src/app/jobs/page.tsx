'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';



const JobPage = () => {
    const [jobs, setJobs] = useState<Job[]>([]);

    const fetchJobs = async () => {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        setJobs(data);
    };

    const deleteJob = async (id: string) => {
        await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
        fetchJobs(); // Обновляем список после удаления
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Вакансии</h1>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2">Компания</th>
                    <th className="border border-gray-300 px-4 py-2">Вакансия</th>
                    <th className="border border-gray-300 px-4 py-2">Зарплата</th>
                    <th className="border border-gray-300 px-4 py-2">Статус</th>
                    <th className="border border-gray-300 px-4 py-2">Действия</th>
                </tr>
                </thead>
                <tbody>
                {jobs.map((job) => (
                    <tr key={job._id}>
                        <td className="border border-gray-300 px-4 py-2">{job.company}</td>
                        <td className="border border-gray-300 px-4 py-2">{job.position}</td>
                        <td className="border border-gray-300 px-4 py-2">{job.salary}</td>
                        <td className="border border-gray-300 px-4 py-2">{job.status}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <Link href={`/jobs/${job._id}`}>
                                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Редактировать</button>
                            </Link>
                            <button
                                onClick={() => deleteJob(job._id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link href="/jobs/new">
                <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">Добавить вакансию</button>
            </Link>
        </div>
    );
};

export default JobPage;

//type
interface Job {
    _id: string;
    company: string;
    position: string;
    salary: string;
    status: string;
    note: string;
}