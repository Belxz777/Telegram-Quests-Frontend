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

export default function General() {


  const initData = useInitData()
const [isTeam, setisTeam] = useState(false)
  const closingBehaviour = new ClosingBehavior(false, postEvent);
  closingBehaviour.enableConfirmation()
  const miniApp = useMiniApp();
  const viewport = useViewport();
  // const viewport = initViewport();     
  const [reroute, setreroute] = useState(false)
  const [teamName, setteamName] = useState<string | null>(null)
  const initDataJson = useMemo(() => {
    if (!initData) {
      return 'Init data is empty.'; 
    }   

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
    setteamName( localStorage.getItem("team")?.valueOf() || null)
    if(teamName){
setisTeam(true)
    }
  }, [])

  return (
<Suspense fallback={<Reroute/>}  >
{
      reroute && <Reroute />
    }

    <div className="overflow-hidden">
      <header>
        <div className='flex  justify-between '>

        <Link href={"/adminPanel"} prefetch={false} onClick={()=>{
          setreroute(true)
      
        }} className='bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl w-1/3' >          <AiOutlineCompress />
          Админка</Link>
           <Link href={"/qrscanner"} prefetch={false} onClick={()=>{
          setreroute(true)
      
        }}  className='bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl w-1/3' >          <AiOutlineCompress />
           QRcode сканер</Link>
          {
            isTeam &&
          <>
        <Link href={"/period"} prefetch={true} onClick={()=>{
          setreroute(true)
      
        }}  className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl  w-1/3">   
         <AiOutlineIssuesClose />   Продолжить 
         </Link>
         </>
          }      
            <button className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4  rounded-full text-xl  w-1/3">
          <AiFillHeart/>
         <Link href={"/map"} prefetch={false}
         onClick={()=>{
          setreroute(true)
      
        }} 
         >  Помощь  </Link>
        </button>
        </div>

      </header>
      <main className='flex w-screen h-screen justify-center items-center flex-col'>
        <Image src={pint} alt='' className=' bg-button-base rounded-full  mb-16  select-none '  loading='lazy'/>
        {teamName && <h1 className='text-3xl font-bold tracking-tight text-link-base text-center'>Ваша команда: {teamName}</h1>}
      </main>
    </div>
    </Suspense>
  )
}
