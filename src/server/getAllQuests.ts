"use server "

import { url } from "@/app/types";
import { Quiz, QuizData } from "@/app/types/Main";

async function getAllQuests(): Promise<QuizData>  {
    const res = await fetch(`${url}Quests/`);
    if (!res.ok) {
        console.log(res.status)
        throw new Error('Failed to fetch data')
    }
    const receiveddata = await res.json();
    console.log(receiveddata)
    return receiveddata
}
async function getAllQuestsByLatLon(lat:any,lon:any): Promise<QuizData>  {

        const res = await fetch(`${url}Quests/byCoordinates/${lat}/${lon}/`);
        if (!res.ok) {
            console.log(res.status)
            throw new Error('Failed to fetch data')
        }
        const receiveddata = await res.json();
        console.log(receiveddata)
        return receiveddata
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

        const res = await fetch(`${url}Quests/questsForTeam/${name}`);
        if (!res.ok) {
            console.log(res.status)
            throw new Error('Failed to fetch data')
        }
        const receiveddata = await res.json();
        return receiveddata
    }
    async function createNewQuest(quest:Quiz): Promise<any>  {
    const res = await fetch(`${url}Quests/`, {
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
export { getAllQuests,getAllQuestsByLatLon,getNextLocation,getTeamLocations,createNewQuest};