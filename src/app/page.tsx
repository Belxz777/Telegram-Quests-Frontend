'use client'
import { useEffect,useRef,useState,useMemo } from 'react'
import pint from '../../public/pins.png'
import { AiOutlineAlignRight, AiOutlineCompress, AiOutlineIssuesClose } from "react-icons/ai";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useInitData,  useMiniApp} from '@tma.js/sdk-react';
import { ClosingBehavior, postEvent } from '@tma.js/sdk';

export default function General() {
  const initData = useInitData()
  const closingBehaviour = new ClosingBehavior(false, postEvent);
  closingBehaviour.enableConfirmation()
const miniApp = useMiniApp();
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
useEffect(()=>{
  miniApp.ready()
},[])
const router = useRouter()

  return (
    <>
<header>
<div className='flex  justify-between '>
<button className='bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl' onClick={()=> router.push(`/qrscanner`)}>
  <AiOutlineCompress/>
  QRcode сканер
</button>
<button className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl" onClick={()=> router.push(`/start`)}>
  <AiOutlineIssuesClose/>
Начать
</button>
<button className=' bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl ' onClick={()=> router.push(`/map`) }> 
  <AiOutlineAlignRight/>
Карта
</button>
</div>
</header>
<main className='flex w-screen h-screen justify-center items-center flex-col'>
<Image src={pint} alt=''  className=' bg-button-base rounded-full  '/>
<h1 className=' text-center font-extrabold text-scin-base text-xl  '>
  С помощью этого приложения вы сможете находить и решать квесты в городе Ижевске
</h1>
<button className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl" onClick={()=> router.push(`/help`)}>
  <AiOutlineIssuesClose/>
  Помощь
</button>
</main>
</>
  )
}
