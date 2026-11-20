"use server";

import { prisma } from "@/lib/prisma"; // Aapka prisma client instance
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 1. Get All Projects
export async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// 2. Get Single Project by ID (for Edit Page)
export async function getProjectById(id: string) {
  try {
    return await prisma.project.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

// 3. Add Project
export async function addProject(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const videoUrl = formData.get("videoUrl") as string;
  const projectUrl = formData.get("projectUrl") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const year = parseInt(formData.get("year") as string) || new Date().getFullYear();
  const featured = formData.get("featured") === "on";

  try {
    await prisma.project.create({
      data: {
        title,
        slug,
        description,
        imageUrl,
        videoUrl: videoUrl || null,
        projectUrl: projectUrl || null,
        githubUrl: githubUrl || null,
        year,
        featured,
      },
    });
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error adding project:", error);
  }
}

// 4. Update Project
export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const videoUrl = formData.get("videoUrl") as string;
  const projectUrl = formData.get("projectUrl") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const year = parseInt(formData.get("year") as string) || new Date().getFullYear();
  const featured = formData.get("featured") === "on";

  try {
    await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        imageUrl,
        videoUrl: videoUrl || null,
        projectUrl: projectUrl || null,
        githubUrl: githubUrl || null,
        year,
        featured,
      },
    });
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error updating project:", error);
  }
  redirect("/admin");
}

// 5. Delete Project
export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error deleting project:", error);
  }
}