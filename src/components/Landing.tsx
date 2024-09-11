import React from 'react'
import Image from 'next/image'
import pint from '../../public/landing.png'
type Props = {}

const Landing = (props: Props) => {
  return (
<div className="flex flex-col items-center justify-center min-h-screen  bg-scin-base">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4  text-link-base">Заводские Игры: Квестбот по городу на велосипедах</h1>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2  border-base mb-8 mx-auto">
        </div>
        <h1 className='text-center text-link-base text-2xl'>Загрузка . . .</h1>
      </div>
    </div>

  )
}

export default Landing