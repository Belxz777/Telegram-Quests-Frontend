"use server"
import { error, url } from "@/app/types";
import { quiztype } from "@/app/types/Main";

async function locationQuests(id:number): Promise<quiztype[] | quiztype | error>  {
console.log(id)
        const res = await fetch(`${url}quests/location/${id}`);
        if (!res.ok) {
            return {
                message: "Ошибка при получении всех квестов из локации.",
                status: res.status
            }
        }
        const response = await res.json();
        return response
    }
    export {locationQuests}