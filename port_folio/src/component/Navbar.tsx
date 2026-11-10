"use client";

import React, { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsGlobeEuropeAfricaFill } from "react-icons/bs";
import gsap from "gsap";
import { useTranslations } from "next-intl";

const Logo = localFont({
  src: "../../Fonts/ThickoDEMO-Regular.ttf",
});

const Navbar = () => {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState("home");

  const cursor = useRef<HTMLDivElement | null>(null);
  const navSection = useRef<HTMLElement | null>(null);

  // 1. Precise Scroll Position Tracker (Sabse reliable method for single-page portfolios)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check on load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const cursorFollower = (e: MouseEvent) => {
      if (!cursor.current) return;
      gsap.to(cursor.current, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", cursorFollower);

    const currentNav = navSection.current;
    const currentCursor = cursor.current;

    const handleMouseEnterNav = () => {
      if (!currentCursor) return;
      gsap.to(currentCursor, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseLeaveNav = () => {
      if (!currentCursor) return;
      gsap.to(currentCursor, { scale: 0, duration: 0.3, ease: "power2.out" });
    };

    const handleHoverBig = () => {
      if (!currentCursor) return;
      gsap.to(currentCursor, { scale: 4.5, duration: 0.3, ease: "power2.out" });
    };

    const handleHoverNormal = () => {
      if (!currentCursor) return;
      gsap.to(currentCursor, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    if (currentNav) {
      currentNav.addEventListener("mouseenter", handleMouseEnterNav);
      currentNav.addEventListener("mouseleave", handleMouseLeaveNav);

      const interactiveElements = currentNav.querySelectorAll(".hover-target");
      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", handleHoverBig);
        element.addEventListener("mouseleave", handleHoverNormal);
      });
    }

    return () => {
      window.removeEventListener("mousemove", cursorFollower);
      if (currentNav) {
        currentNav.removeEventListener("mouseenter", handleMouseEnterNav);
        currentNav.removeEventListener("mouseleave", handleMouseLeaveNav);

        const interactiveElements = currentNav.querySelectorAll(".hover-target");
        interactiveElements.forEach((element) => {
          element.removeEventListener("mouseenter", handleHoverBig);
          element.removeEventListener("mouseleave", handleHoverNormal);
        });
      }
    };
  }, []);

  const switchLanguage = (locale: "en" | "fr") => {
    router.replace(pathname, { locale });
  };

  const navItems = [
    { key: "home", href: "#home" },
    { key: "about", href: "#about" },
    { key: "projects", href: "#projects" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <section ref={navSection} className="relative w-full cursor-default p-4">
      <div
        ref={cursor}
        className="pointer-events-none fixed top-0 left-0 z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-white opacity-60 mix-blend-difference"
      />

      <div className="relative z-20 flex items-center justify-between p-4 text-white">
        <h1
          className={`${Logo.className} hover-target group relative ml-8 inline-block cursor-pointer text-4xl hover:text-white/50`}
        >
          SAHAR FATIMA
          <span className="absolute bottom-[-4px] left-0 h-[3px] w-0 rounded-full bg-white transition-all duration-300 ease-out group-hover:w-full" />
        </h1>

        <nav className="mr-24 flex items-center justify-center gap-12 text-2xl">
          <ul className="flex list-none items-center justify-end gap-8">
            {navItems.map(({ key, href }) => {
              const isActive = activeSection === key;

              return (
                <li key={key}>
                  <Link
                    href={href}
                    // Instant state update on click taake click karte hi underline shift ho jaye
                    onClick={() => setActiveSection(key)}
                    className={`hover-target group relative inline-block py-1 transition-colors ${
                      isActive ? "text-white" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {t(key)}
                    <span
                      className={`absolute bottom-0 left-0 h-[3px] rounded-full bg-white transition-all duration-300 ease-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <DropdownMenu>
            <DropdownMenuTrigger className="hover-target flex items-center justify-center bg-transparent p-0 text-gray-300 hover:text-white">
              <BsGlobeEuropeAfricaFill className="text-4xl transition-transform duration-300" />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => switchLanguage("en")}
                  className="cursor-pointer"
                >
                  English (ENG)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => switchLanguage("fr")}
                  className="cursor-pointer"
                >
                  Français (FR)
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;