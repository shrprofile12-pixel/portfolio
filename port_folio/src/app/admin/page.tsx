import { getProjects, addProject, deleteProject } from "@/actions/projectActions";
import Link from "next/link";

export default async function AdminPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <Link href="/" className="text-sm text-zinc-400 hover:text-white transition">
          ← Back to Portfolio
        </Link>
      </div>

      {/* Add Project Form */}
      <div className="mb-14 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 backdrop-blur-md">
        <h2 className="text-xl font-semibold mb-6 text-blue-400">Add New Project</h2>
        <form action={addProject} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Title</label>
              <input type="text" name="title" required placeholder="e.g. AI SaaS Platform" className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white text-sm focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Slug</label>
              <input type="text" name="slug" required placeholder="e.g. ai-saas-platform" className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white text-sm focus:border-blue-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Description</label>
            <textarea name="description" rows={3} required placeholder="Write a short overview..." className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white text-sm focus:border-blue-500 outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Image URL</label>
              <input type="text" name="imageUrl" required placeholder="https://..." className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Live Demo URL</label>
              <input type="text" name="projectUrl" placeholder="https://..." className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">GitHub URL</label>
              <input type="text" name="githubUrl" placeholder="https://github.com/..." className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Year</label>
              <input type="number" name="year" defaultValue={new Date().getFullYear()} className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white text-sm" />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" name="featured" id="featured" className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-blue-600 focus:ring-0" />
              <label htmlFor="featured" className="text-sm text-zinc-300">Feature this project on homepage</label>
            </div>
          </div>

          <button type="submit" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">
            Publish Project
          </button>
        </form>
      </div>

      {/* Projects Management List */}
      <h2 className="text-xl font-semibold mb-6">Manage Existing Projects ({projects.length})</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-lg text-white">{project.title}</h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{project.year}</span>
                {project.featured && <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">Featured</span>}
              </div>
              <p className="text-sm text-zinc-400 mt-1 line-clamp-1">{project.description}</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <Link href={`/admin/edit/${project.id}`} className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition">
                Edit
              </Link>
              <form action={async () => {
                "use server";
                await deleteProject(project.id);
              }}>
                <button type="submit" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-medium text-red-400 hover:bg-red-500/20 transition">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}