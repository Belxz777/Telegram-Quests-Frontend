'use client';
import React,  {useCallback, useEffect, useRef, useState}  from "react";
import {QrReader} from "react-qr-reader";
import { useRouter } from "next/navigation";
import usePrevious from "@/server/prev";
import Reroute from "@/components/Reroute";
import { useBackButton } from "@tma.js/sdk-react";
import { getLocationByLatLon } from "@/server/getAllQuests";
import { url } from "../types";
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
      alert(result.text);
      const coordinatesArray = result.text.split(',').map(coord => parseFloat(coord).toFixed(6));
      alert(coordinatesArray[0]);
      alert(coordinatesArray[1])
      if (
        coordinatesArray.length !== 2 ||
        isNaN(parseFloat(coordinatesArray[0])) ||
        isNaN(parseFloat(coordinatesArray[1]))
      ) {
        setData(false);
      } else {
        setData(true);
        setcoordinatesArray(coordinatesArray.map(coord => parseFloat(coord)));
getLocationIfIS();
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
  const getLocationIfIS = async () => {
    if (!coordinatesArray) {
      console.error('Coordinates are not set');
      return;
    }
    const lat = coordinatesArray[0];
    const lon = coordinatesArray[1];
  const location = await getLocationByLatLon(lat, lon);
  if (location) {
    router.push(`/quest/${location.id}`);
  } else {
    alert("Location not found");
  }
  router.push(`/quest/1`);

  };  return (
    <div className=" bg-scin-base h-screen w-screen ">
      <div className=" rounded-xl  border-4 border-base mt-5 w-screen ">
        <QrReader
          containerStyle={{
            width: "100%" ,
          }}
          onResult={(result:any, error:any) =>{  
          if(!!result){
             checkFunc(result, error)
            }
            if (!!error) {
              console.info(error);
          }
          return;
          }}
          scanDelay={300}
          constraints={{ facingMode: "environment" }}
          className=" rounded-xl"
        />
        {
          data === true ?
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-link-base  text-2xl hover:text-emerald-100 text-center">Код отсканирован</h2>
            <h3 className="text-link-base  text-2xl hover:text-emerald-100 text-center">{
            coordinatesArray && <span>{coordinatesArray[0]  } {coordinatesArray[1]}</span>
}
            </h3>
              <button
                className="bg-button-base   justify-center items-center hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl flex"
               onClick={ getLocationIfIS}
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

      <h1 className=' text-center font-extrabold  text-link-base text-xl  '>
        Включено автоопределение кода , просто наведите камеру
      </h1>
    </div>
  );
}
