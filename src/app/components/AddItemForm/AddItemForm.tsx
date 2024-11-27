import React from "react";
import {JobForm} from "@/app/jobs/page";


const AddItemForm = ({newJob, setNewJob, handleAddJob, setIsAdding}:Props) => {
    return (
        <>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6 shadow">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Компания</label>
                    <input
                        type="text"
                        value={newJob.company}
                        onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                        className="w-full border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Вакансия</label>
                    <input
                        type="text"
                        value={newJob.position}
                        onChange={(e) => setNewJob({...newJob, position: e.target.value})}
                        className="w-full border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Зарплата</label>
                    <input
                        type="text"
                        value={newJob.salary}
                        onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                        className="w-full border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Статус</label>
                    <select
                        value={newJob.status}
                        onChange={(e) => setNewJob({...newJob, status: e.target.value})}
                        className="w-full border-gray-300 rounded-md p-2"
                    >
                        <option value="">Выберите статус</option>
                        <option value="Open">Открыта</option>
                        <option value="Closed">Закрыта</option>
                    </select>
                </div>
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