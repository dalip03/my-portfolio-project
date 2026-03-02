"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    const move = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);

    // Hover scale effect
    const hoverElements = document.querySelectorAll("button, a");

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(follower, { scale: 2, duration: 0.3 });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(follower, { scale: 1, duration: 0.3 });
      });
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      <div className="cursor fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]" />
      <div className="cursor-follower fixed top-0 left-0 w-8 h-8 border border-purple-400 rounded-full pointer-events-none z-[9998]" />
    </>
  );
}