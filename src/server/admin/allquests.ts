"use server"
import { error, url } from "@/app/types";
import { quiztype } from "@/app/types/Main";

async function allQuests(): Promise<quiztype[]|quiztype|error>  {
    const res = await fetch(`${url}quests/`);
    if (!res.ok) {
        return {
            message: "Error",
            status: res.status
        }
    }
    const receiveddata = await res.json();
    console.log(receiveddata)
    return receiveddata
}
export {allQuests}