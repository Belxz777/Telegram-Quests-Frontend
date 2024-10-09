'use client'
import { useEffect,useRef,useState,useMemo, Suspense } from 'react'
import pint from '../../public/landing.png'
import { AiFillHeart, AiOutlineAlignRight, AiOutlineCompress, AiOutlineIssuesClose } from "react-icons/ai";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useInitData,  useMiniApp,useViewport} from '@tma.js/sdk-react';
import { ClosingBehavior, postEvent } from '@tma.js/sdk';
import Link from 'next/link';
import Reroute from '@/components/Reroute';
import { GoArrowUpRight } from 'react-icons/go';
import { getTeamDataByName } from '@/server/getAllTeamData';
import { Team } from './types/Main';
import Landing from '@/components/Landing';
import React from 'react';
import ErrorPage from '@/components/errorMessage/error';

export default function General() {
const initData = useInitData()
const [isTeam, setisTeam] = useState(false)
const [team, setteam] = useState<Team | null>(null)
const [isLoading , setIsLoading] = useState(true)
  const closingBehaviour = new ClosingBehavior(false, postEvent);
  closingBehaviour.enableConfirmation()
  const miniApp = useMiniApp();
  const viewport = useViewport();     
  const [reroute, setreroute] = useState(false)
  const router = useRouter()
  const [landing, setlanding] = useState(true)
  const [error, seterror] = useState(false)
  const initDataJson = useMemo(() => {
    if (!initData) {
      return 'Init data is empty.'; 
    }   

    // const { teamData, fetchData,isError } = useTeamDataByName(teamName)
    // if (isError) {
    //   setisTeam(false)
    //   return
    // }
    // else{
    //   setteam(teamData)
    //   setisTeam(true)
    // }
    const { authDate, chat, hash, canSendAfter, queryId, receiver, user, startParam } = initData
    return JSON.stringify({
      authDate,
      chat,
      hash,
      canSendAfter,
      queryId,
      receiver,
      user,
      startParam,
    }, null, ' ');
  }, [initData]);

  useEffect(() => {
    viewport.expand()
    miniApp.ready()

    const teamName = localStorage.getItem("team")
    if (!teamName) {
      setisTeam(false)
      setlanding(false)
      setIsLoading(false)
          return
    }
    fetchData(teamName)
  }, [])
  const fetchData = async (name:string) => {
    try {
        const data = await getTeamDataByName(name);

        if (data === null) {
            setteam(null);
            setlanding(false)
        } else if ('statusCode' in data) {
            setisTeam(false);
            setlanding(false)
        } else {
            setteam(data);
            setisTeam(true);
            setlanding(false)
        }
    } catch (error) {
      seterror(true)
      setlanding(false)
        console.log(error);
    }
};
  return (
<Suspense fallback={<Reroute text='Загрузка'/>}  >
{
  landing ?
  <>
  {
    error ?
<ErrorPage linkText='Ошибка' linkHref='/' errorMessage='Ошибка при подключении к серверу' />
    :
    
  <Landing  status='Загрузка . . .' />
}
  </>
  :
  <>
  {
      reroute && <Reroute text="Переход  . . ."/>
    }
    <div className="overflow-hidden h-screen">
      <header className="bg-scin-base text-scin-base shadow  h-1/5  max-h-min">
        <div className='flex justify-around '>
           <Link href={"/qrscanner"} prefetch={false} onClick={()=>{
          setreroute(true)
        }}  className='text-scin-base hover:text-link-base px-4 rounded-f text-auto  font-extrabold w-1/3  mt-4
bg-clip-border border-base  border-dashed border-2  rounded-xl h-1/2 select-none' >          <AiOutlineCompress />
           QRcode сканер</Link>
  
          {
            team?.name ?
            <Link href={"/period"} prefetch={true} onClick={()=>{
              setreroute(true)
            }}  className='text-scin-base select-none hover:text-link-base py-2 px-4 text-wrap text-auto w-2/3 font-extrabold mt-4 bg-clip-border border-base border-dashed border-2 rounded-xl h-1/2 flex items-center justify-center
             max-w-full mr-2'>   
     <GoArrowUpRight className="mr-2" /> <span className="whitespace-nowrap overflow-hidden text-ellipsis">Продолжить</span>
             </Link>

:
<Link href={"/start"} prefetch={true} onClick={()=>{
  setreroute(true)

}}   className='text-scin-base hover:text-link-base px-4 rounded-f text-auto  font-extrabold w-1/3  mt-4
bg-clip-border border-base  border-dashed border-2  rounded-xl h-1/2 select-none'>   
 <AiOutlineIssuesClose />  Начать  
 </Link>

          }      

        </div>

      </header>
      <main className='flex w-screen h-4/5 justify-center items-center flex-col mt-2  '>
      {team?.name  && <> <h1 className='text-2xl font-bold tracking-tight text-link-base text-center mb-1 mt-2'>Ваша команда: {team?.name}</h1>
          <h2  className='text-2xl font-bold tracking-tight text-link-base text-center mb-2'>
            {(() => {
              const startTime = localStorage.getItem("time")
              if (startTime) {
                const elapsedTime = new Date().getTime() - parseInt(startTime)
                const seconds = Math.floor(elapsedTime / 1000)
                const minutes = Math.floor(seconds / 60)
                const hours = Math.floor(minutes / 60)
                return `Прошло времени: ${hours}ч ${minutes % 60}м ${seconds % 60}с`
              }
              else{
                localStorage.setItem("time",  new Date().getTime().toString())
                return "Время  не установлено"
              }
            })()}
          </h2>
      </>}
        <Image src={pint} alt=''  
        
        onDoubleClick={()=>{
          let isAdmin = prompt("Введите пароль администратора")
          if(isAdmin == "ivan"){
            router.push("/adminPanel")
          }
        }} className=' bg-button-base rounded-full mx-8     size-96   select-none '  loading='lazy' />{/*width={width} height={height}*/}
        <h1 className='text-center text-xl text-scin-base font-extrabold select-none'>Заводские Игры: Квестбот по городу на велосипедах</h1>
      </main>
    </div>
  </>
}
    </Suspense>
  )
}