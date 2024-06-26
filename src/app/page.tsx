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

export default function General() {


  const cloudStorage = useCloudStorage();
  const initData = useInitData()
const [isTeam, setisTeam] = useState(false)
  const closingBehaviour = new ClosingBehavior(false, postEvent);
  closingBehaviour.enableConfirmation()
  const miniApp = useMiniApp();
  const viewport = useViewport();
  // const viewport = initViewport();     
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
<Suspense fallback={<div>Loading...</div>}  >
    <div className="overflow-hidden">
      <header>
        <div className='flex  justify-between '>

        <Link href={"/adminPanel"} prefetch={false}  className='bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl w-1/3' >          <AiOutlineCompress />
          Админка</Link>
           <Link href={"/qrscanner"} prefetch={false}  className='bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl w-1/3' >          <AiOutlineCompress />
           QRcode сканер</Link>
          {
            !isTeam ?
            <>
                 
{teamName && <h1 className='text-3xl font-bold tracking-tight text-link-base text-center'>{teamName}</h1>}
            <Link href={"/start"} prefetch={true}  className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl w-1/3">              <AiOutlineIssuesClose />  Начать </Link>
           </>
          :
          <>
        <Link href={"/period"} prefetch={true} className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl  w-1/3">   
         <AiOutlineIssuesClose />   Продолжить 
         </Link>
         </>
          }      
            <button className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4  rounded-full text-xl  w-1/3">
          <AiFillHeart/>
         <Link href={"/map"} prefetch={false}>  Помощь  </Link>
        </button>
        </div>

      </header>
      <main className='flex w-screen h-screen justify-center items-center flex-col'>
        <Image src={pint} alt='' className=' bg-button-base rounded-full mb-28   select-none '  loading='lazy'/>
      </main>
    </div>
    </Suspense>
  )
}
