import axios from "axios"
import {NextRequest} from "next/server";
import {API_URL} from "@/app/api/jobs/route";



export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    if (!id) {
      return new Response(JSON.stringify({ error: "ID не передан" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    await axios.delete(`${API_URL}/api/jobs/${id}`)
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error("Ошибка при удалении вакансии:", error)
    return new Response(
      JSON.stringify({ error: "Не удалось удалить вакансию" }),
      { status: 500 },
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { _id, ...job } = await request.json()
    if (!_id) {
      return new Response(
        JSON.stringify({ error: "ID вакансии не передано" }),
        { status: 400 },
      )
    }
    const response = await axios.put(`${API_URL}/api/jobs/${_id}`, job)

    return new Response(JSON.stringify(response.data), { status: 200 })
  } catch (error) {
    console.error("Ошибка при обновлении вакансии:", error)

    return new Response(
      JSON.stringify({ error: "Не удалось обновить вакансию" }),
      { status: 500 },
    )
  }
}
