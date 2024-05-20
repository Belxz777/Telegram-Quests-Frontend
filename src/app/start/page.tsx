'use client'
import createTeam from '@/server/teamManage'
import { Button, Placemark, YMaps, ZoomControl, Map } from '@pbe/react-yandex-maps'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

type Props = {}

const page = (props: Props) => {
  const [team, setteam] = useState("")
  const [error, seterror] = useState("")
  const [teamName, setteamName] = useState(null)
  const handleCreateTeam= async () => {
const response  = await createTeam(team)
setteamName(response.name)
  }
  return (
    <div>
        <label>Введите ответ</label>
<motion.input
className='bg-button-base  text-button-base font-bold py-2 px-4 rounded-full text-xl'
value={team}
onChange={(e) => setteam(e.target.value)}
/>
<motion.button
whileTap={{ scale: 0.97 }}
 onClick={() => handleCreateTeam()}
className=' bg-button-base  text-button-base font-bold py-2 px-4  rounded-full text-xl '
>
создать 
</motion.button>
{
  teamName ?
  <>
  <h1>Команда {teamName} создана</h1>
<p>
  Ваш первый квест находится 
</p>
<YMaps key={'c04094f5-7ea3-4e2d-9305-f0be2330dfd6'} >
<Map defaultState={{ center: [432,32323] , zoom: 18} }  width={200}  height={300} >

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
</>
  :
  null
}

    </div>
  )
}

export default page