import { getProjectById, updateProject } from "@/actions/projectActions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  // Bind server action with ID
  const updateProjectWithId = updateProject.bind(null, project.id);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <Link href="/admin" className="text-sm text-zinc-400 hover:text-white transition">
          ← Cancel & Go Back
        </Link>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 backdrop-blur-md">
        <form action={updateProjectWithId} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Title</label>
              <input type="text" name="title" defaultValue={project.title} required className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Slug</label>
              <input type="text" name="slug" defaultValue={project.slug} required className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white text-sm outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Description</label>
            <textarea name="description" rows={4} defaultValue={project.description} required className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white text-sm outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Image URL</label>
              <input type="text" name="imageUrl" defaultValue={project.imageUrl} required className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Live Demo URL</label>
              <input type="text" name="projectUrl" defaultValue={project.projectUrl || ""} className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">GitHub URL</label>
              <input type="text" name="githubUrl" defaultValue={project.githubUrl || ""} className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Year</label>
              <input type="number" name="year" defaultValue={project.year} className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white text-sm" />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" name="featured" id="featured" defaultChecked={project.featured} className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-blue-600" />
              <label htmlFor="featured" className="text-sm text-zinc-300">Feature this project on homepage</label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-500 transition shadow-lg shadow-blue-500/20">
              Save Changes
            </button>
            <Link href="/admin" className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}