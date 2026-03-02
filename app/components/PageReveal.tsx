"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function PageReveal() {
  useEffect(() => {
    gsap.fromTo(
      ".page-reveal",
      { y: "0%" },
      {
        y: "-100%",
        duration: 1.2,
        ease: "power4.inOut",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <div className="page-reveal fixed inset-0 bg-black z-[99998]" />
  );
}