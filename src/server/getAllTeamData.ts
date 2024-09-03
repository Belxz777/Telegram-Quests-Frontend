"use server "

import { url } from "@/app/types";

async function getAllTeams(): Promise<Team[] | Team | null>  {
    const res = await fetch(`${url}team/`);
    if (!res.ok) {
        console.log(res.status)
        throw new Error('Failed to fetch data')
    }
    if (res.status == 404) {
        console.log(res.status)
        return null
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
async function getTeamDataByName(name: string): Promise<Team | someError | null> {
    if(!name){
        return null
    }
    const res = await fetch(`${url}team/name/${name}`);
    if (!res.ok) {
        console.log(res.status)
  return {
    message: "Error",
    statusCode: res.status
  }
    }
    const response = await res.json();
    return response
}
export { getAllTeams,deleteTeam,getTeamDataByName };