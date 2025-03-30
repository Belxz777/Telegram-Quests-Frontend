"use server"

import { error, url } from "@/app/types";
import { Team } from "@/app/types/Main";

async function createTeam(name: string): Promise<Team |error> {
const res = await fetch(`${url}teams/`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
name: name
})
});
if (!res.ok) {
return {
    message: "Error",
    status: res.status
}
}

const response= await res.json();

return response
}

export {createTeam}