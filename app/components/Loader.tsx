"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setLoading(false),
    });

    tl.from(".loader-text span", {
      y: 120,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
    })
      .to(".loader", {
        y: "-100%",
        duration: 1.2,
        delay: 0.5,
        ease: "power4.inOut",
      });
  }, []);

  if (!loading) return null;

  const text = "Dalip Kumar - Developer";

  return (
    <div className="loader fixed inset-0 bg-black z-[99999] flex items-center justify-center">
      <h1 className="loader-text text-5xl font-extrabold text-white overflow-hidden">
        {text.split("").map((char, index) => (
          <span key={index} className="inline-block">
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}