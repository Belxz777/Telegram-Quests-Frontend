'use client'
import React,{useState,useEffect,useRef} from 'react'
import { YMaps, Map,Placemark,Panorama, Clusterer, Button,GeolocationControl,ZoomControl} from '@pbe/react-yandex-maps/'
import { useRouter } from 'next/navigation'
import { useBackButton } from '@tma.js/sdk-react'
import { augedInfo, LocationData } from '../types/Main'
import Reroute from '@/components/Reroute'
import { url } from '../types'
import { locationsAll } from '@/server/admin/allLocations'
type Props = {}

  function FullQuestsMap ({}: Props) {
    const [location, setlocation] = useState<LocationData[]>([{
      id: 0,
      lat: 0,
      lon: 0,
      name: '',
      description: ''
    }])
  
    const [extendedInfo, setextendedInfo] = useState<augedInfo>({
      ip: 0,
      lat: 56.856825,
      lon: 53.198824,
    })
    const router = useRouter()
    const backButton = useBackButton()

    backButton.show()
    backButton.on('click', () => {
      router.push("/")
    })

    const height = window.innerHeight - 100
    const width = window.innerWidth
    const [reroute, setreroute] = useState(false)
    useEffect(() => {
      const fetchData = async () => {
        const locations = await locationsAll()
   if ("status" in locations) {
    throw new Error(locations.message)
   }
   else {
    if(Array.isArray(locations)){
      setlocation(locations);
 }
   }
      }
      fetchData()
    }, [])
    // const  coordinaets = [{longtail:56.856825,sovtail:53.198824,title:'Квест в падике'},{longtail:56.862081,sovtail:53.218237,title:'Квест на парусах'},]
    
    return (
      <div className='  w-full  overflow-hidden '>
        {
          reroute && <Reroute  text='Загрузка . . .' />
        }
        {
          location.length === 0 ? 
            <YMaps key={'c04094f5-7ea3-4e2d-9305-f0be2330dfd6'} >
              <Map defaultState={{ center: [56.84921, 53.24421] , zoom: 18} }  width={width}  height={height} >
                <Button
                  options={{ maxWidth: 190 }}
                  data={{ content: "Загрузка . . . " }}
                  defaultState={{ selected: false }}
                >
                </Button>
              </Map>
            </YMaps>
          :
            <YMaps key={'c04094f5-7ea3-4e2d-9305-f0be2330dfd6'} >
              <Map defaultState={{ center: [56.84921, 53.24421] , zoom: 18} }  width={width}  height={height} >
                {
                  location.map((item,index) =>
                    item.lat && item.lon && item.name && item.id && (
                      <Placemark 
                        geometry={[item.lat, item.lon]}
                        properties={{
                          iconCaption: `${item.name}`,
                        }}
                        options={{
                          preset: "islands#circleDotIcon",
                          cursor: "pointer",
                        }}
                        key={index}
                        onClick={() => {
                          setreroute(true)
                          router.push(`/location/${item.id}`)
                        }}
                      />  
                    )
                  )
                }
                
                <Placemark defaultGeometry={ [extendedInfo.lat, extendedInfo.lon]}
                  options={{
                    iconColor:'green',
                    balloonContent:'Это примерное вычисление'
                  }}
                  properties={{
                    iconColor: `green`,
                    iconCaption: `Вы находитесь здесь`
                  }}
                />
                <ZoomControl options={{}} />
                <Button
                  options={{ maxWidth: 450 }}
                  data={{ content: url }}
                  defaultState={{ selected: true }}
                />
              </Map>
            </YMaps>
        }
      </div>
    )
  }

export default FullQuestsMap