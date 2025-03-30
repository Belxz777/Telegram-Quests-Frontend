"use server"
import { error, url } from "@/app/types";
import { Team } from "@/app/types/Main";

async function findTeam(name: string): Promise<Team |  error > {
    if(!name){
        return {
            status: 600,
            message: "Не отправлены данные"
        }
    }
    const res = await fetch(`${url}teams/auth/${name}`);
    if (!res.ok) {
        console.error( {
            message: "Error",
            statusCode: res.status
        })
  return {
    status: res.status,
    message: 'err'
  }
    }
    const response = await res.json();
  
    return response
}
export { findTeam }