"use client"

import React, { useRef, useEffect } from 'react'
import localFont from 'next/font/local'
import Link from 'next/link'
import { BsGlobeEuropeAfricaFill } from "react-icons/bs"
import gsap from 'gsap'

const Logo = localFont({ src: '../../Fonts/ThickoDEMO-Regular.ttf' })

const Navbar = () => {
  const cursor = useRef<HTMLDivElement | null>(null)
  const navSection = useRef<HTMLElement | null>(null)
  
  const cursorFollower = (e: MouseEvent) => {
    gsap.to(cursor.current, {
      duration: 0.5,
      x: e.clientX,
      y: e.clientY,
    })
  }

  useEffect(() => {
    window.addEventListener('mousemove', cursorFollower)

    const currentNav = navSection.current;
    const currentCursor = cursor.current;

    // 1. Jab empty/blank space par ho navbar ke andar -> Bara ho jaye (Spotlight effect)
    const handleMouseEnterNav = () => {
      gsap.to(currentCursor, {
        scale: .5, // Yahan se aap size control kar sakte hain (bara/chota)
        duration: 0.3,
        ease: "power2.out"
      })
    }

    // 2. Jab navbar se bilkul baahir jaye -> Gayab ho jaye (scale: 0)
    const handleMouseLeaveNav = () => {
      gsap.to(currentCursor, {
        scale: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    // 3. Jab specific text/links ("SAHAR FATIMA" wagera) par jaye -> Chota/Normal ho jaye
    const handleHoverBig = () => {
      gsap.to(currentCursor, {
        scale: 2, // Text par ja kar normal state
        duration: 0.3,
        ease: "power2.out"
      })
    }

    // 4. Jab text se hata kar wapas empty space par layein -> Wapas bara ho jaye
    const handleHoverNormal = () => {
      gsap.to(currentCursor, {
        scale: 4, // Wapas bara ho jaye
        duration: 0.3,
        ease: "power2.out"
      })
    }

    if (currentNav) {
      currentNav.addEventListener('mouseenter', handleMouseEnterNav)
      currentNav.addEventListener('mouseleave', handleMouseLeaveNav)

      // Find all interactive items inside the navbar (Logo, Links, Icon)
      const interactiveElements = currentNav.querySelectorAll('.hover-target');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverBig);
        el.addEventListener('mouseleave', handleHoverNormal);
      })
    }

    return () => {
      window.removeEventListener('mousemove', cursorFollower)
      if (currentNav) {
        currentNav.removeEventListener('mouseenter', handleMouseEnterNav)
        currentNav.removeEventListener('mouseleave', handleMouseLeaveNav)

        const interactiveElements = currentNav.querySelectorAll('.hover-target');
        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', handleHoverBig);
          el.removeEventListener('mouseleave', handleHoverNormal);
        })
      }
    }
  }, [])

  return (
    <>
      <section ref={navSection} className="w-full p-4 relative cursor-default">
        {/* Z-index z-50 kardi hai aur mix-blend-difference se text automatic adjust ho ga */}
        <div ref={cursor} className='w-8 h-8 fixed top-0 left-0 bg-white opacity-60 mix-blend-difference z-50 pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2 scale-0'></div>
        
        <div className="flex justify-between items-center p-4 text-white relative z-20">
          <h1 className={`${Logo.className} text-4xl ml-8 hover-target cursor-pointer inline-block `}>
            SAHAR FATIMA
          </h1>
          <nav className="flex gap-12 justify-center items-center mr-24 text-2xl">
            <ul className="flex gap-8 justify-end items-center list-none">
              <li>
                <Link href="#home" className="hover-target hover:text-gray-300 transition-colors inline-block">Home</Link>
              </li>
              <li>
                <Link href="#about" className="hover-target hover:text-gray-300 transition-colors inline-block">About</Link>
              </li>
              <li>
                <Link href="#projects" className="hover-target hover:text-gray-300 transition-colors inline-block">Projects</Link>
              </li>
              <li>
                <Link href="#contact" className="hover-target hover:text-gray-300 transition-colors inline-block">Contact</Link>
              </li>
            </ul>
            <div className="hover-target cursor-pointer inline-block">
              <BsGlobeEuropeAfricaFill />
            </div>
          </nav>
        </div>
      </section>
    </>
  )
}

export default Navbar