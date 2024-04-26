'use client'
import React,{useState,useEffect,useRef} from 'react'
import { YMaps, Map,Placemark,Panorama, Clusterer, Button,GeolocationControl,ZoomControl} from '@pbe/react-yandex-maps/'
import plamarkPng from '../../../public/PlaceMark.png'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { getIp } from '@/server/getIP'
import { getAllQuests } from '@/server/getAllQuests'
type Props = {}

export default  function Karta ({}: Props) {
  useEffect( () => {
    const fetchData = async () => {
      try{
    const allQues = await getAllQuests()
    setQuizData(allQues)
      }
      
      catch  (e) {
       console.error(e)
      }
    }
    fetchData()
        },[])
      const [quizData,setQuizData] = useState<QuizData>([{
        "id":0,
        "question":"",
        "answer":"",
        "variants":["", "","",""],
        "location": "",
        "hardness":"",
        "lat":0,
        "lon": 0,
        "author":"",
        "quizIn": "",
        "categorie":""
      }])
      
      const [augedInfo, setaugedInfo] = useState<augedInfo>({
        ip:0,
        lat:56.856825,
        lon:53.198824,
      })
      const router = useRouter()
    const height = window.innerHeight - 100
    const width = window.innerWidth
   // const  coordinaets = [{longtail:56.856825,sovtail:53.198824,title:'Квест в падике'},{longtail:56.862081,sovtail:53.218237,title:'Квест на парусах'},]
    
  return (
    <main className='  '>
                    <button className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl flex" onClick={()=> router.push(`/`)}>
<AiOutlineArrowLeft  />
Обратно на главную
</button>
    <div className='  w-full '>
{
        <YMaps key={'c04094f5-7ea3-4e2d-9305-f0be2330dfd6'} >
<Map defaultState={{ center: [augedInfo.lat, augedInfo.lon] , zoom: 18} }  width={width}  height={height} >
{
  quizData.map((item,index)=>
  <>
    <Placemark geometry={[item.lat,item.lon]}  properties={{
      iconCaption:`${item.quizIn}`,
}}
options={{
  preset: "islands#circleDotIcon",
  cursor:"pointer",

}
}
key={index}
onClick={()=> router.push(`/quest/${item.lat}/${item.lon}`)}
/>  
</>
  )
} 
<Placemark defaultGeometry={ [augedInfo.lat, augedInfo.lon]}
  options={{
    iconColor:'green',
    balloonContent:'Это примерное вычисление'
  }}
         properties={
  {
    iconImageHref: {plamarkPng},
    iconColor: `green`,
    iconCaption: `Вы находитесь здесь`
    }}
/>
<ZoomControl options={{
}} />
<Button
      options={{ maxWidth: 128 }}
      data={{ content: "Расширить " }}
      defaultState={{ selected: true }}

    />
</Map>
</YMaps>
}
</div>
</main>
  )
}