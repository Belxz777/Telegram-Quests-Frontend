import { useRouter } from 'next/navigation'
import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'

type Props = {}

function Back({}: Props) {
    const router = useRouter()
  return (
    <div>
    <p className=' text-link-base text-center font-extrabold items-center text-2xl '>К сожалению произошла непредвиденная ошибка</p>
    <button className=" bg-button-base hover:bg-hint-base text-button-base font-bold py-2 px-4 rounded-full text-xl flex" onClick={()=> router.push(`/`)}>
<AiOutlineArrowLeft  />
Обратно на главную
</button>
  </div>
  )
}

export default Back