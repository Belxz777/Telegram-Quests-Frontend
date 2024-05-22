'use client';
import React,  {useEffect, useState}  from "react";
import {QrReader} from "react-qr-reader";
import { useRouter } from "next/navigation";
import Link from "next/link";
import{ motion} from 'framer-motion'
import { AiOutlineAim, AiOutlineArrowLeft } from "react-icons/ai";
import { useBackButton } from "@tma.js/sdk-react";
export default function Scaner() {
  type ScanResult = {
    text: string;
  }  
  const [data, setData] = useState<boolean>();
  const [mdata, setmData] = useState<number[]>([]);
  const router = useRouter()
  const backButton = useBackButton()

backButton.show()
backButton.on('click', () =>{
  router.push("/")
})

  const RequestFunc= async(result:string)=>{
    const coordinatesArray  =  await result.split(',').map(coord => parseFloat(coord));
    if(coordinatesArray.length!==2){
      setData(false)
   }
   else{
    setmData(coordinatesArray)
    await router.push(`/quest/${coordinatesArray[0]}/${coordinatesArray[1]}`)
   }
  }
  return (
    <div className=" bg-scin-base h-screen w-screen ">
      <div className=" rounded-xl  border-4 border-base mt-5 w-screen ">
        <QrReader
      containerStyle={
      {
 width: "100%" 
      }
      }
          onResult={(result: any , error: any) => {
            if (result) {
              setData(result?.text)
           RequestFunc(result?.text)
            }
            if (error) {
         console.log(error)
            }
          } } constraints={{ facingMode: "environment" } }   className=" rounded-xl  w-full"     />
          {
            data ? 
            <h2 className=" text-link-base text-black   text-2xl hover:text-emerald-100 text-center ">Код отсканирован</h2>
            :
            null
          }

      </div>

      <h1 className=' text-center font-extrabold text-scin-base text-xl  '>
  Включено автоопределение кода , просто наведите камеру 
</h1>
    </div>
  );
  }