'use client'
import Loading from '@/components/Loading'
import Reroute from '@/components/Reroute'
import {createTeam} from '@/server/teamManage'
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
seterror(`Ошибка имя  команды уже занято , придумайте другое`)
setloading(false)
return
}
setteamName(response.name)
setloading(false)
localStorage.setItem("team", response.name)
  }

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
  <div className=' mt-36'>
  <h1 className="text-4xl md:text-5xl font-bold text-link-base text-center ">Команда <span className='  font-extrabold text-5xl'>{teamName}</span> создана</h1>
<p className="text-4xl md:text-5xl font-bold text-scin-base  text-center  bg-scin-base rounded-lg mt-2">
 Локацию  вашего первого задания  вам выдаст организатор
</p>
<div className='flex items-center space-x-2'>
<div className="flex justify-center w-full">
  <Link href="/qrscanner" prefetch={true} onClick={() => {
    setreroute(true)
  }} className='bg-button-base text-button-base font-medium text-base  px-6 py-4 rounded-md mt-5'>Я на месте</Link>
</div>
</div>
</div>
  :
  <div className="max-w-md w-full space-y-6">
  <h1 className="text-4xl md:text-5xl font-bold    text-link-base  text-center  pt-3.5 select-none">Начни велоквест</h1>
  <div className="flex items-center space-x-2 flex-col mt-52">
    <input
      className="flex-1  rounded-md  px-4 py-10 text-2xl  text-center mx-6 bg-scin-base text-scin-base font-bold border-base   "
      placeholder="Введите название команды"
      type="text"
      value={team}
onChange={(e) => setteam(e.target.value)}
    />
    <button className= " bg-button-base text-button-base font-medium px-6 py-4 rounded-md  mt-4"
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