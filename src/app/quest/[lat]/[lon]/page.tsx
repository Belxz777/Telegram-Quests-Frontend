"use client"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Link from 'next/link'
import {motion,Variants} from 'framer-motion'
import { useRouter } from 'next/navigation'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { getAllQuestsByLatLon } from '@/server/getAllQuests'
import Result from '@/components/Result'
import Question from '@/components/Question'
import Back from '@/components/Back'
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
/**
* Renders the Quest component, which fetches and displays quiz data based on the provided latitude and longitude parameters.
*
* @param {Object} params - The parameters object containing the latitude and longitude values.
* @param {string} params.lat - The latitude value.
* @param {string} params.lon - The longitude value.
* @returns {JSX.Element} - The rendered Quest component.
*/
function Quest({ params }: Props) {
const [quizData, setQuizData] = useState<QuizData>([{
"id": 0,
"question": "",
"answer": "",
"variants": ["", "", "", ""],
"location": "",
"hardness": "",
"lat": 0,
"lon": 0,
"author": "",
"quizIn": "",
"categorie": "",
"image":"",
"rebus":false
    }])
//http://localhost:4000/Quests/46.147.176.2
useEffect(() => {
const fetchData = async () => {
try {
const data = await getAllQuestsByLatLon(params.lat, params.lon)
setQuizData(data);
}

catch (e) {
console.error(e)
}
}
fetchData()
}, [])
return (
<>
{
quizData[0] ?
<>
{
quizData.map((quest, index) =>
!quest.rebus ?
<Question quizData={quizData} />
:
null

      )
}
</>

:
<Back />
}
</>
);
}

export default Quest