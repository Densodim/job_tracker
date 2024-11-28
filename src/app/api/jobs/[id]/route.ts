import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id) {
            return new Response(JSON.stringify({ error: "ID не передан" }), { status: 400 });
        }

        await axios.delete(`${API_URL}/jobs/${id}`);
        return new Response(null, { status: 204 });

    } catch (error) {
        console.error("Ошибка при удалении вакансии:", error);
        return new Response(
            JSON.stringify({ error: "Не удалось удалить вакансию" }),
            { status: 500 }
        );
    }
}