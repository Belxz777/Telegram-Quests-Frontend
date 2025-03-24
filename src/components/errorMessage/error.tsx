'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Reroute from '../Reroute'

interface ErrorPageProps {
  errorMessage: string
  linkText: string
  linkHref: string
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage, linkText, linkHref }) => {
  const [reroute, setReroute] = React.useState(false)
  if(reroute) {
    return <Reroute  text='Переход   . . .'/>
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-32 h-32 mb-8 relative   animate-bounce"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute w-full h-2 bg-red-500 top-1/2 left-0 -translate-y-1/2 "
          initial={{ scaleX: 0,rotate:0 }}
          animate={{ scaleX: 1,rotate:45 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.div
          className="absolute h-full w-2 bg-red-500 left-1/2 top-0 -translate-x-1/2 "
          initial={{ scaleY: 0,rotate: 0 }}
          animate={{ scaleY:1,rotate:45 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
      </motion.div>
      
      <motion.h1
        className="text-4xl font-bold  text-link-base mb-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Упс! Что-то пошло не так
      </motion.h1>
      
      <motion.p
        className="text-xl  text-hint-base  mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {errorMessage}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link href={linkHref}
        onClick={() => setReroute(true)}
         className="  bg-hint-base hover:bg-button-base text-white font-bold py-4 px-8 text-2xl rounded transition duration-300">
     {linkText}
        </Link>
      </motion.div>
    </div>
  )
}

export default ErrorPage