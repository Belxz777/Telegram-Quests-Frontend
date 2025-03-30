"use server"
import { error, url } from "@/app/types";
import { Team } from "@/app/types/Main";

async function allTeams(): Promise<Team[] | Team | error>  {
    const res = await fetch(`${url}teams/`);
    if (!res.ok) {
    return {
        message: "Error",
        status: res.status
    }
    }
    const response = await res.json();
    return response
}
export {allTeams}