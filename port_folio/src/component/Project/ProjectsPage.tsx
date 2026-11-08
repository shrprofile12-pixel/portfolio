import { prisma } from "@/lib/prisma";

export default async function ProjectsSection() {
  // Database se projects fetch karna (Server-side)
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="container mx-auto px-4 py-16 relative z-10">
      <h2 className="text-3xl font-bold mb-8 text-white">My Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="border border-zinc-800 rounded-xl overflow-hidden shadow-lg bg-zinc-900/80 backdrop-blur-sm flex flex-col justify-between transition-all duration-300 hover:border-zinc-700"
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
              <h3 className="text-2xl font-semibold mb-2 text-white">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-6 flex-grow">{project.description}</p>

              {/* Links (Live Demo / GitHub / Project URL) */}
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-800 mt-auto">
                {project.projectUrl && (
                  <a 
                    href={project.projectUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-400 hover:underline"
                  >
                    Live Demo →
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-300 hover:text-white hover:underline"
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
  );
}