import { getAllTeams } from "@/server/getAllTeamData";
import { useEffect, useState } from "react";

export const useTeamData = () =>{
    const [teamData, setTeamData] = useState<Teams[] | Teams | null>(null);
useEffect(()=>{
fetchData()
},[])
    const fetchData = async () => {
        try {
            const data = await getAllTeams();
            setTeamData(data);
        } catch (error) {
            console.log(error);
        }
    };
    return {teamData,fetchData}
}