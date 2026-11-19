"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import CardPopUp from "./CardPopUp";

const Card = () => {
  // Motion values for drag & swing physics
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Smooth spring physics for returning to rest position
  const springConfig = { damping: 15, stiffness: 150, mass: 0.8 };
  const smoothX = useSpring(dragX, springConfig);
  const smoothY = useSpring(dragY, springConfig);

  // Dynamic 3D tilt based on drag position
  const rotateZ = useTransform(smoothX, [-200, 200], [-25, 25]);
  const rotateY = useTransform(smoothX, [-200, 200], [-30, 30]);

  // Dynamic SVG wire line connection coordinates
  const wireX2 = useTransform(smoothX, (x) => 160 + x * 0.4);
  const wireY2 = useTransform(smoothY, (y) => 128 + y * 0.4);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#080808] text-white selection:bg-blue-500/30">
      
      {/* Background ambient light */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 lg:px-12">
        
        {/* TOP LEFT SECTION TAG [001] */}
        <div className="absolute top-12 left-6 md:left-12 font-mono text-xs tracking-widest text-zinc-500">
          <span className="font-medium text-zinc-400">[001]</span>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-zinc-400">About</p>
        </div>

        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[340px_1fr] lg:grid-cols-[400px_1fr]">
          
          {/* LEFT — INTERACTIVE DRAGGABLE HANGING LANYARD & ID CARD */}
          <div className="relative flex h-[460px] w-full items-center justify-center pt-2">
            
            {/* Top Anchor Point Dot */}
            <div className="absolute top-2 z-30 h-3 w-3 rounded-full border border-zinc-500 bg-zinc-900 shadow-[0_0_12px_rgba(255,255,255,0.3)]" />
            
            {/* Dynamic Wire SVG */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full z-10">
              <motion.line
                x1="50%"
                y1="14"
                x2={wireX2}
                y2={wireY2}
                stroke="url(#wireGradient)"
                strokeWidth="1.5"
              />
              <defs>
                <linearGradient id="wireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#71717a" />
                  <stop offset="100%" stopColor="#27272a" />
                </linearGradient>
              </defs>
            </svg>

            {/* DRAGGABLE CARD BADGE */}
            <motion.div
              drag
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={0.6}
              dragSnapToOrigin
              style={{
                x: smoothX,
                y: smoothY,
                rotateZ: rotateZ,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
              }}
              onDrag={(_, info) => {
                dragX.set(info.offset.x);
                dragY.set(info.offset.y);
              }}
              onDragEnd={() => {
                dragX.set(0);
                dragY.set(0);
              }}
              className="group relative mt-16 w-60 cursor-grab active:cursor-grabbing overflow-hidden rounded-2xl border border-zinc-800 bg-[#101010]/95 p-6 shadow-2xl backdrop-blur-xl transition-colors hover:border-zinc-700 hover:shadow-blue-500/10 z-20"
            >
              {/* Card Ring Loop Hook */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full border border-zinc-600 bg-zinc-950 shadow-inner" />

              {/* Profile Picture & Header */}
              <div className="relative z-10 flex flex-col items-center pt-4 pb-2">
                <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border border-zinc-700/80 bg-zinc-900 p-0.5 shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:border-blue-500/50">
                  <img
                    src="/me.jpg"
                    alt="Sahar Fatima"
                    className="h-full w-full rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-900 font-bold text-white text-xl">
                    SF
                  </div>
                  <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-zinc-950 bg-emerald-500" />
                </div>
                
                <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                  Sahar Fatima
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-blue-400">
                  Full Stack Dev
                </p>
              </div>

              {/* Tech Badges */}
              <div className="relative z-10 mt-2 flex flex-wrap justify-center gap-1.5 font-mono text-[10px] text-zinc-400">
                <span className="rounded bg-zinc-900/90 border border-zinc-800 px-2 py-0.5">Next.js</span>
                <span className="rounded bg-zinc-900/90 border border-zinc-800 px-2 py-0.5">TypeScript</span>
                <span className="rounded bg-zinc-900/90 border border-zinc-800 px-2 py-0.5">PostgreSQL</span>
              </div>

              {/* Bottom Card Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 transition group-hover:opacity-100" />
            </motion.div>

          </div>

          {/* RIGHT — HERO EDITORIAL CONTENT */}
          <div className="flex max-w-3xl flex-col justify-center">
            
            {/* Main Heading */}
            <h1 className="text-balance text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl md:text-6xl text-zinc-100">
              I&apos;m a <span className="font-serif italic font-normal text-blue-400">Full Stack Developer</span> focused on building <span className="font-semibold text-white">clean and sustainable</span> systems.
            </h1>

            {/* Description Paragraph */}
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg font-light">
              I&apos;m <strong className="font-normal text-zinc-200">Sahar Fatima</strong>, someone who loves <span className="text-zinc-200 underline decoration-zinc-700 underline-offset-4">learning new things</span> and constantly tries to put what I learn into practice. I develop web applications and digital tools. I enjoy working with simple, practical, and <span className="font-serif italic text-zinc-300">sustainable</span> tech.
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <CardPopUp />

              <a
                href="#contact"
                className="text-sm font-medium text-zinc-400 transition hover:text-white inline-flex items-center gap-2 group"
              >
                Let&apos;s Connect 
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Card;