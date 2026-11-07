"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import { HeroContent } from "./HeroContent";
import { HeroImage } from "./HeroImage";
import { SocialSidebar } from "./SocialSidebar";

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subTextRef = useRef<HTMLParagraphElement | null>(null);
  const bioRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

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
      );

    // Gentle continuous floating
    const floatTween = gsap.to(imageRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1,
    });

    return () => {
      tl.kill();
      floatTween.kill();
    };
  }, []);

  return (
    <section className="relative z-10 flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-between gap-8 overflow-hidden px-6 md:px-16 lg:flex-row">
      
      {/* LEFT SIDE — CONTENT + DOT EFFECT */}
      <div className="relative z-10 w-full lg:w-[55%] top-[-30px]">
        <HeroContent
          headingRef={headingRef}
          subTextRef={subTextRef}
          bioRef={bioRef}
          buttonsRef={buttonsRef}
        />
      </div>

      {/* RIGHT SIDE — CLEAN PARTICLE GIRL */}
      <div className="relative z-20 w-full lg:w-[45%] top-[-88px]">
        <HeroImage imageRef={imageRef} />
      </div>

      <SocialSidebar />
    </section>
  );
};

export default Hero;