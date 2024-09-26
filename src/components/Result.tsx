

import { addImage} from '@/server/teamManage';
import { useCloudStorage } from '@tma.js/sdk-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Image from 'next/image';
import Loading from './Loading';
import { Akatab } from 'next/font/google';
import Reroute from './Reroute';
import Confetti from './Confetti';
type Props = {
    quizData: any;
    useAnswers: any;
    todo:any,
    answers:string[]
}

const Result = (props: Props) => {
  // в резалте изменить ui что бы фотка загруженная не выглядела так ущербно , приплюснуто
  const [correct, setcorrect] = useState<any>(null)
  const [isReroute, setisReroute] = useState(false)
    const calculateScore = () => {
        const correctAnswers = props.useAnswers.filter((answer: { isCorrect: any; }) => answer.isCorrect).length;
        setcorrect(correctAnswers +1)
        if(correctAnswers == props.quizData.length - 1 ){
          return `Ты ответил правильно на ${correctAnswers+1} из  ${props.quizData.length} !
          Молодцы!!!`
        }
        else{
          return ` Ты ответил правильно на ${correctAnswers+1} из  ${props.quizData.length} !        
         В следующий раз точно получится!!! `
        }
      
      };
    const [photoUrl, setphotoUrl] = useState<File | null>(null)
    const [isAddedPhoto,addPhoto] = useState(false)
  const [loading, setloading] = useState(false)
      const sendPhoto = async() =>{
       let teamName = localStorage.getItem("team") ||""
        setloading(true)
  if(!props.quizData[0].quizIn || !teamName || !photoUrl){
    alert(`${props.quizData[0].quizIn} ${teamName} ${photoUrl}`)
    setloading(false)
    return  
  } 
  if(!correct){
    alert(correct)
    alert("Не удалось определить количество правильных ответов")
    setloading(false)
    return
  }
 const response =  await addImage(teamName,photoUrl,props.quizData[0].quizIn,correct,props.answers )
 //!ДОБИТЬ ЛОГИКУ 
if(!response){
  setloading(false)
  addPhoto(false)
  alert(response)
return 
}
setloading(false)
addPhoto(true)
      }
      useEffect(() => {
        const correctAnswers = props.useAnswers.filter((answer: { isCorrect: any; }) => answer.isCorrect).length;
        setcorrect(correctAnswers +1)
      }, [])
  return (
       <main className="flex flex-col items-center justify-center h-[100dvh]  bg-scin-base  px-4 md:px-6">
      {
        isReroute && <Reroute text='Переход'/>
      }
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
{
  loading &&
  <Loading text='Отправка' />
}
{
  isAddedPhoto ?
  <>
  <h1 className='text-3xl font-bold tracking-tight text-link-base text-center'>Задание успешно выполено ! {isAddedPhoto}  </h1>
  <p className=' text-link-base text-center font-extrabold items-center text-4xl '>Правильных ответов: {correct} </p>
  <Link
          className="block text-center w-full   mt-5 px-2 py-4   bg-hint-base rounded-lg  text-scin-base"
          href="/period"
          onClick={()=>{
            setisReroute(true)

          }}
        >
          Перейти к следующему квесту
        </Link>
       <Confetti />
  </>
  :
  <>
  <div>
    {
    props.todo?.question ?
    <>  
    <h1  className="text-xl font-bold tracking-tight text-link-base text-center ">Последнее задание:</h1>
      <h2 className="text-2xl font-extrabold tracking-tight text-link-base text-center ">{props.todo.question} </h2>
      {/* <h2 className="text-2xl font-bold tracking-tight text-link-base text-center ">{props.quizData[0].quizId}</h2> */}
      </>
      :
      null
    } 
  <p className="text-gray-600 dark:text-gray-400">

  </p>
</div>
  <div>
  
    <div className="mt-1 flex justify-center px-6 pt-2 pb-2 border-2 border-gray-300 border-dashed rounded-md flex-col w-full   h-[500px]">
      {
        !photoUrl  ?
        <p className=" text-link-base">

        <label  className="cursor-pointer underline ml-1" htmlFor="file">
          Выберите файл
        </label>
      </p>
      :
      <div className="flex justify-center  h-screen overflow-hidden ">
                          <Image src={photoUrl ? URL.createObjectURL(photoUrl) : ''} alt='' className='rounded-lg w-auto   h-auto' width="0" height={"0"} />
                        </div>
                    }


                    <input className="hidden" id="file" type="file" onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        setphotoUrl(files[0]);
                      }
                    }} />
    </div>
  </div>
  <button className=" w-full text-center  px-2 py-2 bg-button-base rounded-lg  text-button-base "  onClick={()=> sendPhoto()}>
    Отправить
  </button>
  </>
}
          
        </div>
      </div>
    </main>
  )
}
export default Result