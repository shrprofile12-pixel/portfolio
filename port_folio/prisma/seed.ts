import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Purana data delete karein taake duplicate slug ka error na aaye
  await prisma.project.deleteMany();

  // 2. Naya data insert karein
  await prisma.project.createMany({
    data: [
      {
        title: "CHICOW Ecommerce Website",
        slug: "chicow-ecommerce-website",
        description: "A full-stack real-time chat application powered by Next.js and Tailwind CSS.",
        imageUrl: "https://github.com/shrprofile12-pixel/Ecommerce-Nextjs/blob/main/LandingPage.png?raw=true",
        projectUrl: "https://chicow.vercel.app/",
        githubUrl: "https://github.com/shrprofile12-pixel/Ecommerce-Nextjs/tree/main/ecom",
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