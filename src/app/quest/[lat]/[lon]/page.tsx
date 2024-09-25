"use client"
import React,{useEffect, useState} from 'react'
import {motion,Variants} from 'framer-motion'
import { useRouter } from 'next/navigation'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { getAllQuestsByLatLon } from '@/server/getAllQuests'
import Result from '@/components/Result'
import Question from '@/components/Question'
import Back from '@/components/Back'
import { useBackButton } from '@tma.js/sdk-react'
import Loading from '@/components/Loading'
import { QuizData } from '@/app/types/Main'
interface Props  {
    params:{lat:number,lon:number}
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

function Quest({ params }: Props) {
const [quizData, setQuizData] = useState<QuizData>([{
"id": 0,
"question": "",
"answer": "",
"variants": ["", "", "", ""],
"lat": 0,
"lon": 0,
"quizIn": "",
"quizId":0,
"image":"",
"rebus":false,
"todo":false,
    }])
//http://localhost:4000/Quests/46.147.176.2
const backButton = useBackButton()
const router = useRouter()
backButton.show()
backButton.on('click', () =>{
  router.push("/")
})
const [loading, setloading] = useState(false)



useEffect(() => {
const fetchData = async () => {
setloading(true)
try {
const data = await getAllQuestsByLatLon(params.lat, params.lon)
setQuizData(data);
}

catch (e) {
console.error(e)
}
setloading(false)
}
fetchData()
}, [])
return (
  
<>
{
  loading && <Loading text='Загрузка'/>
}
{
quizData[0] &&
<Question quizData={quizData}  />
}
</>
);
}

export default Quest