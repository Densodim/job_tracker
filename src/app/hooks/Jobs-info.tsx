"use client"

import React from "react"
import {useSuspenseQuery} from "@tanstack/react-query"
import {jobsOptions} from "@/app/hooks/Jobs"
import ItemForm from "@/app/components/ItemForm/ItemForm"
import {Job} from "@/app/jobs/page"
import {useDeleteJob} from "@/app/hooks/useDeleteJob";

export function JobsInfo() {
    const {data} = useSuspenseQuery(jobsOptions)

    const {mutate: deleteJob, isSuccess, isPending, isError, error} = useDeleteJob()

    const handleDeleteJob = async (_id: string) => {
        deleteJob(_id)
    }

    return (
        <div>
            {isError && <div className="text-red-500">Ошибка: {error?.message}</div>}
            {isPending && <div className="text-blue-500">Удаление...</div>}
            {isSuccess && <div className="text-blue-500">Вакансия успешно удалена</div>}

            {data?.map((item: Job) => {
                return (
                    <div key={item._id}>
                        <ItemForm job={item} deleteJob={handleDeleteJob}/>
                    </div>
                )
            })}
        </div>
    )
}
