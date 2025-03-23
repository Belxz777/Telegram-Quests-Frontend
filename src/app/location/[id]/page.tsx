"use client"
import React,{useEffect, useState} from 'react'
import {Variants} from 'framer-motion'
import { useRouter } from 'next/navigation'
import { getAllQuestsByLatLon, getLocationByLatLon } from '@/server/getAllQuests'
import Quiz from '@/components/Quiz'
import { useBackButton } from '@tma.js/sdk-react'
import Loading from '@/components/Loading'
import { quiztype } from '@/app/types/Main'
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
const [quizData, setQuizData] = useState<quiztype[] | quiztype | null>(null)
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
if(!params.id) return
alert(params.id)
const data = await getAllQuestsByLatLon(params.id)

if(!data) return

setQuizData(data);
setloading(false)
}
fetchData()
}, [])
return (
<>
{quizData && !loading ? (
  <Quiz quizData={quizData}  />
) : (
  loading ? (
    <Loading text="Загрузка данных подождите..." />
  ) : (
    <h1 className='text-3xl'>Ошибка при загрузке</h1>
  )
)}
</>
);
}

export default Quest