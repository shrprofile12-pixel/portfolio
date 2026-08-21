"use client"

import React, { useEffect, useRef } from 'react'
import localFont from 'next/font/local'
import Link from 'next/link'
import gsap from 'gsap'

const Logo = localFont({
  src: '../../../Fonts/ThickoDEMO-Regular.ttf' 
})

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const subTextRef = useRef<HTMLParagraphElement | null>(null)
  const bioRef = useRef<HTMLParagraphElement | null>(null)
  const buttonsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.fromTo(
      headingRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 0.1 }
    )
    .fromTo(
      subTextRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      "-=0.5"
    )
    .fromTo(
      bioRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      "-=0.5"
    )
    .fromTo(
      buttonsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      "-=0.5"
    )
  }, [])

  return (
    <section className='w-full min-h-[calc(100vh-80px)] flex flex-col md:flex-row justify-start items-center px-8 md:px-16 pt-12 md:pt-20 gap-10 relative z-10'>

      {/* Left Side: Main Heading, Subtext, Bio, and Buttons */}
      <div className="w-full md:w-3/4 lg:w-2/3 flex flex-col justify-center items-start text-left">
        
        {/* Heading */}
        <h1 
          ref={headingRef}
          className={`text-4xl sm:text-6xl md:text-8xl text-white tracking-wide uppercase leading-none ${Logo.className}`}
        >
          Full-Stack Developer
        </h1>

        {/* Subtext */}
        <p 
          ref={subTextRef}
          className="text-gray-400 text-lg md:text-2xl mt-4 tracking-wide font-light"
        >
          crafting web systems & motion.
        </p>

        {/* Bio */}
        <p 
          ref={bioRef}
          className="text-gray-300 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed mt-4 mb-8"
        >
          Engineering high-performance web applications where robust backend architecture meets seamless human experience. I transform complex business logic into clean, scalable, and beautifully animated digital products.
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex gap-4">
          <Link 
            href="#projects" 
            className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-all duration-300 text-sm sm:text-base"
          >
            Explore Projects
          </Link>
          <Link 
            href="#contact" 
            className="px-6 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
          >
            Get in Touch
          </Link>
        </div>

      </div>

      {/* Right Side */}
      <div className="hidden md:block md:w-1/4"></div>

    </section>
  )
}

export default Hero