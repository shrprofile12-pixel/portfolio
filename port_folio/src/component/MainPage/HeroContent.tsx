"use client";

import React, { RefObject } from "react";
import Link from "next/link";
import localFont from "next/font/local";
import { FaArrowRight } from "react-icons/fa";
import { LuMouse } from "react-icons/lu";

const Logo = localFont({
  src: "../../../Fonts/ThickoDEMO-Regular.ttf",
});

interface HeroContentProps {
  headingRef: RefObject<HTMLHeadingElement | null>;
  subTextRef: RefObject<HTMLParagraphElement | null>;
  bioRef: RefObject<HTMLParagraphElement | null>;
  buttonsRef: RefObject<HTMLDivElement | null>;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  headingRef,
  subTextRef,
  bioRef,
  buttonsRef,
}) => {
  return (
    <div className="relative z-10 flex min-h-[calc(100vh-80px)] w-full flex-col justify-center py-12 text-left">
      
      <h1
        ref={headingRef}
        className={`text-5xl uppercase leading-none tracking-wide text-white sm:text-6xl md:text-7xl lg:text-8xl ${Logo.className}`}
      >
        Full-Stack
        <br />
        Developer
      </h1>

      <p
        ref={subTextRef}
        className="mt-6 text-lg font-light tracking-wide text-gray-400 md:text-2xl"
      >
        crafting web systems & motion.
      </p>

      <p
        ref={bioRef}
        className="mt-4 mb-8 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg"
      >
        Engineering high-performance web applications where robust backend
        architecture meets seamless human experience. I transform complex
        business logic into clean, scalable, and beautifully animated digital
        products.
      </p>

      <div
        ref={buttonsRef}
        className="flex w-full flex-wrap items-center gap-4"
      >
        <Link
          href="#projects"
          className="flex items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:scale-105 sm:text-base"
        >
          Explore Projects
          <FaArrowRight className="h-4 w-4" />
        </Link>

        <Link
          href="#contact"
          className="flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:scale-105 sm:text-base"
        >
          <LuMouse className="h-4 w-4 animate-pulse text-gray-300" />
          Get in Touch
        </Link>
      </div>
    </div>
  );
};