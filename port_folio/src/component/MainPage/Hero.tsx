"use client"

import React, { useEffect, useRef } from 'react'
import localFont from 'next/font/local'
import Link from 'next/link'
import gsap from 'gsap'
import heroImage from "../../../public/selfHero.png"
import { FaGithub, FaLinkedinIn, FaArrowRight } from "react-icons/fa"
import { LuMouse } from "react-icons/lu"
import { HiOutlineMailOpen } from "react-icons/hi"
import Image from 'next/image'

const Logo = localFont({
  src: '../../../Fonts/ThickoDEMO-Regular.ttf' 
})

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const subTextRef = useRef<HTMLParagraphElement | null>(null)
  const bioRef = useRef<HTMLParagraphElement | null>(null)
  const buttonsRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.1 }
    )
    .fromTo(
      subTextRef.current,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    )
    .fromTo(
      bioRef.current,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    )
    .fromTo(
      buttonsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    )
    .fromTo(
      imageRef.current,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8 },
      "-=0.6"
    )

    // Continuous Floating Effect on Image
    gsap.to(imageRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    })

    // Glowing Liquid Cursor Canvas Logic
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    let mouse = { x: width / 2, y: height / 2 }
    let cursor = { x: width / 2, y: height / 2 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      cursor.x += (mouse.x - cursor.x) * 0.06
      cursor.y += (mouse.y - cursor.y) * 0.06

      ctx.clearRect(0, 0, width, height)

      const gradient = ctx.createRadialGradient(
        cursor.x, cursor.y, 0,
        cursor.x, cursor.y, 350
      )
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)')
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.04)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className='w-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row justify-between items-center px-6 md:px-16 py-10 gap-12 relative z-10 overflow-hidden'>

      {/* Glowing Liquid Cursor Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className='absolute inset-0 w-full h-full pointer-events-none z-0'
      />

      {/* Left Side: Main Heading, Subtext, Bio, and Buttons */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center items-start text-left relative z-10">
        
        {/* Heading */}
        <h1 
          ref={headingRef}
          className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wide uppercase leading-none ${Logo.className}`}
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
          className="text-gray-300 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed mt-4 mb-8"
        >
          Engineering high-performance web applications where robust backend architecture meets seamless human experience. I transform complex business logic into clean, scalable, and beautifully animated digital products.
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex flex-wrap gap-4 w-full">

          <Link 
            href="#projects" 
            className=" sm:w-auto lg:w-1/3 flex justify-center items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105"
          >
            Explore Projects
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          
          <Link 
            href="#contact" 
            className="flex lg:w-1/2  sm:w-auto justify-center items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-sm sm:text-base hover:scale-105"
          >
            <LuMouse className="w-4 h-4 animate-pulse text-gray-300" /> 
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Right Side: Image with Floating Animation & Glow Backdrop */}
      <div 
        ref={imageRef} 
        className="w-full sm:w-2/3 md:w-1/2 lg:w-[35%] lg:mr-12 flex justify-center lg:justify-end items-center relative z-10"
      >
        <div className="absolute w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="flex w-full max-w-[360px] aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group relative backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-40 group-hover:opacity-10 transition-opacity duration-500" />
          
          {/* <Image 
            alt='Sahar Fatima - Full Stack Developer'
            fill
            src={heroImage}
            priority
            className='object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out'
          /> */}
        </div>
      </div>

      {/* Modern Sleek Social Sidebar */}
      <div className="top-1/3 right-0 w-12 absolute bg-white/10 backdrop-blur-md border-y border-l border-white/20 py-5 z-20 text-white rounded-l-2xl shadow-2xl hidden md:flex flex-col justify-center items-center gap-6">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 hover:text-white text-gray-300 transition-all duration-300">
          <FaGithub className='w-5 h-5' />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 hover:text-white text-gray-300 transition-all duration-300">
          <FaLinkedinIn className='w-5 h-5' />
        </a>
        <a href="mailto:your-email@example.com" className="hover:scale-125 hover:text-white text-gray-300 transition-all duration-300">
          <HiOutlineMailOpen className='w-5 h-5' />
        </a>
      </div>

    </section>
  )
}

export default Hero