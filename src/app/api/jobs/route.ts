import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_BACKEND

export async function GET() {
  try {
    const response = await axios.get(`${API_URL}/api/jobs`, {
      withCredentials: true,
    })
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("Ошибка при получении данных:", error)
    return new Response(
      JSON.stringify({ error: "Не удалось получить данные" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}

export async function POST(request: Request) {
  try {
    const job = await request.json()

    const response = await axios.post(`${API_URL}/api/jobs`, job, {
      withCredentials: true,
    })

    if (response.status === 201) {
      return new Response(JSON.stringify(response.data), {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      })
    }

    throw new Error("API returned an unexpected status")
  } catch (error: any) {
    console.error(
      "Ошибка при добавлении вакансии:",
      error.response?.data || error.message,
    )
    return new Response(
      JSON.stringify({
        error: error.response?.data?.message || "Не удалось добавить вакансию",
      }),
      { status: 500 },
    )
  }
}
