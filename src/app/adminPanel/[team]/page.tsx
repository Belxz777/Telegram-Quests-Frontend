"use client"
import { Team } from "@/app/types";
import Loading from "@/components/Loading";
import { getTeamDataByName } from "@/server/getAllTeamData"
import { useBackButton } from "@tma.js/sdk-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { GoCheck } from "react-icons/go";


interface Props  {
    params:{team:string}
}
export default function Component(params:Props) {

    const [teamData, setTeamData] = useState<any>(null);
const [loading, setloading] = useState(true)
    useEffect(() => {
 fetchData()
    }, [])

            const fetchData = async () => {
                try {
                    const data = await getTeamDataByName(params.params.team);
                    setTeamData(data);
                    setloading(false)
                } catch (error) {
                    console.log(error);
                }
            };
            const backButton = useBackButton()
const router = useRouter()
            backButton.show()
            backButton.on('click', () =>{
              router.push("/")
            })
// сделать норм тему тут и вывод ответов нормально 
    return (
        
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        {
loading ? <Loading text="Загрузка данных подождите..."/>
:
<>
<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
<div className="relative ml-auto flex-1 md:grow-0">

<h1 className="text-2sxl md:text-5xl font-bold text-link-base   select-none overflow-hidden"> Команда: {teamData?.name}</h1>
</div>
</header>
<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
<table className="w-full border-collapse">
  <thead>
    <tr>
      <th className="px-4 py-2 text-left text-link-base ">Квест</th>
      <th className="px-4 py-2 text-left text-link-base ">Ответы</th>
      <th className="px-4 py-2 text-left text-link-base "><GoCheck /></th>
    </tr>
  </thead>
  <tbody>
          { teamData ?
           teamData.solved.map((solvedItem:any, index:number) => (
                <tr key={`${teamData.id}-${index}`}>
                  <td className="border px-4 py-2 font-medium text-scin-base">{solvedItem}</td>
                  <td className="border px-4 py-2">
                    <div className="flex items-center gap-2">
                      <p className="text-scin-base">{teamData.answers[index]}</p>
                    </div>
                  </td>
                  <td className="border px-4 py-2">
                    <p className="text-scin-base">{teamData.results[index]} балл</p>
                  </td>
                </tr>
              ))
            : <h1>нет</h1>}
    </tbody>
</table>
</main>
</>
        }
      </div>
    )
  }
  
  function SearchIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  }