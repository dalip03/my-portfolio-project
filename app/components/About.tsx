"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const totalWidth = containerRef.current!.scrollWidth;

      const scrollTween = gsap.to(containerRef.current, {
        x: () => -(totalWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Fade in panels correctly
      gsap.utils.toArray<HTMLElement>(".panel").forEach((panel) => {
        gsap.from(panel, {
          opacity: 0,
          y: 60,
          duration: 1,
          scrollTrigger: {
            trigger: panel,
            start: "left center",
            containerAnimation: scrollTween,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#0A0A0F]"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-gradient z-0" />

      {/* Glow Layers */}
      <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[160px] z-0" />
      <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[160px] z-0" />

      {/* Huge Faint Text (behind everything) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[15vw] font-black text-white/5 tracking-widest">
          ABOUT
        </h1>
      </div>

      {/* Horizontal Container */}
      <div
        ref={containerRef}
        className="flex h-full items-center relative z-10"
        style={{ width: "300vw" }}
      >
        {/* Panel 1 */}
        <div className="panel w-screen px-24">
          <h2 className="text-7xl font-extrabold mb-8 text-white">
            Who I Am
          </h2>
          <p className="text-2xl text-gray-300 max-w-2xl leading-relaxed">
            I am a full stack developer building scalable digital products
            with clean architecture and immersive motion experiences.
          </p>
        </div>

        {/* Panel 2 */}
        <div className="panel w-screen px-24">
          <h2 className="text-7xl font-extrabold mb-8 text-white">
            What I Do
          </h2>
          <p className="text-2xl text-gray-300 max-w-2xl leading-relaxed">
            I specialize in Next.js, GSAP animations, scalable APIs,
            and high-performance web applications.
          </p>
        </div>

        {/* Panel 3 */}
        <div className="panel w-screen px-24">
          <h2 className="text-7xl font-extrabold mb-8 text-white">
            Why Work With Me
          </h2>
          <p className="text-2xl text-gray-300 max-w-2xl leading-relaxed">
            I combine engineering precision with creative storytelling
            through motion design to build unforgettable digital experiences.
          </p>
        </div>
      </div>
    </section>
  );
}