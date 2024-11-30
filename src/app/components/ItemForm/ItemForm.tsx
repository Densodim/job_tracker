"use client"

import React from "react"
import { Job } from "@/app/jobs/page"
import { EditableField } from "@/app/components/EditableField/EditableField"
import { useUpdateJob } from "@/app/hooks/useUpdateJob"

const ItemForm = ({ job, deleteJob }: Props) => {
  const { mutate: updateJob } = useUpdateJob()

  const handleSave = ({ field, newValue }: handleSaveType) => {
    updateJob({ ...job, [field]: newValue })
  }
  return (
    <>
      <div
        key={job._id}
        className="bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow"
      >
        <div className="flex justify-between items-center mb-2">
          <div>
            <EditableField
              value={job.company}
              onSave={(value) =>
                handleSave({ field: "company", newValue: value })
              }
            />

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
            onClick={() => deleteJob(job._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

export default ItemForm

//type
type Props = {
  job: Job
  deleteJob: (id: string) => void
}

type handleSaveType = {
  field: keyof Job
  newValue: string | number
}
