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

    const handleMouseEnterNav = () => {
      gsap.to(currentCursor, {
        scale: 1, // Empty space par chota blob
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeaveNav = () => {
      gsap.to(currentCursor, {
        scale: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleHoverBig = () => {
      gsap.to(currentCursor, {
        scale: 4.5, // Home, About, Projects, Contact aur Logo par bara blob (jaise globe par hota hai)
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleHoverNormal = () => {
      gsap.to(currentCursor, {
        scale: 1, // Wapas chota blob jab cursor text se bahar jaye
        duration: 0.3,
        ease: "power2.out"
      })
    }

    if (currentNav) {
      currentNav.addEventListener('mouseenter', handleMouseEnterNav)
      currentNav.addEventListener('mouseleave', handleMouseLeaveNav)

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
        <div ref={cursor} className='w-8 h-8 fixed top-0 left-0 bg-white opacity-60 mix-blend-difference z-50 pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2 scale-0'></div>
        
        <div className="flex justify-between items-center p-4 text-white relative z-20">
          <h1 className={`${Logo.className} text-4xl ml-8 hover-target cursor-pointer inline-block relative group`}>
            SAHAR FATIMA
            <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-white rounded-full transition-all duration-300 ease-out group-hover:w-full"></span>
          </h1>
          
          <nav className="flex gap-12 justify-center items-center mr-24 text-2xl">
            <ul className="flex gap-8 justify-end items-center list-none">
              {['Home', 'About', 'Projects', 'Contact'].map((item, index) => {
                const hrefs = ['#home', '#about', '#projects', '#contact'];
                return (
                  <li key={item}>
                    <Link 
                      href={hrefs[index]} 
                      className="hover-target text-gray-300  hover:text-white transition-colors inline-block relative group py-1"
                    >
                      {item}
                      <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-white rounded-full transition-all duration-300 ease-out group-hover:w-full"></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            <div className="hover-target cursor-pointer inline-block relative group py-1">
              <BsGlobeEuropeAfricaFill className="transition-transform duration-300" />
              <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-white rounded-full transition-all duration-300 ease-out group-hover:w-full"></span>
            </div>
          </nav>
        </div>
      </section>
    </>
  )
}

export default Navbar