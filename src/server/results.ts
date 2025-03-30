"use server"
import { url } from "@/app/types";

async function sendResults(name: string, formData: FormData): Promise<any> {
  const res = await fetch(`${url}teams/results/${name}`, {
    method: 'POST',
    body: formData, // Передаем FormData напрямую
  });

  if (res.status !== 201) {
    return null;
  }

  const response = await res.json();
  return response;
}
export  { sendResults }