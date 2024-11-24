import axios from 'axios';

const API_URL = process.env.BACKEND_API_URL; // URL вашего Express сервера

export async function GET() {
  const response = await axios.get(`${API_URL}/jobs`);
  return new Response(JSON.stringify(response.data), { status: 200 });
}

export async function POST(request) {
  const job = await request.json();
  const response = await axios.post(`${API_URL}/jobs`, job);
  return new Response(JSON.stringify(response.data), { status: 201 });
}

export async function PUT(request) {
  const { id, ...job } = await request.json();
  const response = await axios.put(`${API_URL}/jobs/${id}`, job);
  return new Response(JSON.stringify(response.data), { status: 200 });
}

export async function DELETE(request) {
  const { id } = await request.json();
  await axios.delete(`${API_URL}/jobs/${id}`);
  return new Response(null, { status: 204 });
}
