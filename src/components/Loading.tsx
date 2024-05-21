import React from 'react'

type Props = {
    text:string
}

const Loading = (props: Props) => {
  return (
    <div className="flex items-center justify-center  mt-5    ">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-12 h-12 rounded-full border-4  border-loader border-t-transparent animate-spin" />
      <p className="  text-link-base  text-sm">{props.text}..</p>
    </div>
  </div>
  )
}

export default Loading