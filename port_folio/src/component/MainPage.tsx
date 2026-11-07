"use client";

import { useState } from "react";
import Navbar from "../component/Navbar";
import Hero from "../component/MainPage/Hero";
import { BackgroundCanvas } from "../component/MainPage/BackgroundCanvas";
import Loader from "../component/Loader";
import Card from "../component/About/Card"

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      
      {/* ================= LOADING SCREEN ================= */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-black">
          <Loader onComplete={() => setIsLoading(false)} />
        </div>
      )}

      {/* ================= MAIN WEBSITE ================= */}
      <div
        className={`relative min-h-screen w-full transition-all duration-700 ${
          isLoading
            ? "pointer-events-none scale-[1.01] opacity-0"
            : "scale-100 opacity-100"
        }`}
      >
        {/* ✨ MOVING DOTS
            Navbar se start → Hero content side tak
            Girl side bilkul clean */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[55%] overflow-hidden">
          <BackgroundCanvas />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <Card/>
        </div>
      </div>
    </main>
  );
};

export default MainPage;