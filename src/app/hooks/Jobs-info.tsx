'use client'

import React from 'react'
import {useQueryClient, useSuspenseQuery} from '@tanstack/react-query'
import {jobsOptions} from "@/app/hooks/Jobs";
import ItemForm from "@/app/components/ItemForm/ItemForm";
import {Job} from "@/app/jobs/page";


export function JobsInfo() {
    const {data} = useSuspenseQuery(jobsOptions)
    const queryClient = useQueryClient();

    const deleteJob = async (_id: string) => {
        try {
            const response =  await fetch(`/api/jobs/${_id}`, {method: "DELETE"})
            if (!response.ok) {
                throw new Error('Error during deletion')
            }

            await queryClient.invalidateQueries({queryKey: ['jobs'], exact: true, refetchType: 'all'});

        } catch (error) {
            console.error("Error when deleting:", error)
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