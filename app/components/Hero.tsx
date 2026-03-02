"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WebGLBackground from "./WebGLBackground";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

 useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  if (!titleRef.current) return;

  const letters = titleRef.current.querySelectorAll(".letter");

  // Letter reveal
  gsap.fromTo(
    letters,
    { y: 120, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      ease: "power4.out",
    }
  );

  if (subtitleRef.current) {
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        delay: 1,
        duration: 1,
        ease: "power3.out",
      }
    );
  }

  if (sectionRef.current) {
   gsap.to(sectionRef.current, {
  opacity: 0,
  scale: 0.9,
  filter: "blur(10px)",
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});
  }
}, []);
  const text = "DIGITAL EXPERIENCES.";

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden text-center"
    >
        <WebGLBackground />
      {/* Glow Background */}
      <div className="absolute w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[180px] animate-pulse" />

      <h1
        ref={titleRef}
        className="text-[7vw] font-extrabold leading-tight"
      >
        {text.split("").map((char, index) => (
          <span key={index} className="letter inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      <p
        ref={subtitleRef}
        className="mt-6 text-lg text-gray-400 tracking-wide"
      >
        Full Stack Developer • React • Next.js • GSAP
      </p>
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-b from-transparent to-[#0A0A0F]" />
    </section>
  );
}