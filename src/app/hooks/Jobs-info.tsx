'use client'

import React from 'react'
import {useSuspenseQuery} from '@tanstack/react-query'
import {jobsOptions} from "@/app/hooks/Jobs";
import ItemForm from "@/app/components/ItemForm/ItemForm";
import {Job} from "@/app/jobs/page";


export function JobsInfo() {
    const {data} = useSuspenseQuery(jobsOptions)

    const deleteJob = async (id: string) => {
        try {
            await fetch(`/api/jobs/${id}`, {method: "DELETE"})
        } catch (error) {
            console.error("Ошибка при удалении:", error)
        }
    }

    return (
        <div>
            {
                data?.map((item: Job) => {
                    return (
                        <div key={item._id}>
                            <ItemForm job={item} deleteJob={deleteJob} />
                        </div>
                    )
                })
            }
        </div>
    )
}