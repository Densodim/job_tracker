"use client"

import React, { Suspense } from "react"
import { Job } from "@/app/jobs/page"
import { useUpdateJob } from "@/app/hooks/useUpdateJob"
import { useShowNotification } from "@/app/hooks/useShowNotification"
import { notifications } from "@mantine/notifications"
import EditableField from "@/app/components/EditableField/EditableField"

function ItemForm ({ job, deleteJob }: Props){
  const { data, isError, updateJob, isLoading, isSuccess, error } =
    useUpdateJob()

  useShowNotification({ isError, error, isLoading })

  const handleSave = async ({ field, newValue }: handleSaveType) => {
    try {
      await updateJob({ ...job, [field]: newValue })
      notifications.show({
        title: "Успешно обновлено",
        message: `Поле "${field}" обновлено`,
        color: "green",
        autoClose: 5000,
        position: "top-center",
      })
    } catch (error: any) {
      notifications.show({
        title: "Ошибка",
        message: `Не удалось обновить: ${error.message}`,
        color: "red",
        autoClose: 5000,
        position: "top-center",
      })
    }
  }
  return (
    <>
      <div
        key={job._id}
        className="bg-white border border-gray-300 rounded-lg p-4 mb-4 shadow"
      >
        <div className="flex justify-between items-center mb-2">
          <div>
            <Suspense fallback={<div>Loading...</div>}>
              <h2>
                <EditableField
                  value={job.company}
                  onSave={(value) =>
                    handleSave({ field: "company", newValue: value })
                  }
                  style={"font-semibold text-lg"}
                />
              </h2>
              <EditableField
                value={job.position}
                onSave={(value) =>
                  handleSave({ field: "position", newValue: value })
                }
                style={"text-gray-600"}
              />
              <EditableField
                value={job.status}
                onSave={(value) =>
                  handleSave({ field: "status", newValue: value })
                }
                style={"text-sm text-teal-500"}
                type={"select"}
              />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <EditableField
                value={job.note}
                onSave={(value) =>
                  handleSave({ field: "note", newValue: value })
                }
                style={"text-gray-600 font-semibold text-lg"}
              />
            </Suspense>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="flex justify-between items-center mb-2">
              <EditableField
                value={job.salary}
                onSave={(value) =>
                  handleSave({ field: "salary", newValue: value })
                }
                style={"font-bold text-md"}
                type={"number"}
              />
              <p>$</p>
            </div>
          </Suspense>
        </div>
        <div className="flex justify-end gap-2">
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
