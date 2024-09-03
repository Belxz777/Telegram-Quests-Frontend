 "use client"
 import React, { useEffect, useRef, useState } from 'react'
 import { Button, Placemark, YMaps, ZoomControl, Map } from '@pbe/react-yandex-maps'
import Link from 'next/link'
import { useBackButton, useCloudStorage } from '@tma.js/sdk-react'
import { getNextLocation, getTeamLocations } from '@/server/getAllQuests'
import Loading from '@/components/Loading'
import { useRouter } from 'next/navigation'
import Reroute from '@/components/Reroute'
 type Props = {}
 
const Periodic = (props: Props) => {
  const cloudStorage = useCloudStorage()
  const router = useRouter()
  const [nextData, setnextData] = useState<any>(null)
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState(false)
  const backButton = useBackButton()
const [isReroute,setIsReroute] = useState(false)
backButton.show()
backButton.on('click', () =>{
  router.push("/")
})

  useEffect(() => {
    const setCurrentQuiz = async () => {
      setloading(true)
      const name = localStorage.getItem("team") || ''
      const response = await getTeamLocations(name)
      if (!response) {
        seterror(true)
      }
      setnextData(response)
      setloading(false)
    }
    setCurrentQuiz()
  }, [])
  //todo сделать админ панель и добавить задания еще также в принципе еще раз пересмотреть логику
  // ! ЗДЕСЬ БУДЕТ КАРТА С ТОЧКАМИ КОТОРЫЕ ЕЩЕ НЕ ПОСЕТИЛА КОМАНДА
  const ref = useRef<any | null>(null)
  const data ="Мы на месте"
  return (
    <>
{
  isReroute && <Reroute text='Переход'/>
}
      {/* <h1 className="text-4xl md:text-5xl font-bold text-link-base text-center">Команда {} создана</h1> */}
      <p className="text-4xl md:text-5xl font-bold text-link-base  text-center select-none overflow-hidden">
        Оставшиеся задания вашей команды:
      </p>
      <div className=" w-full max-w-4xl aspect-square  bg-scin-base rounded-2xl h-screen overflow-hidden" >
        {
          loading && <Loading text='Загрузка'></Loading>
        }
        {
          error && <p className="text-4xl md:text-5xl font-bold text-link-base  text-center">
            Ошибка:
          </p>
        }
        <YMaps key={'c04094f5-7ea3-4e2d-9305-f0be2330dfd6'}  >
          {
            nextData ?
              <Map defaultState={{ center: [56.8496, 53.2052], zoom: 12 }} width={window.outerWidth} height={window.outerHeight-100} >
                <>
                  {
                    nextData.map((item: any, index: number) =>
                      <>
                        <Placemark geometry={[item.lat, item.lon]} properties={{
                          iconCaption: `${item.name}`,
                        }}
                          options={{
                            preset: "islands#circleDotIcon",
                            cursor: "pointer",
                          }
                          }
                          key={index}
                        />
                      </>
                    )
                  }
                </>
                <ZoomControl options={{
                }} />
                <Button
                  options={{
                    maxWidth: 200,
                    size:"small",
                    selectOnClick: true,

                  }}
                  onClick={()=> {router.push(`/qrscanner`)
setIsReroute(true)
                  }}
                  data={{ content: "Мы на месте" }}
          defaultState={{ selected: true}}
                  instanceRef={ref}
                ></Button>
              </Map>
              :
         null
          }
        </YMaps>


      </div>
    </>
  )
}
 export default Periodic