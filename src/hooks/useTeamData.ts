import { getAllTeams } from "@/server/getAllTeamData";
import { useEffect, useState } from "react";

export const useTeamData = () =>{
    const [teamData, setTeamData] = useState<Team[] | Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);
useEffect(()=>{
fetchData()
},[])
    const fetchData = async () => {
        try {
            const data = await getAllTeams();
            if(!data){
                setIsLoading(false);
                setIsNotFound(true);
                return;
            }
            setTeamData(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    if(isNotFound){
        setIsLoading(false);
    }
    return {teamData,fetchData,isLoading,isNotFound}
}