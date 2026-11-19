"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CardPopUpProps {
  children?: React.ReactNode;
}

const CardPopUp: React.FC<CardPopUpProps> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger>
        {children || (
          <button
            type="button"
            className="group inline-flex cursor-pointer items-center gap-3 border-b border-blue-400 bg-transparent pb-2 text-sm font-medium text-white transition hover:text-blue-400"
          >
            FULL ABOUT ME
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="border-zinc-800 bg-zinc-950 text-white sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            About Me
          </DialogTitle>
        </DialogHeader>

        {/* Modal Body / Project Showcase Content */}
        <div className="mt-4 space-y-4 text-sm text-zinc-300">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-zinc-700">
            <div className="mt-1 space-y-4 text-zinc-300 leading-relaxed">
              <p>
                I&apos;m <strong className="text-white">Sahar Fatima</strong>, a passionate Full-Stack Developer and Computer Science student who enjoys turning ideas into modern, functional, and user-friendly digital experiences.
              </p>
              <p>
                I work with technologies like <strong className="text-white">Next.js, TypeScript, PostgreSQL, and Prisma</strong> to build scalable web applications with clean interfaces and thoughtful user experiences. I&apos;m constantly learning, exploring new technologies, and improving my skills through hands-on projects.
              </p>
              <p>
                I believe great development is about more than writing code—it&apos;s about solving problems, creating meaningful experiences, and building products that people enjoy using.
              </p>
              <p className="font-medium text-zinc-200">
                Currently, I&apos;m focused on growing as a developer, building ambitious projects, and creating digital experiences that combine technology, creativity, and purpose.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardPopUp;