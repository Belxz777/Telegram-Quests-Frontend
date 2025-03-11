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
    <div className=" h-screen">
    <header className="bg-scin-base shadow-sm p-4 top-0 w-full z-10  mb-10">
        <nav className="max-w-screen-sm mx-auto flex justify-between gap-4">
          <Link
            href="/qrscanner"
            onClick={() => {
              if (team) {
                setreroute(true)
                setTimeout(() => {
                  router.push("/qrscanner")
                }, 1000)
              }
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4  bg-button-base text-hint-base rounded-xl font-medium transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            <span>QR сканер</span>
          </Link>

          <Link
            href={team ? "/period" : "/start"}
            onClick={() => {
              if (team) {
                setreroute(true)
        
                  setTimeout(() => {
                    router.push("/period")
                  }, 1000)
              }
                else {
                  setreroute(true)
                  setTimeout(() => {
                    router.push("/start")
                  }, 1000)
                }
                
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-button-base text-hint-base rounded-xl font-medium transition-colors"
          >
            {team ? (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
                <span>Продолжить</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <span>Начать</span>
              </>
            )}
          </Link>
        </nav>
      </header>

      <main className='flex w-screen h-3/5 justify-center items-center flex-col mt-2  '>
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
            setreroute(true)
            setTimeout(() => {
              router.push("/adminPanel")
            }, 1000)
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