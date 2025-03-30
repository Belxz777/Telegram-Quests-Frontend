
import { error } from "@/app/types";
import { someError, Team } from "@/app/types/Main";
import { findTeam } from "@/server/team/find";
import { useEffect, useState } from "react"

const useSearch =(name:string) =>{
    const [teamDataOne, setTeamData] = useState< Team| error | null>(null);
async function searchByName (name:string): Promise<any>  {
    try {
        // 
        const data = await  findTeam(name);

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