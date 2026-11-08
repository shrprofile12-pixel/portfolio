// src/app/page.tsx (Yeh Server Component hai)
import { prisma } from "@/lib/prisma";
import MainPage from "@/component/MainPage"; // Aapka client main component

export default async function Home() {
  // 1. Database se projects fetch karein server par
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Projects ko MainPage client component ko props ke zariye pass kar dein
  return <MainPage projects={projects} />;
}