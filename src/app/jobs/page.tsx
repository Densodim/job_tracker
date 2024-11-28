"use client"

import React, {useState} from "react"

import AddItemForm from "@/app/components/AddItemForm/AddItemForm"
import {HydrationBoundary} from "@tanstack/react-query";
import {JobsInfo} from "@/app/hooks/Jobs-info";
import {getQueryClient} from "@/app/get-query-client";
import {jobsOptions} from "@/app/hooks/Jobs";

const JobPage = () => {

    const queryClient = getQueryClient()

    void queryClient.prefetchQuery(jobsOptions)

    const [isAdding, setIsAdding] = useState(false)
    const [newJob, setNewJob] = useState<JobForm>({
        company: "",
        position: "",
        salary: "",
        status: "",
        note: "",
    })


    const handleAddJob = async () => {
        try {
            const response = await fetch("/api/jobs", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newJob),
            })
            if (!response.ok) throw new Error("Ошибка добавления вакансии")
            // fetchJobs()
            setIsAdding(false)
            setNewJob({company: "", position: "", salary: "", status: "", note: ""})
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
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
                <AddItemForm
                    newJob={newJob}
                    setNewJob={setNewJob}
                    handleAddJob={handleAddJob}
                    setIsAdding={setIsAdding}
                />
            )}


            <HydrationBoundary state={queryClient}>
                <JobsInfo/>
            </HydrationBoundary>
        </>
    )
}

export default JobPage

// Типы
export type Job = {
    _id: string
    company: string
    position: string
    salary: string
    status: string
    note: string
}

export type JobForm = Omit<Job, "_id">
