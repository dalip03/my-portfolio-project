"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function MouseGlow() {
  useEffect(() => {
    const glow = document.querySelector(".mouse-glow");

    const move = (e: MouseEvent) => {
      gsap.to(glow, {
        x: e.clientX - 200,
        y: e.clientY - 200,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div className="mouse-glow fixed w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none z-0" />
  );
}