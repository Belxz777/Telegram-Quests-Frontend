'use client'
import { useEffect,useRef,useState,useMemo, Suspense } from 'react'
import pint from '../../public/pins.png'
import { AiFillHeart, AiOutlineAlignRight, AiOutlineCompress, AiOutlineIssuesClose } from "react-icons/ai";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCloudStorage } from '@tma.js/sdk-react';
import { useInitData,  useMiniApp,useViewport} from '@tma.js/sdk-react';
import { ClosingBehavior, postEvent } from '@tma.js/sdk';
import Link from 'next/link';
import Reroute from '@/components/Reroute';
import { GoArrowUpRight } from 'react-icons/go';
import { getTeamDataByName } from '@/server/getAllTeamData';

export default function General() {


  const initData = useInitData()
const [isTeam, setisTeam] = useState(false)
const [team, setteam] = useState<Team | null>(null)
const [isLoading , setIsLoading] = useState(true)
  const closingBehaviour = new ClosingBehavior(false, postEvent);
  closingBehaviour.enableConfirmation()
  const miniApp = useMiniApp();
  const viewport = useViewport();
  // const viewport = initViewport();     
  const [reroute, setreroute] = useState(false)
  const router = useRouter()
  const [teamName, setteamName] = useState<string | null>(null)
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
      setIsLoading(false)
      throw new Error('No team found');
      return
    }
    fetchData(teamName)
  }, [])
  const fetchData = async (name:string) => {
    try {
        const data = await getTeamDataByName(name);

        if (data === null) {
          setIsLoading(false)
            setteam(null);
            throw new Error('No team found');
        } else if ('statusCode' in data) {
          setIsLoading(false)
            setisTeam(false);
         throw new Error('No team found');
        } else {
          setIsLoading(false)
            setteam(data);
            setisTeam(true);
        }
    } catch (error) {
        console.log(error);
    }
};
  return (
<Suspense fallback={<Reroute text='Загрузка'/>}  >
{
      reroute && <Reroute text="Переход  . . ."/>
    }
    {
      isLoading && <Reroute  text="Загрузка  . . ."/>
    }

    <div className="overflow-hidden h-screen">
      <header className="bg-scin-base text-scin-base shadow  h-1/5">
        <div className='flex justify-around '>

       
           <Link href={"/qrscanner"} prefetch={false} onClick={()=>{
          setreroute(true)
      
        }}  className='bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl w-1/3' >          <AiOutlineCompress />
           QRcode сканер</Link>
  
          {
            team?.name ?
            <Link href={"/period"} prefetch={true} onClick={()=>{
              setreroute(true)
            }}  className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-4  px-4 rounded-full text-xl  ">   
     <GoArrowUpRight /> Продолжить 
             </Link>
:
<Link href={"/start"} prefetch={true} onClick={()=>{
  setreroute(true)

}}  className=" bg-button-base hover:bg-hint-base text-button-base font-bold  px-4 rounded-full text-xl  mb-2 ">   
 <AiOutlineIssuesClose />  Начать  
 </Link>

          }      

        </div>

      </header>
      <main className='flex w-screen h-4/5 justify-center items-center flex-col'>
      {team?.name  && <> <h1 className='text-3xl font-bold tracking-tight text-link-base text-center mb-4'>Ваша команда: {team?.name}</h1>
      <h2 className='text-2xl font-bold tracking-tight text-link-base text-center mb-4'>Решено : {team?.solved?.length || 0} квеста</h2>
      </>}
  
        <Image src={pint} alt=''  
        onDoubleClick={()=>{
          
        router.push("/adminPanel")
        }} className=' bg-button-base rounded-full    select-none '  loading='lazy'/>
          <button className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4  rounded-full text-xl  w-1/3">
          <AiFillHeart/>
         <Link href={"/map"} prefetch={false}
         onClick={()=>{
          setreroute(true)
      
        }} 
         >  Помощь  </Link>
        </button>
      </main>
    </div>
    </Suspense>
  )
}
