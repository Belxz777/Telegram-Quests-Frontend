import { Team } from "@/app/types/Main";
import { allTeams } from "@/server/admin/allteams";
import { useEffect, useState } from "react";

export const useTeamData = () =>{
    const [teamData, setTeamData] = useState<Team[] | Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)
useEffect(()=>{
fetchData()
},[])
    const fetchData = async () => {
        try {
            const data = await allTeams();
            if(!data){
                setIsLoading(false);
                setIsNotFound(true);
                return;
            }
            setTeamData(data as Team | Team[]);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };    if(isNotFound){
        setIsLoading(false);
    }
    return {teamData,fetchData,isLoading,isNotFound,isAdmin}
}