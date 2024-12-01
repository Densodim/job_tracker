import useJobs from "@/app/hooks/useJobs"

export const BASE_URL = process.env.NEXT_PUBLIC__URL

function useJobsQuery() {
  const query = useJobs()

  return {
    jobs: query.data,
  }
}

export default useJobsQuery
