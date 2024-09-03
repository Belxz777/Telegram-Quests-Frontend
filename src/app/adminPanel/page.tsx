"use client"
import { useTeamData } from '@/hooks/useTeamData'
import React from 'react'
import Image from 'next/image'
import { deleteTeam } from '@/server/getAllTeamData'
import Link from 'next/link'
import Loading from '@/components/Loading'
import { useBackButton } from '@tma.js/sdk-react'
import { useRouter } from 'next/navigation'
type Props = {}

function AdminPanel({}: Props) {
const {teamData,fetchData,isLoading,isNotFound}  = useTeamData()
const backButton = useBackButton()
const router = useRouter()
backButton.show()
backButton.on('click', () =>{
  router.push("/")
})

  return (
    <main key="1" className="flex min-h-screen  overflow-hidden   min-w-full flex-col bg-scin-base">

    <header className="flex items-center justify-between min-w-full   bg-white px-6 py-4 shadow dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <svg
          className="h-6 w-6 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
          <line x1="3" x2="21" y1="9" y2="9" />
          <line x1="9" x2="9" y1="21" y2="9" />
        </svg>
        <h1 className="text-xl font-bold text-hint-base">Прогресс команд</h1>
      </div>
   
    </header>
    <section className="flex-1 p-6">    
     {
            teamData && !isNotFound  ?
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
   {
    Array.isArray(teamData) ? teamData.map((team:Team, index:number) =>
        <article className="rounded-md border   bg-secodary-base p-4 shadow-sm"
        key={team.id}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className='flex items-center justify-center rounded-md bg-gray-100  dark:bg-gray-800'>
          <h3 className="text-lg font-medium  text-scin-base">Команда: <span className='text-xl font-extrabold'>{team.name}</span> </h3>
          <div className='flex-col'>
          <button className="rounded-md bg-blue-500  ml-7  mt-4 py-4 px-4s text-lg text-white">
          <Link href={`adminPanel/${team.name}`}> ПОДРОБНЕЕ</Link>  
          </button>
          <button className="rounded-md bg-red-500  mt-4  ml-7 mb-5 py-2 px-2 text-xs text-scin-base"
          onClick={()=>{
            deleteTeam(team.id)
            alert("Команда удалена")
            fetchData()
          }}>
          УДАЛИТЬ
            </button>
            <p className="text-sm text-scin-base text-center">Всего выполнено {team.solved.length}</p>
          </div>
      
          
          
        </div>
      </div>
    </div>
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                            {team.imageDataUrl.map((imageUrl:any, index:number) => (
                                                <div key={index} className="relative">
                                                      
                                                  {
                                                    imageUrl &&
                                                    <img src={imageUrl} alt={imageUrl}  
                               
                                                  className="  h-72  w-full rounded-md object-cover" />
                                                  }
                                                      <p className="text-sm text-scin-base text-center">Правильно  выполнено {team.results[index]}</p>
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                                                        {team.solved[index]}
                                                    </div>
                                                </div>
                                            ))}

    </div>
  </article>
    )
    :
    <h1 className='text-3xl font-bold tracking-tight text-link-base text-center mb-4'>Команд не найдено</h1>
   }
    
       

      </div> 
      :
      <h1 className='text-3xl font-bold tracking-tight text-link-base text-center mb-4'>Команд не найдено</h1>
        
        }
    </section>
    {
      isLoading  && isNotFound ? <Loading text="Загрузка данных"/>
      :
      null
      }
  </main>
  )
}

export default AdminPanel