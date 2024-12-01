import { useSuspenseQuery } from "@tanstack/react-query"
import { Job } from "@/app/jobs/page"
import { BASE_URL } from "@/app/hooks/useJobsQuery"

function useJobs() {
  const query = useSuspenseQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const path = `/api/jobs`
      const url = BASE_URL + path

      const res: Promise<Job[]> = await (
        await fetch(url, {
          cache: "no-store",
        })
      ).json()
      return res
    },
  })
  return query
}

export default useJobs
