import { getTeamByName } from "@/server/getAllQuests";
import { useEffect, useState } from "react"

const useSearch =(name:string) =>{
    const [teamDataOne, setTeamData] = useState< Teams | null>(null);
async function searchByName (name:string): Promise<any>  {
    try {
        const data = await  getTeamByName(name);
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