"use client"

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { BackgroundCanvas } from './BackgroundCanvas'
import { HeroContent } from './HeroContent'
import { HeroImage } from './HeroImage'
import { SocialSidebar } from './SocialSidebar'

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const subTextRef = useRef<HTMLParagraphElement | null>(null)
  const bioRef = useRef<HTMLParagraphElement | null>(null)
  const buttonsRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLDivElement | null>(null)

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
  }, [])

  return (
    <section className='w-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row justify-between items-center px-6 md:px-16 gap-12 relative z-10 overflow-hidden'>
      <BackgroundCanvas />
      
      <HeroContent 
        headingRef={headingRef}
        subTextRef={subTextRef}
        bioRef={bioRef}
        buttonsRef={buttonsRef}
      />
      
      <HeroImage imageRef={imageRef} />
      
      <SocialSidebar />
    </section>
  )
}

export default Hero