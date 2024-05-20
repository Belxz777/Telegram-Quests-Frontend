'use client'
import {createTeam} from '@/server/teamManage'
import { Button, Placemark, YMaps, ZoomControl, Map } from '@pbe/react-yandex-maps'
import { useCloudStorage } from '@tma.js/sdk-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {}

const page = (props: Props) => {
  
const cloudStorage = useCloudStorage();
  const [team, setteam] = useState("")
  const [error, seterror] = useState("")
  const [teamName, setteamName] = useState(null)
  const handleCreateTeam= async () => {
const response  = await createTeam(team)

if(!response){
  throw new Error("")
}
setteamName(response.name)
cloudStorage.set("teamId", response.id).then(() => alert(`Команда ${team} создана!`));
  }
  //todo сделать добавление команды и ее сохранение в telegram cloud человека , а также настроить отдачу квеста
  //! не усложнять логику на бекенде
  return (
       <main className="flex flex-col items-center justify-center  min-h-screen bg-scin-base px-4 md:px-6">
    <div className="max-w-md w-full space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold    text-link-base  text-center">Начни игру</h1>
      <div className="flex items-center space-x-2 flex-col">
        <input
          className="flex-1 bg-white/10 border-2 border-white/20 rounded-md px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
          placeholder="Введите название команды"
          type="text"
          value={team}
onChange={(e) => setteam(e.target.value)}
        />
        <button className= " bg-button-base text-button-base font-medium px-4 py-2 rounded-md  mt-4"
         onClick={() => handleCreateTeam()}>
          Начать
        </button>
      </div>
    </div>
{
  teamName ?
  <>
  <h1 className="text-4xl md:text-5xl font-bold text-link-base text-center">Команда {teamName} создана</h1>
<p className="text-4xl md:text-5xl font-bold text-link-base  text-center">
  Ваше первое задание находится:
</p>
<div className="mt-12 w-full max-w-4xl aspect-square  bg-scin-base rounded-2xl overflow-hidden" >
<YMaps key={'c04094f5-7ea3-4e2d-9305-f0be2330dfd6'} >
<Map defaultState={{ center: [432,32323] , zoom: 18} }  width={window.outerWidth}  height={window.outerHeight} >
  <>
    <Placemark geometry={[]}  properties={{
      iconCaption:`ds`,
}}
options={{
  preset: "islands#circleDotIcon",
  cursor:"pointer",

}
}
//onClick={()=> router.push(`/quest/${item.lat}/${item.lon}`)}
/>  
</>
<ZoomControl options={{
}} />
<Button
      options={{ maxWidth: 128 }}
      data={{ content: "Расширить " }}
      defaultState={{ selected: true }}

    />
</Map>
</YMaps>
</div>
<div className='flex items-center space-x-2'>
<Link href="/qrscanner" className='bg-button-base text-button-base font-medium px-4 py-2 rounded-md '>Я на месте </Link>
</div>
</>
  :
  null
}
</main>
  )
}

export default page