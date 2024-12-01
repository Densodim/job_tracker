"use client"
import React from "react"
import { JobForm } from "@/app/jobs/page"
import { useForm } from "@mantine/form"
import UniversalInput from "@/app/components/Input/UniversalInput"
import UniversalSelect from "@/app/components/Select/UniversalSelect"
import { Textarea } from "@mantine/core"

export enum StatusJobs {
  Applied = "APPLIED",
  Interviewed = "INTERVIEWED",
  Rejected = "REJECTED",
}

export const optionsSelect = [
  { value: StatusJobs.Applied, label: "Applied" },
  { value: StatusJobs.Interviewed, label: "Interviewed" },
  { value: StatusJobs.Rejected, label: "Rejected" },
]

const AddItemForm = ({ AddJob, setIsAdding }: Props) => {
  const mantine = useForm({
    initialValues: {
      company: "",
      position: "",
      salary: 0,
      status: "",
      note: "",
    },
    validate: {
      company: (value) => (value.trim() ? null : "Company name is required"),
      position: (value) =>
        value.trim().length >= 2
          ? null
          : "Position must have at least 2 letters",
      salary: (value) =>
        value > 0 && Number.isFinite(value)
          ? null
          : "Salary must be a positive number",
      note: (value) => (value.trim() ? null : "Note name is required"),
      status: (value) => (value ? null : "Status is required"),
    },
  })

  const handleAddJob = async () => {
    const validation = mantine.validate()
    if (!validation.hasErrors) {
      await AddJob(mantine.values, mantine.reset)
    }
  }

  return (
    <>
      <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6 shadow">
        <UniversalInput
          label={"Company"}
          value={mantine.values.company}
          placeholder={"Company"}
          onChange={(value) =>
            mantine.setFieldValue("company", value as string)
          }
        />
        {mantine.errors.company && (
          <div className="text-red-500 text-sm">{mantine.errors.company}</div>
        )}
        <UniversalInput
          label={"Position"}
          value={mantine.values.position}
          placeholder={"Position"}
          onChange={(value) =>
            mantine.setFieldValue("position", value as string)
          }
        />
        {mantine.errors.position && (
          <div className="text-red-500 text-sm">{mantine.errors.position}</div>
        )}
        <UniversalInput
          label={"Salary"}
          type={"number"}
          value={mantine.values.salary}
          placeholder={"Salary"}
          onChange={(value) => mantine.setFieldValue("salary", Number(value))}
        />
        {mantine.errors.salary && (
          <div className="text-red-500 text-sm">{mantine.errors.salary}</div>
        )}
        <Textarea
          label={"Note"}
          value={mantine.values.note}
          placeholder={"Note"}
          onChange={(event) =>
            mantine.setFieldValue("note", event.target.value)
          }
        />
        {mantine.errors.note && (
          <div className="text-red-500 text-sm">{mantine.errors.note}</div>
        )}

        <UniversalSelect
          label="Status"
          placeholder="Select job status"
          value={mantine.values.status}
          onChange={(value) => mantine.setFieldValue("status", value as string)}
          options={optionsSelect}
        />
        {mantine.errors.status && (
          <div className="text-red-500 text-sm">{mantine.errors.status}</div>
        )}

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
    </>
  )
}

export default AddItemForm

//type
type Props = {
  AddJob: (newJobs: JobForm, resetForm: () => void) => Promise<void>
  setIsAdding: (isAdding: boolean) => void
}
