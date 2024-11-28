import {queryOptions} from '@tanstack/react-query'

export const jobsOptions = queryOptions({
    queryKey: ['jobs'],
    queryFn: async () => {
        try {
            const response = await fetch('/api/jobs')
            if (!response.ok) throw new Error("Error loading vacancies")

            return response.json()
        } catch (error) {
            console.error(error)
        }

    },
})
