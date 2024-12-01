import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export async function GET() {
  try {
    const response = await axios.get(`${API_URL}/api/jobs`)
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
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
    const response = await axios.post(`${API_URL}/api/jobs`, job)
    return new Response(JSON.stringify(response.data), { status: 201 })
  } catch (error) {
    console.error("Ошибка при добавлении вакансии:", error)
    return new Response(
      JSON.stringify({ error: "Не удалось добавить вакансию" }),
      { status: 500 },
    )
  }
}
