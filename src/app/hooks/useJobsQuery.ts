import useJobs from "@/app/hooks/useJobs"

const isProduction = process.env.NODE_ENV === 'production';
export const BASE_URL = isProduction
    ? process.env.NEXT_PUBLIC__URL
    : 'http://localhost:3000';

function useJobsQuery() {
  const query = useJobs()

  return {
    jobs: query.data,
  }
}

export default useJobsQuery
