import { useSuspenseQuery } from "@tanstack/react-query"
import { Job } from "@/app/jobs/page"

export const BASE_URL = process.env.NEXT_PUBLIC__URL

export function useJobsQuery() {
  const query = useSuspenseQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const path = `/api/jobs`
      const url = BASE_URL + path

      console.log("Fetching jobs from:", url)

      const res: Promise<Job[]> = await (
        await fetch(url, {
          cache: "no-store",
        })
      ).json()
      return res
    },
  })

  return [query.data, query] as const
}
