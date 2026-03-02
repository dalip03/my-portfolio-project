"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    title: "Frontend Engineering",
    items: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP"],
  },
  {
    title: "Backend Systems",
    items: ["Spring Boot", "Node.js", "REST APIs", "JWT Auth"],
  },
  {
    title: "Database & Infra",
    items: ["PostgreSQL", "MongoDB", "Docker"],
  },
  {
    title: "Product Thinking",
    items: ["UI Architecture", "Performance", "Scalability"],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (!sectionRef.current) return;

  const ctx = gsap.context(() => {
    const boxes = gsap.utils.toArray<HTMLElement>(".skill-box");

    gsap.fromTo(
      boxes,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // more reliable
          toggleActions: "play none none reverse",
        },
      }
    );
  }, sectionRef);

  ScrollTrigger.refresh(); // important when using pinned sections

  return () => ctx.revert();
}, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-32 bg-[#0A0A0F]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-[clamp(36px,5vw,72px)] font-bold text-white mb-16 md:mb-20">
          Expertise
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {skills.map((group, index) => (
            <div
              key={index}
              className="skill-box p-8 md:p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition duration-300"
            >
              <h3 className="text-lg md:text-xl font-semibold text-purple-400 mb-5">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {group.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 text-sm rounded-full bg-white/10 text-gray-300 hover:bg-purple-500/20 transition"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}