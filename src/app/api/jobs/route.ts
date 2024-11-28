import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export async function GET() {
  try {
    const response = await axios.get(`${API_URL}/jobs`)
    return new Response(JSON.stringify(response.data), { status: 200 })
  } catch (error) {
    console.error("Ошибка при получении данных:", error)
    return new Response(
      JSON.stringify({ error: "Не удалось получить данные" }),
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const job = await request.json()
    const response = await axios.post(`${API_URL}/jobs`, job)
    return new Response(JSON.stringify(response.data), { status: 201 })
  } catch (error) {
    console.error("Ошибка при добавлении вакансии:", error)
    return new Response(
      JSON.stringify({ error: "Не удалось добавить вакансию" }),
      { status: 500 },
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...job } = await request.json()
    const response = await axios.put(`${API_URL}/jobs/${id}`, job)
    return new Response(JSON.stringify(response.data), { status: 200 })
  } catch (error) {
    console.error("Ошибка при обновлении вакансии:", error)
    return new Response(
      JSON.stringify({ error: "Не удалось обновить вакансию" }),
      { status: 500 },
    )
  }
}


