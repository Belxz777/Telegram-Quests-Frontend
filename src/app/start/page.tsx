// 'use client'
// import Loading from '@/components/Loading'
// import Reroute from '@/components/Reroute'
// import {createTeam} from '@/server/teamManage'
// import { useBackButton } from '@tma.js/sdk-react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import React, { useState } from 'react'
// import { AiOutlineArrowLeft } from 'react-icons/ai'
// import { FiSlack } from "react-icons/fi";
// type Props = {}

// const page = (props: Props) => {
//   const router = useRouter()
// // const cloudStorage = useCloudStorage();
// // const backButton = useBackButton()

// // backButton.show()
// // backButton.on('click', () =>{
// //   router.push("/")
// // })


//   const [team, setteam] = useState("")
//   const [error, seterror] = useState("")
//   const [teamName, setteamName] = useState<string | null>(null)
//   const [loading, setloading] = useState(false)
//   const [reroute, setreroute] = useState(false)
//   const [isExpanded, setisExpanded] = useState(false)
//   const handleCreateTeam= async () => {
//     setloading(true)
//     seterror("")
// const response  = await createTeam(team)
// if(!response){
// seterror(`Ошибка имя  команды уже занято , придумайте другое.`)
// setloading(false)
// return
// }
// setteamName(response.name)
// setloading(false)
// localStorage.setItem("team", response.name)
// localStorage.setItem("time",  new Date().getTime().toString())
//   }

//   return (
    
//        <main className="flex flex-col items-center  min-h-screen bg-scin-base px-4 md:px-6">
//         {
//           teamName &&
//           <button 
//           onClick={() => setisExpanded(!isExpanded)} 
//           className="flex items-center ml-auto bg-button-base rounded-lg"
//         >
//           <span className="  text-button-base px-4 py-2 font-medium">Подробнее</span>
//           {isExpanded ? <FiSlack className="h-4 w-4 mr-4    transform rotate-180  hover:animate-spin" /> : <FiSlack className="h-4 w-4 mr-4 bg-button-base hover:animate-spin" />}
//         </button>
//         }
// {
  
//   teamName ? (
//   <div className=' mt-36'>
  

//   <h1 className="text-4xl md:text-5xl font-bold text-link-base text-center ">Команда <span className='  font-extrabold text-5xl'>{teamName}</span> создана.</h1>
//   <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
//         <div className="p-4 bg-secondary rounded-md">
//           <p className="  text-scin-base text-xl text-center">
//           Локацию  вашего первого задания  вам выдаст организатор.
//           </p>
//         </div>
//       </div>
// <div className='flex items-center space-x-2'>
// <div className="flex justify-center w-full">
  
//   <Link href="/qrscanner" prefetch={true} onClick={() => {
//     setreroute(true)
//   }} className='bg-button-base text-button-base font-medium text-xl  px-6 py-4 rounded-md mt-5'>Мы на месте</Link>
// </div>
// </div>
// </div>
//   ) : (
//         loading ? <Loading text='Создание'/> : (
//      <div className="max-w-md w-full space-y-6">   
//       <h1 className="text-4xl md:text-5xl font-bold    text-link-base  text-center  pt-3.5 select-none">Начни велоквест</h1>
//       <div className="flex items-center space-x-2 flex-col mt-52">
//         <input
//           className="flex-1  rounded-md  px-4 py-10 text-2xl   placeholder:text-xl text-center mx-6 bg-scin-base text-scin-base font-bold bg-clip-border border-base  border-dashed border-2   select-none  "
//           placeholder="Введите название команды"
//           type="text"
//           value={team}
//     onChange={(e) => setteam(e.target.value)}
//         />
//         <button className= "bg-button-base text-button-base font-medium text-2xl  px-6 py-4 rounded-md mt-5"
//          onClick={() => handleCreateTeam()}>
//           Начать
//         </button>
//         <h1 className="text-4xl md:text-5xl font-bold    text-link-base  text-center">{error}</h1>
//       </div>
//     </div>
//     )
//   )
// }
// </main>
//   )
// }
// export default page
"use client"

import Loading from "@/components/Loading"
import { createTeam } from "@/server/teamManage"
import { useBackButton } from "@tma.js/sdk-react"
import { useRouter } from "next/navigation"
import type React from "react"

import { useState } from "react"

export default function BikeQuestTeamCreation() {
  const [teamName, setTeamName] = useState("")
  const [loading, setLoading] = useState(false)
  const [isTeamCreated, setIsTeamCreated] = useState(false)
  const [createdTeamName, setCreatedTeamName] = useState("")
  const router = useRouter()
const backButton = useBackButton()

backButton.show()
backButton.on('click', () =>{
  router.push("/")
})



  const [error, seterror] = useState("")
//   const [loading, setloading] = useState(false)
//   const [reroute, setreroute] = useState(false)
//   const [isExpanded, setisExpanded] = useState(false)
//   const handleCreateTeam= async () => {
//     setloading(true)
//     seterror("")
//   }

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value)
  }

  const handleCreateTeam = async(e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (teamName.trim()) {
      // Here you would typically send the team name to your backend
      console.log("Creating team:", teamName)
      const response  = await createTeam(teamName)
if(!response){
  setLoading(false)
  alert(`Извините ,возникла ошибка, возможно имя команды уже занято`)
setTeamName("")
return
}
setLoading(false)
localStorage.setItem("team", response.name)
localStorage.setItem("time",  new Date().getTime().toString())

      // Store the created team name and update state
      setCreatedTeamName(teamName)
      setIsTeamCreated(true)
      setTeamName("")
    }
  }

  const handleImAtLocation = () => {
    // Here you would typically send a location confirmation to your backend
router.push("/qrscanner")
    // Additional logic for when a team arrives at the location
    // For example, you might want to navigate to the first quest
  }

  return (
    <div className="min-h-screen bg-scin-base flex flex-col">

      {/* <header className=" bg-secodary-base text-link-base  p-4 shadow-md">
        <h1 className="text-xl font-bold text-center">Велоквест</h1>
      </header> */}
{
  loading && !error ?
  <Loading text="Создание команды..." />
:
      <main className="flex-1 container mx-auto max-w-md p-4">
        {!isTeamCreated ? (
          <section className="bg-scin-base rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-center text-scin-base">Создание команды</h2>

            <form onSubmit={handleCreateTeam}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="teamName" className="block text-sm font-medium">
                    Название команды
                  </label>
                  <input
                    id="teamName"
                    type="text"
                    value={teamName}
                    onChange={handleTeamNameChange}
                    placeholder="Введите название команды"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4  bg-button-base text-white font-medium rounded-md transition-colors"
                  disabled={!teamName.trim()}
                >
                  Создать команду
                </button>
              </div>
            </form>
          </section>
        ) : (
          <section className=" bg-scin-base rounded-lg shadow-md p-6">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Команда создана!</h2>
                <p className=" text-hint-base">
                  Ваша команда <span className="font-semibold">"{createdTeamName}"</span> успешно зарегистрирована.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-hint-base ">Когда вы прибудете на место старта, нажмите кнопку ниже:</p>
                <button
                  onClick={handleImAtLocation}
                  className="w-full py-4 px-4 bg-green-500 hover:bg-green-600 text-button-base font-bold rounded-md transition-colors text-lg"
                >
                  Мы на месте
                </button>
              </div>

              <p className="text-sm text-hint-base mt-8">Отсканируйте qr-code на локации для получения задания</p>
            </div>
          </section>
        )}
      </main>
}
    </div>
  )
}

