import { motion, Variants } from 'framer-motion'
import React, { useState } from 'react'
import Result from './Result';

type Props = {
    quizData:QuizData
}
const variants = {
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
}
const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };
const  Question = (props: Props) => {
const [isOpen, setIsOpen] = useState(false);
const [currentQuestion, setCurrentQuestion] = useState<number>(0);
const [userAnswers, setUserAnswers] = useState<{ question: string; answer: string; isCorrect: boolean }[]>([]);
const [showResult, setShowResult] = useState<boolean>(false);
const [rebus, setrebus] = useState('')
const [todo, settodo] = useState<any>(null)
const handleAnswerClick = (selectedVariant: string) => {
const isCorrect = selectedVariant === props.quizData[currentQuestion].answer;
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
<Result quizData={props.quizData} useAnswers={userAnswers} todo={todo} />
:
<div >
  {
props.quizData ?
  <motion.nav
initial={false}
animate={isOpen ? "open" : "closed"}
className="w-full flex justify-center items-center  flex-col"
>
<p className=' text-link-base  text-right font-extrabold items-center text-2xl  flex-col'>{props.quizData[currentQuestion]!.quizIn }</p>
{
props.quizData[currentQuestion].rebus ?
<div className='flex justify-center items-center flex-col'>
{props.quizData[currentQuestion].question ?
<p className=' text-link-base  text-right font-extrabold items-center text-xl  flex-col'>{props.quizData[currentQuestion].question} </p>
:
<p className=' text-link-base  text-right font-extrabold items-center text-xl  flex-col'>Ребус</p>}
<img src={props.quizData[currentQuestion].image} alt="" />
<label>Введите ответ</label>  
<motion.input
className='bg-button-base  text-button-base font-bold py-2 px-4 rounded-full text-xl'
value={rebus}
onChange={(e) => setrebus((e.target.value).toLowerCase())}
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
<motion.button
whileTap={{ scale: 0.97 }}
onClick={() => setIsOpen(!isOpen)}
className=' bg-button-base  text-button-base font-bold py-2 px-4 rounded-full text-xl '
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
{props.quizData[currentQuestion].variants.map((variant, index) => (
<motion.li variants={itemVariants} key={index} onClick={() => handleAnswerClick(variant)} className=' bg-hint-base  text-button-base font-bold py-2 px-14 rounded-full text-xl '>{index + 1}: {variant}</motion.li>
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