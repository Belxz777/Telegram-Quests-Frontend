import { motion, Variants } from 'framer-motion'
import React, { useState } from 'react'
import Result from './Result';
import Image from 'next/image';
import { QuizData } from '@/app/types/Main';
type Props = {
    quizData:QuizData
}
const variants = {
    open: {
        clipPath: "inset(0% 0% 0% 0% round 10px)",
        transition: {
          type: "spring",
          bounce: 0,
          duration: 0.4,
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
}
const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };
  // TODO разобраться сделась проверить как работает с ребусом вообщем 
const  Question = (props: Props) => {
  const [answers, setAnswers] = useState<string[]>([]);
const [isOpen, setIsOpen] = useState(false);
const [currentQuestion, setCurrentQuestion] = useState<number>(0);
const [userAnswers, setUserAnswers] = useState<{ question: string; answer: string; isCorrect: boolean }[]>([]);
const [showResult, setShowResult] = useState<boolean>(false);
const [rebus, setrebus] = useState('')
const [todo, settodo] = useState<any>(null)
const handleAnswerClick = (selectedVariant: string) => { 
  if (answers.includes(selectedVariant)) {
    return;
  }
  setAnswers([...answers, selectedVariant]);
  // if(props.quizData[currentQuestion].rebus){
  //   setrebus(selectedVariant)
  // }
  // if(props.quizData[currentQuestion].todo){
  //   settodo(selectedVariant)
  // }
let isCorrect = selectedVariant === props.quizData[currentQuestion].answer;
if(props.quizData[currentQuestion].answer=="" ){
  isCorrect = true
}
setUserAnswers([...userAnswers, { question: props.quizData[currentQuestion].question, answer: selectedVariant, isCorrect }]);
if (currentQuestion < props.quizData.length - 1) {
setCurrentQuestion(currentQuestion + 1);
setrebus("")  
} else {
setShowResult(true);
}
};
return (
<div>
{showResult ?
<Result quizData={props.quizData} useAnswers={userAnswers} todo={todo} answers={answers} />
:
<div >
  {
props.quizData ?
  <motion.nav
initial={false}
animate={isOpen ? "open" : "closed"}
className="w-full flex justify-center items-center  flex-col"
>
<p className=' text-link-base    font-extrabold items-center text-xl  flex-col'> <span className='text-2xl'>Квест: </span>{props.quizData[currentQuestion]!.quizIn }</p>
{
props.quizData[currentQuestion].rebus ?
<div className='flex justify-center items-center flex-col mt-6'>
{props.quizData[currentQuestion].question ?
<p className=' text-link-base   text-center font-extrabold  text-3xl  flex-col mt-6 select-none'>{props.quizData[currentQuestion].question} </p>
:
<p className=' text-link-base  text-right font-extrabold items-center text-xl  flex-col'>Ребус</p>}
<img src={props.quizData[currentQuestion].image} alt=""    className='  select-none'/>
<motion.input
placeholder='Введите ответ'
className='bg-button-base  text-button-base font-bold py-2 px-4 rounded-full text-xl  mt-5 placeholder-white'
                        value={rebus}
                        minLength={3}
                        required
onChange={(e) => {
setrebus((e.target.value).toLowerCase())
}}
/>
<motion.button
whileTap={{ scale: 0.97 }}
onClick={() => handleAnswerClick(rebus)}
className=' bg-button-base  text-button-base font-bold py-2 px-4  rounded-full text-xl  mt-4'
>
Отправить
</motion.button>
</div>
:
<>
{
  setCurrentQuestion(currentQuestion + 1)
}
<motion.button
whileTap={{ scale: 0.97 }}
onClick={() => setIsOpen(!isOpen)}
className=' bg-button-base  text-button-base font-bold py-2 px-4 rounded-full text-2xl '
>
{props.quizData[currentQuestion].question} 
</motion.button>
{props.quizData[currentQuestion].todo ? <motion.button className=' bg-button-base  text-button-base font-bold py-2 px-4  rounded-full text-xl  mt-4'
 onClick={()=>{
  if (currentQuestion < props.quizData.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
    } else {
    setShowResult(true);
    }
    settodo(props.quizData[currentQuestion])
}
}>Следующее
</motion.button>
:
<motion.ul
variants={
variants
}
style={{ pointerEvents: isOpen ? "auto" : "none" }}
>
{props.quizData[currentQuestion].variants.map((variant:any, index:number) => (
<motion.li variants={itemVariants} key={index} onClick={() => handleAnswerClick(variant)} className=' cursor-pointer bg-hint-base  text-button-base font-bold py-5 mt-3 px-20 rounded-full text-xl '>{index + 1}: {variant}</motion.li>
))}
</motion.ul>
}

</>
}

</motion.nav>
:
null
}
</div>
}
</div>

)
}
export default Question