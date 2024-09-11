import React, { useEffect, useState } from 'react'

type Props = {}

function Confetti({}: Props) {
    const [animate, setAnimate] = useState(true)

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [animate])
  return (
    <div className="fixed  top-0 left-0 w-full h-full pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2  bg-button-base rounded-lg"
        style={{
          left: `${Math.random() * 100}%`,
          top: '-20px',
          animation: `confetti ${1 + Math.random() * 2}s linear infinite`,
          animationDelay: `${Math.random() * 1}s`
        }}
      />
    ))}
  </div>
  )
}

export default Confetti