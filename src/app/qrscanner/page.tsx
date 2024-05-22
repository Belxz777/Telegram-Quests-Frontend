'use client';
import React,  {useEffect, useState}  from "react";
import {QrReader} from "react-qr-reader";
import { useRouter } from "next/navigation";
export default function Scaner() {
  type ScanResult = {
    text: string;
  }  
  
  const [data, setData] = useState<boolean | null>(null);
  const router = useRouter();
  const [isResultChecked, setIsResultChecked] = useState(false);

  async function getData(result: string) {
    const coordinatesArray = result.split(',').map(coord => parseFloat(coord));
    if (coordinatesArray.length !== 2 || isNaN(coordinatesArray[0]) || isNaN(coordinatesArray[1])) {
      setData(false);
      return;
    } else {
      setData(true);
      router.push(`/quest/${coordinatesArray[0]}/${coordinatesArray[1]}`);
    }
  }

  function checkFunc(result: ScanResult | null) {
    if (result && !isResultChecked) {
      setIsResultChecked(true); // Ensure this only triggers once
      getData(result.text);
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
            checkFunc(result);
            if (error) {
              console.log(error);
            }
          } } constraints={{ facingMode: "environment" } }   className=" rounded-xl  w-full"     />
        {
          data === true ? 
            <h2 className="text-link-base text-black text-2xl hover:text-emerald-100 text-center">Код отсканирован</h2>
          :
          data === false ? 
            <h2 className="text-red-500 text-center">Ошибка сканирования</h2>
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