"use client";

import React, { RefObject } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import ParticlePhoto from "../ParticlePhoto";

interface HeroImageProps {
  imageRef: RefObject<HTMLDivElement | null>;
}

export const HeroImage: React.FC<HeroImageProps> = ({ imageRef }) => {
  return (
    <div
      ref={imageRef}
      className="relative z-20 flex w-full items-center justify-center lg:w-full lg:justify-center"
    >
      {/* Soft glow behind image */}
      <div className="pointer-events-none absolute -z-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

      {/* Particle Girl */}
      <div className="relative z-10">
        <ParticlePhoto />
      </div>

      {/* Explore Arrow */}
      <div className="group absolute right-0 top-[70%] z-30 flex -translate-y-1/2 items-center justify-center lg:-right-12">
        <Link
          href="#projects"
          aria-label="Explore projects"
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black"
        >
          <FaArrowRight className="h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
        </Link>
      </div>
    </div>
  );
};