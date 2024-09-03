'use client';
import React,  {useCallback, useEffect, useRef, useState}  from "react";
import {QrReader} from "react-qr-reader";
import { useRouter } from "next/navigation";
import usePrevious from "@/server/prev";
import Reroute from "@/components/Reroute";
import { useBackButton } from "@tma.js/sdk-react";
export default function Scaner() {
  type ScanResult = {
    text: string;
  }

  const [data, setData] = useState<boolean | null>(null);
  const router = useRouter();
  const [isResultChecked, setIsResultChecked] = useState(false);
  const [coordinatesArray, setcoordinatesArray] = useState<Array<number> | null>(null)
  useEffect(() => {
    return () => {
      setIsResultChecked(false);
    };
  }, [data]);
  const checkFunc = useCallback((result: ScanResult | null | undefined, error: Error | null) => {
    let timeoutId: NodeJS.Timeout;
    if (!isResultChecked && result && !data) {
      setIsResultChecked(true); 
      const coordinatesArray = result.text.split(',').map(coord => parseFloat(coord));
      if (
        coordinatesArray.length !== 2 ||
        isNaN(coordinatesArray[0]) ||
        isNaN(coordinatesArray[1])
      ) {
        setData(false);
      } else {
        setData(true);
        setcoordinatesArray(coordinatesArray);
      }
    }
    if (error) {
      console.log(error);
    }
    timeoutId = setTimeout(() => {
      setIsResultChecked(false);
    }, 1000);

  return () => {
    clearTimeout(timeoutId);
  };
  }, [isResultChecked, router]);
  const backButton = useBackButton()

  backButton.show()
  backButton.on('click', () =>{
    router.push("/")
  })
  return (
    <div className=" bg-scin-base h-screen w-screen ">
      <div className=" rounded-xl  border-4 border-base mt-5 w-screen ">
        <QrReader
          containerStyle={{
            width: "100%"
          }}
          onResult={(result:any, error:any) =>{  
          if(!!result){
             checkFunc(result, error)
            }
            if (!!error) {
              console.info(error);
          }
          }}
          scanDelay={300}
          constraints={{ facingMode: "environment" }}
          className=" rounded-xl  w-full"
        />
        {
          data === true ?
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-link-base text-black text-2xl hover:text-emerald-100 text-center">Код отсканирован</h2>
              <button
                className="bg-button-base   justify-center items-center hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl flex"
                onClick={() => coordinatesArray && router.push(`/quest/${coordinatesArray[0]}/${coordinatesArray[1]}`)}
              >
                Перейти
              </button>

        </div>    :
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
