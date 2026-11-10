import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Define the Project type according to your Prisma schema
interface Project {
  id: string | number;
  title: string;
  description: string;
  imageUrl?: string | null;
  projectUrl?: string | null;
  githubUrl?: string | null;
  createdAt?: Date;
}

export default async function ProjectsPage() {
  // Database se projects fetch karna (Server-side)
  const projects: Project[] = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>

      {/* Grid / cards section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <div key={project.id} className="border rounded-lg p-4 shadow-md bg-white dark:bg-zinc-900">
            {project.imageUrl && (
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-48 object-cover rounded-md mb-4" 
              />
            )}
            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
            
            <div className="flex gap-4">
              {project.projectUrl && (
                <Link 
                  href={project.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 underline"
                >
                  Live Demo
                </Link>
              )}
              {project.githubUrl && (
                <Link 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-700 dark:text-gray-300 underline"
                >
                  GitHub
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}