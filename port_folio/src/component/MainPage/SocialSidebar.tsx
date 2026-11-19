"use client"

import React from 'react'
import { FaGithub, FaLinkedinIn } from "react-icons/fa"
import { HiOutlineMailOpen } from "react-icons/hi"

interface SocialSidebarProps {
  onOpenContact: () => void;
}

export const SocialSidebar: React.FC<SocialSidebarProps> = ({ onOpenContact }) => {
  return (
    <div className="top-1/3 right-0 w-12 absolute bg-white/10 backdrop-blur-md border-y border-l border-white/20 py-5 z-20 text-white rounded-l-2xl shadow-2xl hidden md:flex flex-col justify-center items-center gap-6">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 hover:text-white text-gray-300 transition-all duration-300">
        <FaGithub className='w-5 h-5' />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:scale-125 hover:text-white text-gray-300 transition-all duration-300">
        <FaLinkedinIn className='w-5 h-5' />
      </a>
      {/* Email icon changed to a button that opens your dialog */}
      <button 
        onClick={onOpenContact}
        className="hover:scale-125 hover:text-white text-gray-300 transition-all duration-300 cursor-pointer"
        aria-label="Get in Touch"
      >
        <HiOutlineMailOpen className='w-5 h-5' />
      </button>
    </div>
  )
}