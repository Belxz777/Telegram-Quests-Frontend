"use client"
import { useTeamData } from '@/hooks/useTeamData'
import React from 'react'
import { deleteTeam } from '@/server/getAllTeamData'
import Link from 'next/link'
import Loading from '@/components/Loading'
import { CgAdd } from "react-icons/cg"
import { CgAttachment } from "react-icons/cg";

import { useBackButton } from '@tma.js/sdk-react'
import { useRouter } from 'next/navigation'
import { Team } from '../types/Main'
type Props = {}

function AdminPanel({}: Props) {
  const backButton = useBackButton()
const router = useRouter()
const {teamData,fetchData,isLoading,isNotFound,isAdmin}  = useTeamData()

backButton.show()
backButton.on('click', () =>{
  router.push("/")
})

  return (
<main key="1" className="flex min-h-screen  overflow-hidden   min-w-full flex-col bg-scin-base">

<header className="flex items-center justify-between min-w-full    bg-scin-base px-6 py-4 shadow ">
  <div className="flex items-center gap-4">
    <h1 className="text-xl font-bold text-link-base">Прогресс команд</h1>
    <Link href={"/createQuests"} prefetch={false} onClick={()=>{
  }}    className="flex-1 flex items-center justify-center gap-2 py-3 px-4  bg-button-base text-hint-base rounded-xl font-medium transition-colors" >
    <span>Создать</span>
    </Link>
    <Link href={" /location"} prefetch={false} onClick={()=>{
  }}    className="flex-1 flex items-center justify-center gap-2 py-3 px-4  bg-button-base text-hint-base rounded-xl font-medium transition-colors" >
    <span>Карта</span>
    </Link>
  </div>
</header>

<section className="flex-1 p-6">
  {/* Отображение команды, если данные загружены */}
  {isLoading ? (
    <Loading text="Загрузка данных" />
  ) : Array.isArray(teamData) && teamData.length > 0 ? (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {teamData.map((team: Team, index: number) => (
        <article
          className="rounded-md border   bg-secodary-base p-4 shadow-sm"
          key={team.id}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-md bg-scin-base">
                <h3 className="text-lg font-medium  text-scin-base">
                  Команда:{" "}
                  <span className="text-xl font-extrabold">{team.name}</span>
                </h3>
                <div className="flex-col">
                  <button className="rounded-md bg-blue-500  ml-7  mt-4 py-4 px-4s text-lg text-white">
                    <Link href={`adminPanel/${team.name}`}>ПОДРОБНЕЕ</Link>
                  </button>
                  <button
                    className="rounded-md bg-red-500  mt-4  ml-7 mb-5 py-2 px-2 text-xs text-scin-base"
                    onClick={() => {
                     let isDel =  confirm("Вы уверены что хотите удалить команду?")
                     if(isDel) {
                      deleteTeam(team.id);
                      alert("Команда удалена");
                      fetchData();
                     }
  

                    }}
                  >
                    УДАЛИТЬ
                  </button>
                  <p className="text-sm text-scin-base text-center">
                    Всего выполнено {team.solved.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {team.imageDataUrl.map((imageUrl: any, index: number) => (
              <div key={index} className="relative">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={imageUrl}
                    className="h-72 w-full rounded-md object-cover"
                  />
                )}
                <p className="text-sm text-scin-base text-center">
                  Правильно выполнено {team.results[index]}
                </p>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                  {team.solved[index]}
                </div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  ) : (
    // Сообщение о том, что команд нет, когда загрузка завершена
    <h1 className="text-3xl font-bold tracking-tight text-link-base text-center mb-4">
      Команд не найдено
    </h1>
  )}
</section>
</main>
  )
}
export default AdminPanel