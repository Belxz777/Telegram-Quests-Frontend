'use client'
import Loading from '@/components/Loading'
import Reroute from '@/components/Reroute'
import {createTeam} from '@/server/teamManage'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { FiSlack } from "react-icons/fi";
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
  const [teamName, setteamName] = useState<string | null>(null)
  const [loading, setloading] = useState(false)
  const [reroute, setreroute] = useState(false)
  const [isExpanded, setisExpanded] = useState(false)
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
localStorage.setItem("time",  new Date().getTime().toString())
  }

  return (
    
       <main className="flex flex-col items-center  min-h-screen bg-scin-base px-4 md:px-6">
    {
      reroute && <Reroute   text="Загрузка  . . ."/>
    }
{
  
  teamName ? (
  <div className=' mt-36'>
  
  <button 
          onClick={() => setisExpanded(!isExpanded)} 
          className="flex items-center ml-auto bg-button-base rounded-lg"
        >
          <span className="mr-1  text-button-base px-4 py-2 font-medium">Подробнее</span>
          {isExpanded ? <FiSlack className="h-4 w-4 mr-4   transform rotate-180  hover:animate-spin" /> : <FiSlack className="h-4 w-4 mr-4 bg-button-base hover:animate-spin" />}
        </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-4 bg-secondary rounded-md">
          <p className="  text-scin-base text-xl text-center">
          Локацию  вашего первого задания  вам выдаст организатор.
          </p>
        </div>
      </div>
  <h1 className="text-4xl md:text-5xl font-bold text-link-base text-center ">Команда <span className='  font-extrabold text-5xl'>{teamName}</span> создана.</h1>
<div className='flex items-center space-x-2'>
<div className="flex justify-center w-full">
  <Link href="/qrscanner" prefetch={true} onClick={() => {
    setreroute(true)
  }} className='bg-button-base text-button-base font-medium text-xl  px-6 py-4 rounded-md mt-5'>Мы на месте</Link>
</div>
</div>
</div>
  ) : (
        loading ? <Loading text='Создание'/> : (
     <div className="max-w-md w-full space-y-6">   
      <h1 className="text-4xl md:text-5xl font-bold    text-link-base  text-center  pt-3.5 select-none">Начни велоквест</h1>
      <div className="flex items-center space-x-2 flex-col mt-52">
        <input
          className="flex-1  rounded-md  px-4 py-10 text-2xl   placeholder:text-xl text-center mx-6 bg-scin-base text-scin-base font-bold border-base   "
          placeholder="Введите название команды"
          type="text"
          value={team}
    onChange={(e) => setteam(e.target.value)}
        />
        <button className= "bg-button-base text-button-base font-medium text-xl  px-6 py-4 rounded-md mt-5"
         onClick={() => handleCreateTeam()}>
          Начать
        </button>
        <h1 className="text-4xl md:text-5xl font-bold    text-link-base  text-center">{error}</h1>
      </div>
    </div>
    )
  )
}
</main>
  )
}
export default page