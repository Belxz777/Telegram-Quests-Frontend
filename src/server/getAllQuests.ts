"use server "

import { url } from "@/app/types";
import { LocationData, Quiz, QuizData } from "@/app/types/Main";

async function getAllQuests(): Promise<QuizData>  {
    const res = await fetch(`${url}quests/`);
    if (!res.ok) {
        console.log(res.status)
        throw new Error('Failed to fetch data')
    }
    const receiveddata = await res.json();
    console.log(receiveddata)
    return receiveddata
}
async function getAllQuestsByLatLon(id:number): Promise<QuizData>  {

        const res = await fetch(`${url}quests/byLocation/${id}`);
        if (!res.ok) {
            console.log(res.status)
            throw new Error('Failed to fetch data')
        }
        const receiveddata = await res.json();
        console.log(receiveddata)
        return receiveddata
    }
    async function getLocationByLatLon(lat:any,lon:any): Promise<LocationData>  {

        const res = await fetch(`${url}location/byCoordinates/${lat}/${lon}`);
        if (!res.ok) {
            console.log(res.status)
            throw new Error('Failed to fetch data')
        }
        console.log(res)
        const response= await res.json();
  
        return response
    }
    async function getNextLocation(quizId:number): Promise<QuizData>  {

        const res = await fetch(`${url}Quests/byId/${quizId}`);
        if (!res.ok) {
            console.log(res.status)
            throw new Error('Failed to fetch data')
        }
        const receiveddata = await res.json();
        return receiveddata
    }
    async function getTeamLocations(name:string): Promise<any>  {

        const res = await fetch(`${url}quests/questsForTeam/${name}`);
        if (!res.ok) {
            console.log(res.status)
            throw new Error('Failed to fetch data')
        }
        const receiveddata = await res.json();
        return receiveddata
    }
    async function createNewQuest(quest:Quiz): Promise<any>  {
    const res = await fetch(`${url}quests/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quest),
    });
    if (!res.ok) {
        console.log(res.status)
        throw new Error('Failed to fetch data')
    }
    const receiveddata = await res.json();
    return receiveddata
    }
export { getAllQuests,getAllQuestsByLatLon,getNextLocation,getTeamLocations,createNewQuest, getLocationByLatLon};