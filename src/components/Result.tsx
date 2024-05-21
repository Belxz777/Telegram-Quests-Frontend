import { addImage } from '@/server/teamManage';
import { useCloudStorage } from '@tma.js/sdk-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Image from 'next/image';
import Loading from './Loading';
type Props = {
    quizData: any;
    useAnswers: any;
    todo:any
}

const Result = (props: Props) => {
  
const cloudStorage = useCloudStorage();
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
    const [photoUrl, setphotoUrl] = useState("")
    const [isAddedPhoto,addPhoto] = useState(false)
    const [id, setId] = useState("")
    useEffect(()=>{
      const fetchData = async () => {
        
        let current = props.quizData[0].quizId + 1
        cloudStorage.set("currentQuiz",current)
  
    //  const foundTodoItem = props.quizData.find((item: any) => item.todo === true);
    //   setTodoItem(foundTodoItem);
        const team  = await cloudStorage.get("teamId").then((teamId) =>
          setId(teamId)
      )
    }
    fetchData()
  },[])
  const [loading, setloading] = useState(false)
      const sendPhoto = async() =>{
        setloading(true)
  if(!props.quizData[0].quizIn || !id || !photoUrl){
    alert(`${props.quizData[0].quizIn} ${id} ${photoUrl}`)
    setloading(false)
    return
  } 
 const response =  await addImage(Number(id), photoUrl,props.quizData.quizIn)
if(!response){
  setloading(false)
return 
}

setloading(false)
addPhoto(true)
      }
    const router= useRouter()
  return (
       <main className="flex flex-col items-center justify-center h-[100dvh]  bg-scin-base  px-4 md:px-6">
                    <button className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl flex  float-right" onClick={()=> router.push(`/`)}>
<AiOutlineArrowLeft  />
Обратно на главную
</button>
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
{
  loading &&
  <Loading text='Отправка' />
}
{
  isAddedPhoto ?
  <>
  <h1 className='text-3xl font-bold tracking-tight text-link-base text-center'>Фото успешно отправлено {isAddedPhoto}  </h1>
  <h2  className=' text-link-base text-center font-bold items-center text-2xl'>Результат квиза</h2>
  <p className=' text-link-base text-center font-extrabold items-center text-2xl '>{calculateScore()}</p>
  <Link
          className="block text-center w-full   px-2 py-2   bg-hint-base rounded-lg  text-scin-base"
          href="/period"
        >
          Перейти к следующему квесту
        </Link>
  </>
  :
  <>
  <div>
    {
    props.todo.question &&
    <>  
    <h1  className="text-3xl font-bold tracking-tight text-link-base text-center ">Последнее задание</h1>
      <h2 className="text-2xl font-bold tracking-tight text-link-base text-center ">{props.todo.question} </h2>
      <h2 className="text-2xl font-bold tracking-tight text-link-base text-center ">{props.quizData[0].quizId}</h2>
      </>
    } 
  <p className="text-gray-600 dark:text-gray-400">

  </p>
</div>
  <div>
  
    <div className="mt-1 flex justify-center px-6 pt-2 pb-2 border-2 border-gray-300 border-dashed rounded-md flex-col w-full h-36">
      {
        !photoUrl  ?
        <p className=" text-link-base">

        <label  className="cursor-pointer underline ml-1" htmlFor="file">
          Выберите файл
        </label>
      </p>
      :
      <div className="flex justify-center  h-full overflow-hidden ">
      <Image src={photoUrl ?? photoUrl} alt='' className='rounded-lg w-2/4  h-full' width="0" height="0" />
    </div>
      }

          <input className="hidden" id="file" type="file" onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              setphotoUrl(URL.createObjectURL(files[0]) );
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