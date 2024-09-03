'use client'
import Loading from '@/components/Loading'
import Reroute from '@/components/Reroute'
import {createTeam} from '@/server/teamManage'
import { Button, Placemark, YMaps, ZoomControl, Map } from '@pbe/react-yandex-maps'
import { useBackButton, useCloudStorage, withBackButton } from '@tma.js/sdk-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

type Props = {}

const page = (props: Props) => {
  const router = useRouter()
// const cloudStorage = useCloudStorage();
// const backButton = useBackButton()

// backButton.show()
// backButton.on('click', () =>{
//   router.push("/")
// })


  const [team, setteam] = useState("")
  const [error, seterror] = useState("")
  const [teamName, setteamName] = useState(null)
  const [loading, setloading] = useState(false)
  const [reroute, setreroute] = useState(false)
  const handleCreateTeam= async () => {
    setloading(true)
    seterror("")
const response  = await createTeam(team)
if(!response){
seterror(`Ошибка имя  команды уже занято ${response}`)
setloading(false)
return
}
setteamName(response.name)
setloading(false)
localStorage.setItem("team", response.name)
  }
  //todo сделать добавление команды и ее сохранение в telegram cloud человека , а также настроить отдачу квеста
  //! не усложнять логику на бекенде
  return (
    
       <main className="flex flex-col items-center  min-h-screen bg-scin-base px-4 md:px-6">
    {
      loading && <Loading text='Создание'/>
  
    }
    {
      reroute && <Reroute   text="Загрузка  . . ."/>
    }

{
  teamName ?
  <>
  <h1 className="text-4xl md:text-5xl font-bold text-link-base text-center ">Команда {teamName} создана</h1>
<p className="text-4xl md:text-5xl font-bold text-link-base  text-center  bg-scin-base rounded-lg mt-2">
 Локацию  вашего первого задания  вам выдаст организатор
</p>
<div className='flex items-center space-x-2'>
<Link href="/qrscanner"prefetch={true} onClick={()=>{
  setreroute(true)
}} className='bg-button-base text-button-base font-medium px-4 py-2 rounded-md  mt-5'>Я на месте </Link>
</div>
</>
  :
  <div className="max-w-md w-full space-y-6">
  <h1 className="text-4xl md:text-5xl font-bold    text-link-base  text-center  pt-3.5 select-none">Начни велоквест</h1>
  <div className="flex items-center space-x-2 flex-col">
    <input
      className="flex-1  rounded-md px-4 py-2  bg-hint-base text-link-base font-bold  "
      placeholder="Введите название команды"
      type="text"
      value={team}
onChange={(e) => setteam(e.target.value)}
    />
    <button className= " bg-button-base text-button-base font-medium px-4 py-2 rounded-md  mt-4"
     onClick={() => handleCreateTeam()}>
      Начать
    </button>
    <h1 className="text-4xl md:text-5xl font-bold    text-link-base  text-center">{error}</h1>
  </div>
</div>
}
</main>
  )
}

export default page