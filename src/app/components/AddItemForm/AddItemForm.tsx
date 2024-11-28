'use client';
import React, {useState} from "react";
import {JobForm} from "@/app/jobs/page";
import {useForm} from "@mantine/form";
import UniversalInput from "@/app/components/Input/UniversalInput";
import UniversalSelect from "@/app/components/Select/UniversalSelect";

export enum StatusJobs {
    Applied = 'APPLIED',
    Interviewed = 'INTERVIEWED',
    Rejected = 'REJECTED',
}

const options = [
    { value: StatusJobs.Applied, label: 'Applied' },
    { value: StatusJobs.Interviewed, label: 'Interviewed' },
    { value: StatusJobs.Rejected, label: 'Rejected' },
];

const AddItemForm = ({newJob, setNewJob, handleAddJob, setIsAdding}:Props) => {
    const [status, setStatus] = useState('');

    const form = useForm({
        initialValues: {
            company: '',
            position: '',
            salary: 0,
            status: StatusJobs.Applied,
        },
        validate: {
            company: (value) => (value.trim() ? null : 'Company name is required'),
            position: (value) =>
                value.trim().length >= 2 ? null : 'Position must have at least 2 letters',
            salary: (value) =>
                value > 0 && Number.isFinite(value) ? null : 'Salary must be a positive number',
        },
    });


    return (
        <>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6 shadow">
                <UniversalInput
                    label={'Company'}
                    value={form.values.company}
                    placeholder={'Company'}
                    onChange={(value) => form.setFieldValue('company', value as string)}
                />
                {form.errors.company && (
                    <div className="text-red-500 text-sm">{form.errors.company}</div>
                )}
                <UniversalInput
                    label={'Position'}
                    value={form.values.position}
                    placeholder={'Position'}
                    onChange={(value) => form.setFieldValue('position', value as string)}
                />
                {form.errors.position && (
                    <div className="text-red-500 text-sm">{form.errors.position}</div>
                )}
                <UniversalInput
                    label={'Salary'}
                    type={'number'}
                    value={form.values.salary}
                    placeholder={'Salary'}
                    onChange={(value) => form.setFieldValue('salary', Number(value))}
                />
                {form.errors.salary && (
                    <div className="text-red-500 text-sm">{form.errors.salary}</div>
                )}

                <UniversalSelect
                    label="Status"
                    placeholder="Select job status"
                    value={status}
                    onChange={setStatus}
                    options={options}
                />

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

export default AddItemForm;

//type
type Props = {
    newJob:JobForm
    setNewJob: (newJob:JobForm) => void
    handleAddJob: () => void
    setIsAdding: (isAdding: boolean) => void
}