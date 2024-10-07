import React from 'react'

type Props = {
    text:string
}

const Loading = (props: Props) => {
  return (
    <div className="flex items-center justify-center  mt-5    ">
    <div className="flex flex-col items-center space-y-4">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2  border-base mb-8 mx-auto">
      </div>
      <p className="  text-link-base  text-2xl">{props.text}</p>
    </div>
  </div>
  )
}

export default Loading