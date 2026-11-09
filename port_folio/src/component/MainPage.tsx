"use client";

import { useState } from "react";
import Navbar from "../component/Navbar";
import Hero from "../component/MainPage/Hero";
import { BackgroundCanvas } from "../component/MainPage/BackgroundCanvas";
import Loader from "../component/Loader";
import Card from "../component/About/Card";
import ContactPage from "./ContactPage";

// Define the Project type based on your Prisma schema
export interface Project {
  id: string | number;
  title: string;
  description: string;
  imageUrl?: string | null;
  projectUrl?: string | null;
  githubUrl?: string | null;
  createdAt?: string | Date;
}

interface MainPageProps {
  projects: Project[];
}

const MainPage = ({ projects }: MainPageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      
      {/* ================= LOADING SCREEN ================= */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-black">
          <Loader onComplete={() => setIsLoading(false)} />
        </div>
      )}

      {/* ================= MAIN WEBSITE ================= */}
      <div
        className={`relative min-h-screen w-full transition-all duration-700 ${
          isLoading
            ? "pointer-events-none scale-[1.01] opacity-0"
            : "scale-100 opacity-100"
        }`}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[55%] overflow-hidden">
          <BackgroundCanvas />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <Card />
          
          {/* ================= PROJECTS SECTION ================= */}
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold mb-8 text-white">My Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects && projects.map((project: Project) => (
                <div 
                  key={project.id} 
                  className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm text-white flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-zinc-700"
                >
                  {/* Project Image */}
                  {project.imageUrl && (
                    <div className="w-full h-48 overflow-hidden bg-zinc-950">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                    </div>
                  )}

                  {/* Content Area */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-6 flex-grow">{project.description}</p>
                    
                    {/* Links Section (Live Demo & GitHub) */}
                    <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/80 mt-auto">
                      {project.projectUrl && (
                        <a 
                          href={project.projectUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-blue-400 hover:underline flex items-center gap-1"
                        >
                          Live Demo →
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-gray-300 hover:text-white hover:underline"
                        >
                          GitHub Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= CONTACT SECTION ================= */}
          <ContactPage />

        </div>
      </div>
    </main>
  );
};

export default MainPage;