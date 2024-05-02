import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

type Props = {
    quizData: any;
    useAnswers: any;
}

const Result = (props: Props) => {
    const calculateScore = () => {
        const correctAnswers = props.useAnswers.filter((answer: { isCorrect: any; }) => answer.isCorrect).length;
        if(correctAnswers == props.quizData.length - 1 ){
          return `Ты ответил правильно на ${correctAnswers} из  ${props.quizData.length} !
          Молодец!!!`
        }
        else{
          return ` Ты ответил правильно на ${correctAnswers} из  ${props.quizData.length} !        
         В следующий раз точно получится!!! `
        }
      
      };
    const router= useRouter()
  return (
    <div>
    <h1  className=' text-link-base text-center font-extrabold items-center text-2xl'>Результат квиза</h1>
            <p className=' text-link-base text-center font-extrabold items-center text-2xl '>{calculateScore()}</p>
            <button className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl flex" onClick={()=> router.push(`/`)}>
<AiOutlineArrowLeft  />
Обратно на главную
</button>
          </div>
  )
}
export default Result