
import { someError, Team } from "@/app/types/Main";
import { getTeamDataByName } from "@/server/getAllTeamData";
import { useEffect, useState } from "react"

const useSearch =(name:string) =>{
    const [teamDataOne, setTeamData] = useState< Team| someError | null>(null);
async function searchByName (name:string): Promise<any>  {
    try {
        // 
        const data = await  getTeamDataByName(name);

        setTeamData(data);
        
    } catch (error) {
        console.log(error);
    }
}
    useEffect(() => {
        setTimeout(()=>{
            searchByName(name);
        },2000)
    }, [name])
    return teamDataOne
}
export { useSearch}