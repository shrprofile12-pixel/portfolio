"use client"

import React, { RefObject } from 'react'
import Link from 'next/link'
import { FaArrowRight } from "react-icons/fa"
import ParticlePhoto from '../ParticlePhoto'

interface HeroImageProps {
  imageRef: RefObject<HTMLDivElement | null>
}

export const HeroImage: React.FC<HeroImageProps> = ({ imageRef }) => {
  return (
    <div 
      ref={imageRef} 
      className="w-full sm:w-2/3 top-[-70px] md:w-1/2 lg:w-[35%] lg:mr-12 flex justify-center lg:justify-end items-center relative z-10"
    >
      <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none -z-10" />
      
      <ParticlePhoto />

      <div className="absolute top-[200px] bottom-[-200px] right-5 sm:right-6 lg:-right-24 z-20 flex items-center justify-center cursor-pointer group">
        <Link 
          href="#projects" 
          className="z-20 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black shadow-lg"
        >
          <FaArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  )
}