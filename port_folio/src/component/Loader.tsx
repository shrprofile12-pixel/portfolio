"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import localFont from 'next/font/local'

const Logo = localFont({
  src: '../../Fonts/ThickoDEMO-Regular.ttf'
})

interface LoaderProps {
  onComplete: () => void
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete() // Jab animation khatam ho gi, main page open ho jaye ga
      }
    })

    // Text reveal animation
    tl.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    // Thori der rokne ke baad screen upar ki taraf slide ho kar gayab ho jaye gi
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.8
    })
  }, [onComplete])

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-50 bg-black flex flex-col justify-center items-center text-white"
    >
      <div ref={textRef} className="text-center">
        <h1 className={`text-4xl md:text-6xl tracking-widest uppercase ${Logo.className}`}>
          SAHAR FATIMA
        </h1>
        <p className="text-gray-400 text-sm md:text-base mt-4 tracking-widest font-light">
          LOADING PORTFOLIO...
        </p>
      </div>
    </div>
  )
}

export default Loader