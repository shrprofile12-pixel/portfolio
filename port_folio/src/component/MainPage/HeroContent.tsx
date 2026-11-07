"use client"

import React, { RefObject } from 'react'
import Link from 'next/link'
import localFont from 'next/font/local'
import { FaArrowRight } from "react-icons/fa"
import { LuMouse } from "react-icons/lu"

const Logo = localFont({
  src: '../../../Fonts/ThickoDEMO-Regular.ttf' 
})

interface HeroContentProps {
  headingRef: RefObject<HTMLHeadingElement | null>
  subTextRef: RefObject<HTMLParagraphElement | null>
  bioRef: RefObject<HTMLParagraphElement | null>
  buttonsRef: RefObject<HTMLDivElement | null>
}

export const HeroContent: React.FC<HeroContentProps> = ({
  headingRef,
  subTextRef,
  bioRef,
  buttonsRef,
}) => {
  return (
    <div className="w-full lg:w-7/12 flex flex-col justify-center items-start text-left relative z-10">
      <h1 
        ref={headingRef}
        className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wide uppercase leading-none ${Logo.className}`}
      >
        Full-Stack Developer
      </h1>

      <p 
        ref={subTextRef}
        className="text-gray-400 text-lg md:text-2xl mt-4 tracking-wide font-light"
      >
        crafting web systems & motion.
      </p>

      <p 
        ref={bioRef}
        className="text-gray-300 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed mt-4 mb-8"
      >
        Engineering high-performance web applications where robust backend architecture meets seamless human experience. I transform complex business logic into clean, scalable, and beautifully animated digital products.
      </p>

      <div ref={buttonsRef} className="flex flex-wrap items-center gap-4 w-full">
        <Link 
          href="#projects" 
          className="sm:w-auto lg:w-1/3 flex justify-center items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
        >
          Explore Projects
          <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
        
        <Link 
          href="#contact" 
          className="flex lg:w-1/2 sm:w-auto justify-center items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-sm sm:text-base hover:scale-105"
        >
          <LuMouse className="w-4 h-4 animate-pulse text-gray-300" /> 
          Get in Touch
        </Link>
      </div>
    </div>
  )
}