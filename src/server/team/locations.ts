"use server"
import { error, url } from "@/app/types";
import { LocationData } from "@/app/types/Main";

    async function teamLocations(name:string): Promise<LocationData[] | LocationData | error>  {
        if(!name){
            return {
                status: 600,
                message: "Не отправлены данные"
            }
        }
        const res = await fetch(`${url}quests/personal/${name}`);
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

    export { teamLocations }