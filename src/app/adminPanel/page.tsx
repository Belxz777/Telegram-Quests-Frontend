"use client"
import { useTeamData } from '@/hooks/useTeamData'
import React from 'react'
import Image from 'next/image'
type Props = {}

function AdminPanel({}: Props) {
const {teamData,fetchData}  = useTeamData()
  return (
    <main key="1" className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950">
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow dark:bg-gray-900">
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
        <h1 className="text-xl font-bold text-white">Прогресс команд</h1>
      </div>
      <div className="flex items-center gap-4">
        <input
          className="max-w-md rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
          placeholder="Поиск команд..."
          type="search"
        />
      </div>
    </header>
    <section className="flex-1 p-6">    
     {
            teamData ?
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
   {
    Array.isArray(teamData) ? teamData.map((team:Teams, index:number) =>
        <article className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        key={team.id}>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div>
          <h3 className="text-lg font-medium  text-white">{team.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Всего выполнено {team.solved.length}</p>
        </div>
      </div>
    </div>
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                            {team.imageDataUrl.map((imageUrl, index) => (
                                                <div key={index} className="relative">
                                                      
                                                  {
                                                    imageUrl &&
                                                    <img src={imageUrl} alt={imageUrl}   
                                                  className="h-32  w-full rounded-md object-cover" />
                                                  }
                                                      <p className="text-sm text-gray-500 dark:text-gray-400  text-center">Правильно  выполнено {team.results[index]}</p>
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                                                        {team.solved[index]}
                                                    </div>
                                                </div>
                                            ))}

    </div>
    {/* <div className="mt-4 flex justify-end">
      <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800">
        Посмотреть детали
      </button>
    </div> */}
  </article>
    )
    :
    <h1>Один</h1>
   }
    
       

      </div> 
      :
        <h1>Ничего</h1>
        }
    </section>
  </main>
  )
}

export default AdminPanel