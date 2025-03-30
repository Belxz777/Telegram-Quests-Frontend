'use server'
import { error, url } from "@/app/types";

async function deleteTeam(id: number): Promise<error | null> {
    const res = await fetch(`${url}teams/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (res.status !== 200) {
        return {
            status: res.status,
            message: "Error"
        }
    }

    return null
}
export { deleteTeam }