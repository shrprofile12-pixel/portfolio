// src/app/actions/contactAction.ts
"use server";

import { prisma } from "@/lib/prisma"; // Make sure path to your prisma instance is correct

export async function submitContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required" };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return { success: false, error: "Something went wrong" };
  }
}