"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";

import { HeroContent } from "./HeroContent";
import { HeroImage } from "./HeroImage";
import { SocialSidebar } from "./SocialSidebar";

interface HeroProps {
  onOpenContact?: () => void;
}

const Hero = ({ onOpenContact }: HeroProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subTextRef = useRef<HTMLParagraphElement | null>(null);
  const bioRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  // Track scroll progress of this specific section for Parallax depth
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transform shifts: Content moves up slower, image moves up slightly faster/differently
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.1 }
    )
      .fromTo(
        subTextRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        bioRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        imageRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

    // Gentle continuous floating
    const floatTween = gsap.to(imageRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1,
    });

    return () => {
      tl.kill();
      floatTween.kill();
    };
  }, []);

  const handleOpenContact = () => {
    if (onOpenContact) {
      onOpenContact();
      return;
    }

    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-between gap-8 overflow-hidden px-6 md:px-16 lg:flex-row"
    >
      {/* LEFT SIDE — CONTENT WITH PARALLAX SCROLL */}
      <motion.div
        style={{ y: contentY, opacity: opacityFade }}
        className="relative z-10 w-full lg:w-[55%] top-[-30px]"
      >
        <HeroContent
          headingRef={headingRef}
          subTextRef={subTextRef}
          bioRef={bioRef}
          buttonsRef={buttonsRef}
        />
      </motion.div>

      {/* RIGHT SIDE — IMAGE WITH PARALLAX DEPTH */}
      <motion.div
        style={{ y: imageY, opacity: opacityFade }}
        className="relative z-20 w-full lg:w-[45%] top-[-88px]"
      >
        <HeroImage imageRef={imageRef} />
      </motion.div>

      <SocialSidebar onOpenContact={handleOpenContact} />
    </section>
  );
};

export default Hero;