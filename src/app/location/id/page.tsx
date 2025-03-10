"use client"
import React,{useEffect, useState} from 'react'
import {Variants} from 'framer-motion'
import { useRouter } from 'next/navigation'
import { getAllQuestsByLatLon, getLocationByLatLon } from '@/server/getAllQuests'
import Question from '@/components/Question'
import { useBackButton } from '@tma.js/sdk-react'
import Loading from '@/components/Loading'
import { QuizData } from '@/app/types/Main'
interface Props  {
    params:{id:number}
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
    todo:false
    }])
//http://localhost:4000/Quests/46.147.176.2
const backButton = useBackButton()
const router = useRouter()
backButton.show()
backButton.on('click', () =>{
  router.back()
})
const [loading, setloading] = useState(false)



useEffect(() => {
const fetchData = async () => {
setloading(true)
try {
const data = await getAllQuestsByLatLon(params.id)
setQuizData(data);
}

catch (e) {
console.error(e)
}
setloading(false)
}
alert(quizData[0].answer)
fetchData()
alert(quizData[0].answer)
}, [])
return (
<>
{quizData && !loading ? (
  <Question quizData={quizData}  />
) : (
  loading ? (
    <Loading text="Загрузка данных подождите..." />
  ) : (
    <h1 className='text-3xl'>Ошибка </h1>
  )
)}
</>
);
}

export default Quest