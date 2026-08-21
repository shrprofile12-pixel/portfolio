"use client"

import { useState } from "react";
import Hero from "@/component/MainPage/Hero";
import Navbar from "@/component/Navbar";
import Loader from "@/component/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-black min-h-screen text-white relative overflow-hidden">
      {/* Jab tak loading ho rahi hai, sirf Loader dikhega */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* Navbar hamesha rahegi */}
      <Navbar />

      {/* Loader khatam hone ke baad hi Hero component render hoga aur animation chalegi */}
      {!isLoading && <Hero />}
    </main>
  );
}