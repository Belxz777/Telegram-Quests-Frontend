"use server "

import { url } from "@/app/types";

async function getAllTeams(): Promise<Teams[] | Teams | null>  {
    const res = await fetch(`${url}team/`);
    if (!res.ok) {
        console.log(res.status)
        throw new Error('Failed to fetch data')
    }
    const response = await res.json();
    return response
}
async function deleteTeam(id: number): Promise<any> {
    const res = await fetch(`${url}team/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (!res.ok) {
        console.log(res.status)
        throw new Error('Failed to fetch data')
    }
    if (res.status !== 200) {
        console.log(res.status)
        return "Error "
    }

    return "deleted"
}
async function getTeamData(name: string): Promise<Teams | null> {
    if(!name){
        return null
    }
    const res = await fetch(`${url}team/name/${name}`);
    if (!res.ok) {
        console.log(res.status)
        throw new Error('Failed to fetch data')
    }
    const response = await res.json();
    return response
}
export { getAllTeams,deleteTeam,getTeamData };