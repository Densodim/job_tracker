'use client';

import React from "react";
import {Job} from "@/app/jobs/page";

const AddItemForm = ({job, deleteJob}:Props)=>{

    return (
        <>
            <div
                key={job.id}
                className="bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow"
            >
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h2 className="font-semibold text-lg">{job.company}</h2>
                        <p className="text-gray-600">{job.position}</p>
                        <span className="text-sm text-teal-500">{job.status}</span>
                    </div>
                    <p className="font-bold text-md">{job.salary}</p>
                </div>
                <div className="flex justify-end gap-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Edit
                    </button>
                    <button
                        onClick={() => deleteJob(job.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddItemForm;

//type
type Props = {
    job: Job
    deleteJob: (id: string) => void
}