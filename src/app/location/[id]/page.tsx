"use client"
import React,{useEffect, useState} from 'react'
import {Variants} from 'framer-motion'
import { useRouter } from 'next/navigation'
import Quiz from '@/components/Quiz'
import { useBackButton } from '@tma.js/sdk-react'
import Loading from '@/components/Loading'
import { quiztype } from '@/app/types/Main'
import ErrorPage from '@/components/errorMessage/error'
import { locationQuests } from '@/server/special/questsfromloc'
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
const [quizData, setQuizData] = useState<quiztype[] | quiztype>({} as quiztype)
//http://localhost:4000/Quests/46.147.176.2
const backButton = useBackButton()
const router = useRouter()
backButton.show()
backButton.on('click', () =>{
  router.back()
})
const [loading, setloading] = useState(true)
const [isEmpty, setIsEmpty] = useState(true)


useEffect(() => {
const fetchData = async () => {
setloading(true)
if(!params.id) return
const data = await locationQuests(params.id)

if(!data) return
if (Array.isArray(data) && data.length > 0) {
  setloading(false)
  setIsEmpty(false)
  setQuizData(data)
  return
}
else{
  setloading(false)
  setIsEmpty(true)
}
}
fetchData()
}, [])
return (
<>
{
  loading ? <Loading text={''}/> :
  !isEmpty ? <Quiz quizData={quizData}/> : <ErrorPage linkHref='' linkText='Перезагрузить ' errorMessage={`Произошла ошибка при загрузке информации о заданиях. Попробуйте еще раз или обратитеaсь к организатору. | Пусто:${isEmpty} `} />
}
</>
);
}
export default Quest