 "use client"
 import React, { useEffect, useState } from 'react'
 import { Button, Placemark, YMaps, ZoomControl, Map } from '@pbe/react-yandex-maps'
import Link from 'next/link'
import { useCloudStorage } from '@tma.js/sdk-react'
import { getNextLocation, getTeamLocations } from '@/server/getAllQuests'
 type Props = {}
 
 const Periodic = (props: Props) => {
    const cloudStorage = useCloudStorage()
    const [nextData, setnextData] = useState<any>(null)
    useEffect(()=>{
    const setCurrentQuiz = async () =>{
const name = localStorage.getItem("team") || ''
   const response =  await getTeamLocations(name)
    setnextData(response)  
    }
    setCurrentQuiz()
    },[])
//todo сделать админ панель и добавить задания еще также в принципе еще раз пересмотреть логику
// ! ЗДЕСЬ БУДЕТ КАРТА С ТОЧКАМИ КОТОРЫЕ ЕЩЕ НЕ ПОСЕТИЛА КОМАНДА
   return (
    <>
    {/* <h1 className="text-4xl md:text-5xl font-bold text-link-base text-center">Команда {} создана</h1> */}
  <p className="text-4xl md:text-5xl font-bold text-link-base  text-center">
    Ваше следующее  задание находится:
  </p>
  <div className="mt-12 w-full max-w-4xl aspect-square  bg-scin-base rounded-2xl overflow-hidden" >
  <YMaps key={'c04094f5-7ea3-4e2d-9305-f0be2330dfd6'} >
  {
        nextData ?
  <Map defaultState={{ center: [nextData.lat,nextData.lon] , zoom: 18} }  width={window.outerWidth}  height={window.outerHeight} >
    <>
    {
 nextData.map((item:any,index:number)=>
  <>
    <Placemark geometry={[item.lat,item.lon]}  properties={{
      iconCaption:`${item.name}`,
}}
options={{
  preset: "islands#circleDotIcon",
  cursor:"pointer",
}
}
key={index}
/>  
</>
  )
} 
        {/* <Placemark geometry={[nextData.lat,nextData.lon]}  properties={{
            iconCaption:`
          Ваш следующий квест  здесь`,
            iconColor:"green"
      }}
      options={{
        preset: "islands#circleDotIcon",
        cursor:"pointer",
      
      }
      }
      />   */}
  
  </>
  <ZoomControl options={{
  }} />
  <Button
        options={{ maxWidth: 128 }}
        data={{ content: "Расширить " }}
        defaultState={{ selected: true }}
  
      />
  </Map>
  : 
  <Map defaultState={{ center: [56.8496, 53.2052] , zoom: 11} }  width={window.outerWidth}  height={window.outerHeight} >
    <>
        <Placemark geometry={[22,12]} 
         properties={
          {
            iconColor: `green`,
            iconCaption: `Вы находитесь здесь`
            }}
      options={{
        preset: "islands#circleDotIcon",
        cursor:"pointer",
      
      }
      }

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
 }
  </YMaps>
  </div>
  <div className='flex items-center space-x-2'>
  <Link href="/qrscanner" className='bg-button-base text-button-base font-medium px-4 py-2 rounded-md text-center '>Я на месте </Link>
  </div>
  </>
   )
 }
 export default Periodic