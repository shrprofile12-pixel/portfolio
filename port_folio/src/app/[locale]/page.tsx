// src/app/[locale]/page.tsx
import { prisma } from "@/lib/prisma";
import MainPage from "@/component/MainPage";

type ProjectList = Awaited<ReturnType<typeof prisma.project.findMany>>;

const fallbackProjects: ProjectList = [
  {
    id: "cm_seed_chicow_2026",
    title: "CHICOW Ecommerce Website",
    slug: "chicow-ecommerce-website",
    description:
      "A full-stack real-time chat application powered by Next.js and Tailwind CSS.",
    imageUrl:
      "https://github.com/shrprofile12-pixel/Ecommerce-Nextjs/blob/main/LandingPage.png?raw=true",
    videoUrl: null,
    projectUrl: "https://chicow.vercel.app/",
    githubUrl:
      "https://github.com/shrprofile12-pixel/Ecommerce-Nextjs/tree/main/ecom",
    year: 2026,
    featured: true,
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z"),
  },
  {
    id: "cm_seed_cardia_2025",
    title: "Cardia AI",
    slug: "cardia-ai",
    description:
      "Modern analytics dashboard built with TypeScript, Neon PostgreSQL, and Prisma.",
    imageUrl:
      "https://github.com/shrprofile12-pixel/AgentHospital/blob/main/screencapture-faunnaagentia-vercel-app-2026-11-19-14_37_27.png?raw=true",
    videoUrl: null,
    projectUrl: null,
    githubUrl: "https://faunnaagentia.vercel.app/",
    year: 2025,
    featured: true,
    createdAt: new Date("2025-01-01T00:00:00.000Z"),
    updatedAt: new Date("2025-01-01T00:00:00.000Z"),
  },
];

export default async function Home() {
  let projects: ProjectList = fallbackProjects;

  try {
    // 1. Database se projects fetch karein server par
    const dbProjects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (dbProjects.length > 0) {
      projects = dbProjects;
    }
  } catch (error) {
    console.error("Failed to load projects from database:", error);
  }

  // 2. Projects ko MainPage client component ko props ke zariye pass kar dein
  return <MainPage projects={projects} />;
}