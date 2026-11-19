"use client";

import React, { useState, useRef } from "react";

const LanyardCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Smooth tilt effect calculations
    setRotateX(-mouseY * 0.07);
    setRotateY(mouseX * 0.07);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="relative flex h-full w-full items-center justify-center py-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
    >
      {/* Dynamic Glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-72 rounded-full bg-blue-500/20 blur-[100px] pointer-events-none" />

      {/* LANYARD STRAP & HARDWARE */}
      <div className="absolute top-0 z-10 flex flex-col items-center">
        {/* Woven Lanyard Fabric */}
        <div className="relative flex h-48 w-5 justify-center overflow-hidden rounded-t-sm border-x border-zinc-700/50 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.06)_50%,transparent_75%)] bg-[length:6px_6px]" />
          <div className="h-full w-[2px] bg-blue-500/50" />
        </div>

        {/* Top Metallic Ring */}
        <div className="z-20 -mt-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-zinc-400 bg-gradient-to-tr from-zinc-700 via-zinc-400 to-zinc-600 shadow-lg">
          <div className="h-3 w-3 rounded-full border border-zinc-600 bg-zinc-950" />
        </div>

        {/* Metallic Clip Strap Connector */}
        <div className="z-10 -mt-1.5 h-6 w-4 rounded-sm bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-400 shadow-md" />
      </div>

      {/* 3D FLOATING GLASS BADGE */}
      <div
        ref={cardRef}
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative z-20 mt-36 h-[420px] w-72 cursor-pointer transition-transform duration-200 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
        }}
      >
        {/* CARD FRONT */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/90 via-zinc-950/95 to-black/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Top Lanyard Clip Slot */}
          <div className="flex items-center justify-center pb-2">
            <div className="h-2.5 w-14 rounded-full border border-zinc-700 bg-zinc-900/80 shadow-inner" />
          </div>

          {/* Profile Header */}
          <div className="relative mt-2 flex flex-col items-center">
            {/* Glowing Avatar Ring */}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-blue-500/30 bg-gradient-to-b from-blue-500/10 to-transparent p-1 shadow-inner">
              <div className="flex h-full w-full items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-3xl font-extrabold tracking-widest text-white shadow-md">
                SF
              </div>
              <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-zinc-950 bg-emerald-500" />
            </div>

            {/* Name & Title */}
            <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
              Sahar Fatima
            </h3>
            <p className="mt-1 font-mono text-xs font-medium uppercase tracking-widest text-blue-400">
              Full Stack Developer
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div className="my-3 flex flex-wrap justify-center gap-1.5 font-mono text-[11px] text-zinc-300">
            <span className="rounded-md border border-white/5 bg-zinc-900/80 px-2.5 py-1">
              Next.js
            </span>
            <span className="rounded-md border border-white/5 bg-zinc-900/80 px-2.5 py-1">
              TypeScript
            </span>
            <span className="rounded-md border border-white/5 bg-zinc-900/80 px-2.5 py-1">
              PostgreSQL
            </span>
            <span className="rounded-md border border-white/5 bg-zinc-900/80 px-2.5 py-1">
              Prisma
            </span>
          </div>

          {/* Card Footer */}
          <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] text-zinc-500">
            <span className="tracking-widest">ID #2026-DEV</span>
            <span className="text-blue-400 transition hover:underline">
              Flip Pass ↺
            </span>
          </div>
        </div>

        {/* CARD BACK */}
        <div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/90 via-zinc-950/95 to-black/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Top Lanyard Clip Slot */}
          <div className="flex items-center justify-center">
            <div className="h-2.5 w-14 rounded-full border border-zinc-700 bg-zinc-900/80" />
          </div>

          {/* Digital Access QR Section */}
          <div className="my-auto flex flex-col items-center justify-center">
            <div className="relative flex h-36 w-36 items-center justify-center rounded-xl border border-white/10 bg-white p-3 shadow-2xl">
              <div className="flex h-full w-full items-center justify-center rounded bg-zinc-950 p-2 text-center font-mono text-[10px] tracking-wider text-zinc-400">
                [ QR DIGITAL PASS ]
              </div>
            </div>
            <p className="mt-4 font-mono text-xs tracking-widest text-zinc-400">
              SCAN FOR FULL PORTFOLIO
            </p>
          </div>

          {/* Card Back Footer */}
          <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] text-zinc-500">
            <span>VERIFIED CREDENTIALS</span>
            <span className="text-blue-400">Flip back ↺</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanyardCard;