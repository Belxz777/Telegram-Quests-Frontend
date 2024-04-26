"use client"
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Link from 'next/link'
import {motion,Variants} from 'framer-motion'
import { useRouter } from 'next/navigation'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { getAllQuestsByLatLon } from '@/server/getAllQuests'
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
function Quest({params}:Props) {
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
    //http://localhost:4000/Quests/46.147.176.2
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const data  = await getAllQuestsByLatLon(params.lat,params.lon)
                setQuizData(data);
            }
            
            catch  (e) {
             console.error(e)
            }
          }
          fetchData()
    },[])
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
const [userAnswers, setUserAnswers] = useState<{ question: string; answer: string; isCorrect: boolean }[]>([]);
const [showResult, setShowResult] = useState<boolean>(false);

const handleAnswerClick = (selectedVariant: string) => {
  const isCorrect = selectedVariant === quizData[currentQuestion].answer;
  setUserAnswers([...userAnswers, { question: quizData[currentQuestion].question, answer: selectedVariant, isCorrect }]);
  if (currentQuestion < quizData.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
  } else {
    setShowResult(true);
  }
};

const calculateScore = () => {
  const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length;
  if(correctAnswers == quizData.length - 1 ){
    return `Ты ответил правильно на ${correctAnswers} из  ${quizData.length} !
    Молодец!!!`
  }
  else{
    return ` Ты ответил правильно на ${correctAnswers} из  ${quizData.length} !        
   В следующий раз точно получится!!! `
  }

};
const router= useRouter()
const [isOpen, setIsOpen] = useState(false);
if(quizData){
    return (
      <>
      {
        quizData[0]  ?
      <div>
        {showResult ? 
          <div>
    <h1  className=' text-link-base text-center font-extrabold items-center text-2xl'>Результат квиза</h1>
            <p className=' text-link-base text-center font-extrabold items-center text-2xl '>{calculateScore()}</p>
            <button className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl flex" onClick={()=> router.push(`/`)}>
<AiOutlineArrowLeft  />
Обратно на главную
</button>
          </div>
          : 
          <div >
                <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="w-full flex justify-center items-center  flex-col"
    >
       <p className=' text-link-base text-center font-extrabold items-center text-2xl  flex-col'>Название Квиза: {quizData[currentQuestion].quizIn}</p>
       <p className=' text-link-base text-center font-extrabold items-center text-2xl flex-c '>Автор: {quizData[currentQuestion].author}</p>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className=' bg-button-base  text-button-base font-bold py-2 px-4 rounded-full text-xl '
      >
{quizData[currentQuestion].question}
      </motion.button>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            }
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
            {quizData[currentQuestion].variants.map((variant, index) => (
              <>
                <motion.li variants={itemVariants} key={index} onClick={() => handleAnswerClick(variant)}className=' bg-hint-base  text-button-base font-bold py-2 px-14 rounded-full text-xl '>{index +1}: {variant}</motion.li>
              </>
             ))}
               <p className=' text-link-base  text-left font-extrabold items-center text-xl '>Сложность вопроса: {quizData[currentQuestion].hardness}</p>
               <p className=' text-link-base text-left font-extrabold  text-xl '>Категория вопроса: {quizData[currentQuestion].categorie}</p>
      </motion.ul>
    </motion.nav>
          </div>
}
      </div>
      :
      <div>
      <p className=' text-link-base text-center font-extrabold items-center text-2xl '>К сожалению произошла непредвиденная ошибка</p>
      <button className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl flex" onClick={()=> router.push(`/`)}>
<AiOutlineArrowLeft  />
Обратно на главную
</button>
    </div>
}
      </>
    );
  }
  else{
    return 'error'
  }
}

export default Quest