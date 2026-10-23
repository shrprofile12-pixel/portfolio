import Lanyard from '@/components/Lanyard'
import Link from 'next/link'
import React from 'react'

const Card = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">

      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-6 py-20 md:grid-cols-[380px_1fr] lg:grid-cols-[420px_1fr] lg:px-10">

        {/* LEFT — LANYARD */}
        <div className="relative flex h-[500px] items-center justify-center md:h-[600px]">
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
          />
        </div>


        {/* RIGHT — HERO CONTENT */}
        <div className="flex max-w-4xl flex-col justify-center">

          {/* Small intro */}
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
            Full Stack Developer
          </p>

          {/* Heading */}
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]">

            I&apos;m a{' '}
            <span className="text-blue-400">
              Full Stack Developer
            </span>{' '}
            focused on building{' '}

            <span className="font-bold">
              scalable
            </span>{' '}
            and{' '}

            <span className="font-bold">
              meaningful
            </span>{' '}
            digital experiences.

          </h1>


          {/* Description */}
          <p className="mt-8 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
            I build modern web applications that bring thoughtful design,
            reliable functionality, and clean architecture together. I enjoy
            turning ideas into practical digital products while continuously
            learning and exploring better ways to build for the web.
          </p>


          {/* Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">

            <Link
              href="/About/CardPopUp"
              className="group inline-flex items-center gap-3 border-b border-blue-400 pb-2 text-sm font-medium text-white transition hover:text-blue-400"
            >
              Explore My Projects

              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <a
              href="#contact"
              className="rounded-full border border-zinc-700 px-6 py-3 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              Let&apos;s Connect
            </a>

          </div>

        </div>

      </div>


      {/* Bottom scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.3em] text-zinc-600 md:flex">
        <span>Scroll</span>
        <span className="h-10 w-px bg-zinc-700" />
      </div> */}

    </section>
  )
}

export default Card