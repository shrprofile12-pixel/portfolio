"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
      {/* Removed asChild to prevent TypeScript mismatch with your UI library */}
      <DialogTrigger>
        {children || (
          <button
            type="button"
            className="group inline-flex cursor-pointer items-center gap-3 border-b border-blue-400 bg-transparent pb-2 text-sm font-medium text-white transition hover:text-blue-400"
          >
            Explore My Projects
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="border-zinc-800 bg-zinc-950 text-white sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Featured Projects
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Here are some of the key projects and digital experiences I&apos;ve built recently.
          </DialogDescription>
        </DialogHeader>

        {/* Modal Body / Project Showcase Content */}
        <div className="mt-4 space-y-4 text-sm text-zinc-300">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-zinc-700">
            <h3 className="font-semibold text-blue-400">Project One</h3>
            <p className="mt-1 text-xs text-zinc-400">
              A full-stack modern web application built with Next.js, Tailwind CSS, and TypeScript.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-zinc-700">
            <h3 className="font-semibold text-blue-400">Project Two</h3>
            <p className="mt-1 text-xs text-zinc-400">
              Interactive web experience focusing on performant UI/UX and smooth animations.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardPopUp;