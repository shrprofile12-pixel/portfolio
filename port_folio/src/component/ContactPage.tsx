"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Code, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="container mx-auto px-4 py-20 relative z-10 text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Get In Touch</h2>
          <p className="text-gray-400 text-sm">
            Have a project in mind or want to chat? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Side: Direct Contact Info */}
          <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let&apos;s Connect</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Aap mujhse niche diye gaye platform par bhi rabta kar sakti hain. Main koshish karungi ke jald se jald reply karoon.
              </p>

              {/* Links */}
              <div className="space-y-4">
                {/* Gmail */}
                <Link 
                  href="mailto:your-email@gmail.com" 
                  className="flex items-center gap-4 p-3 rounded-xl bg-zinc-800/40 hover:bg-zinc-800 transition-colors border border-zinc-700/50"
                >
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email Me</p>
                    <p className="text-sm font-medium">sahar.fatima@gmail.com</p>
                  </div>
                </Link>

                {/* GitHub (Using Code icon) */}
                <Link 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl bg-zinc-800/40 hover:bg-zinc-800 transition-colors border border-zinc-700/50"
                >
                  <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                    <Code size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">GitHub</p>
                    <p className="text-sm font-medium">github.com/username</p>
                  </div>
                </Link>

                {/* Discord */}
                <Link 
                  href="https://discord.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl bg-zinc-800/40 hover:bg-zinc-800 transition-colors border border-zinc-700/50"
                >
                  <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Discord</p>
                    <p className="text-sm font-medium">Sahar#0000</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-800 text-xs text-gray-500 text-center">
              Available for remote work & internships 🚀
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-12 h-12 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mb-4 text-xl">
                  ✓
                </div>
                <h4 className="text-lg font-semibold mb-2">Message Sent!</h4>
                <p className="text-gray-400 text-sm">Shukriya! Aapka message mil gaya hai, main jald hi rabta karungi.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Your Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter your email"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Your Message</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Type your message here..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-zinc-600 transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm mt-2"
                >
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}