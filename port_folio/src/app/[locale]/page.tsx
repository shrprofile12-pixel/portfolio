// src/app/page.tsx (ya src/app/[locale]/page.tsx)
import { prisma } from "@/lib/prisma";
import MainPage from "@/component/MainPage"; // Aapka client main component

type ProjectList = Awaited<ReturnType<typeof prisma.project.findMany>>;

export default async function Home() {
  let projects: ProjectList = [];

  try {
    // 1. Database se projects fetch karein server par
    projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load projects from database:", error);
  }

  // 2. Projects ko MainPage client component ko props ke zariye pass kar dein
  return <MainPage projects={projects} />;
}