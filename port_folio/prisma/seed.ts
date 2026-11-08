import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.createMany({
    data: [
      {
        title: "AI Chat Application",
        slug: "ai-chat-application",
        description: "A full-stack real-time chat application powered by Next.js and Tailwind CSS.",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000",
        projectUrl: "https://example.com",
        githubUrl: "https://github.com",
        year: 2026,
        featured: true,
      },
      {
        title: "E-Commerce Dashboard",
        slug: "e-commerce-dashboard",
        description: "Modern analytics dashboard built with TypeScript, Neon PostgreSQL, and Prisma.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
        githubUrl: "https://github.com",
        year: 2025,
        featured: false,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });