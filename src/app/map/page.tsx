'use client'
import React,{useState,useEffect,useRef} from 'react'
import { YMaps, Map,Placemark,Panorama, Clusterer, Button,GeolocationControl,ZoomControl} from '@pbe/react-yandex-maps/'
import plamarkPng from '../../../public/PlaceMark.png'
import { useRouter } from 'next/navigation'
import { AiOutlineArrowLeft } from 'react-icons/ai'
type Props = {}

export default async function Karta ({}: Props) {
    const placeRef= useRef()
    type augedInfo =  {
    ip:number,
    lat:number,
    lon: number,
    }
    type QuizData =[ {
      id:number,
      question:string,
      answer:string,
      variants:string[],
      location: string,
      hardness:string,
      lat:number,
      lon: number,
      author:string,
      quizIn: string, 
      categorie:string
    }]
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
      
      const [ip, setip]= useState('')
    
      const [augedInfo, setaugedInfo] = useState<augedInfo>({
        ip:0,
        lat:56.856825,
        lon:53.198824,
      })
      const router = useRouter()
    const height = window.innerHeight - 100
    const width = window.innerWidth
   // const  coordinaets = [{longtail:56.856825,sovtail:53.198824,title:'Квест в падике'},{longtail:56.862081,sovtail:53.218237,title:'Квест на парусах'},]
      useEffect( () => {
        //https://api-bdc.net/data/ip-geolocation-full?key=bdc_a3fd490909df46c3b6e259e86e2425e3
        //http://api.ipstack.com/check?access_key=2160ab9b543cbefda685b40e8350ffc4&%20language%20=%20ru
    //https://ipapi.co/json/
(async () => {
try {
const responseIp = await fetch('https://api.ipify.org?format=json')
const ipData = await responseIp.json();
const ipAddress = ipData.ip;
setip(ipAddress);
/*setTimeout(async()=>{
let response = await axios.get(`http://ip-api.com/json/${ip}/`)
setaugedInfo(response.data)
console.log(response.data)
console.log(response)
},2000)*/
const responseQuiz = await fetch(`${process.env.BACKEND_URL}Quests/`)
const quizData = await responseQuiz.json();
setQuizData(quizData);
}
catch (e) {
console.error(e)
}
})();


    },[])
    
  return (
    <main className='  '>
                    <button className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl flex" onClick={()=> router.push(`/`)}>
<AiOutlineArrowLeft  />
Обратно на главную
</button>
    <div className='  w-full '>
{
  quizData[0].id == 0 ? 
        <YMaps key={'c04094f5-7ea3-4e2d-9305-f0be2330dfd6'} >
<Map defaultState={{ center: [56.849605, 53.205283] , zoom: 18} }  width={width}  height={height} >
<Button
      options={{ maxWidth: 190 }}
      data={{ content: "К сожаление бекенд не работает " }}
      defaultState={{ selected: false }}
>

</Button>
</Map>
</YMaps>
  :
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