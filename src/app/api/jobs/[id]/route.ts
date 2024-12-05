import axios from "axios"
import {NextRequest, NextResponse} from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BACKEND

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    if (!id) {
      return new Response(JSON.stringify({ error: "ID не передан" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      })
    }

    await axios.delete(`${API_URL}/api/jobs/${id}`, {withCredentials: true})
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
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
    const data = await request.json();

    const { _id, ...job } = data;

    if (!_id) {
      console.error("Ошибка: ID вакансии не передано.");
      return new Response(
          JSON.stringify({ error: "ID вакансии не передано" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            },
          }
      );
    }

    const response = await axios.put(
        `${API_URL}/api/jobs/${_id}`,
        job,
        { withCredentials: true }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    return new Response(
        JSON.stringify({
          error: "Не удалось обновить вакансию",
        }),
        {

          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        }
    );
  }
}