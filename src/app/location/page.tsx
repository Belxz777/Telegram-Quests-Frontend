'use client'
import React,{useState,useEffect,useRef} from 'react'
import { YMaps, Map,Placemark,Panorama, Clusterer, Button,GeolocationControl,ZoomControl} from '@pbe/react-yandex-maps/'
import { useRouter } from 'next/navigation'
import { getAllQuests } from '@/server/getAllQuests'
import { useBackButton } from '@tma.js/sdk-react'
import Reroute from '@/components/Reroute'
import { augedInfo, QuizData} from '../types/Main'
type Props = {}

  function Karta ({}: Props) {
  const [quizData,setQuizData] = useState<QuizData>([{
    id:0,
    question:"",
    answer:"",
    variants:["", "","",""],
    location: {
        id:0,
        lat: 0,
        lon: 0,
        name: '',
        description: ''
      },
    image:"",
    rebus:false,
    todo:false,
  }])
  
  const [extendedInfo, setextendedInfo] = useState<  augedInfo>({
    ip:0,
    lat:56.856825,
    lon:53.198824,
  })
  const router = useRouter()
  const backButton = useBackButton()

backButton.show()
backButton.on('click', () =>{
  router.push("/")
})

const height = window.innerHeight - 100
const width = window.innerWidth
const [reroute, setreroute] = useState(false)
  useEffect( () => {
/**
* Fetches all quest data and updates the quizData state.
* 
* This function is responsible for retrieving all the quest data from the backend and updating the quizData state with the fetched data. If there is an error during the fetch, it will throw an error.
*/
const fetchData = async () => {
const allQues = await getAllQuests();
if (allQues.length > 0) {
setQuizData(allQues);
} else {
throw new Error('No quests found');
}
}
    fetchData()
        },[])
   // const  coordinaets = [{longtail:56.856825,sovtail:53.198824,title:'Квест в падике'},{longtail:56.862081,sovtail:53.218237,title:'Квест на парусах'},]
    
  return (
    <div className='  w-full  overflow-hidden '>
      {
           
            reroute && <Reroute  text='Загрузка . . .' />
          
      
      }
    {
  quizData[0].id == 0 ? 
        <YMaps key={'c04094f5-7ea3-4e2d-9305-f0be2330dfd6'} >
<Map defaultState={{ center: [56.84921, 53.24421] , zoom: 18} }  width={width}  height={height} >
<Button
      options={{ maxWidth: 190 }}
      data={{ content: "Загрузка . . . " }}
      defaultState={{ selected: false }}
>

</Button>
</Map>
</YMaps>
  :
        <YMaps key={'c04094f5-7ea3-4e2d-9305-f0be2330dfd6'} >
<Map defaultState={{ center: [56.84921, 53.24421] , zoom: 18} }  width={width}  height={height} >
{
  quizData.map((item,index)=>
  <>
    <Placemark geometry={[item.location.lat,item.location.lon]}  properties={{
      iconCaption:`${item.location.name}`,
}}
options={{
  preset: "islands#circleDotIcon",
  cursor:"pointer",

}
}
key={index}
onClick={ () =>{
  setreroute(true)
 router.push(`/location/${item.location.id}`)}}
/>  
</>
  )
} 
<Placemark defaultGeometry={ [extendedInfo.lat, extendedInfo.lon]}
  options={{
    iconColor:'green',
    balloonContent:'Это примерное вычисление'
  }}
         properties={
  {
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
  )
}
export default Karta