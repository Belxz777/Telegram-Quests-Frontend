'use client'
import { useEffect,useRef,useState,useMemo } from 'react'
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
  const initDataJson = useMemo(() => {
    if (!initData) {
      return 'Init data is empty.'; 
    }
    let teamName = localStorage.getItem("team") || null
    if(teamName){
setisTeam(true)
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
  }, [])

  return (
    <div className="overflow-hidden">
      <header>
        <div className='flex  justify-between '>
          <button className='bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl w-1/3' >
            <AiOutlineCompress />
           <Link href={"/qrscanner"} prefetch={false}  className='bg-button-base hover:bg-hint-base text-button-base font-bold  rounded-full text-xl' >  QRcode сканер</Link>
          </button>
          {
            !isTeam ?
                      <button className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl w-1/3" >
            <AiOutlineIssuesClose />
            <Link href={"/start"} prefetch={true}>    Начать </Link>
          </button>
          :
          <button className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl  w-1/3" >
          <AiOutlineIssuesClose />
          <Link href={"/period"} prefetch={true}>   Продолжить </Link>
        </button>
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
  )
}
