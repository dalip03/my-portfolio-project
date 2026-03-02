"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Understanding business goals, user needs, and technical constraints.",
  },
  {
    number: "02",
    title: "Architecture",
    description:
      "Designing scalable system structure and clean frontend architecture.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "Building performant, maintainable, and scalable applications.",
  },
  {
    number: "04",
    title: "Optimization",
    description:
      "Performance tuning, UX polish, and production deployment.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    gsap.from(".process-item", {
      opacity: 0,
      y: 80,
      stagger: 0.2,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[#0A0A0F]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-[clamp(36px,5vw,72px)] font-bold text-white mb-24">
          Process
        </h2>

        <div className="space-y-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="process-item grid md:grid-cols-[120px_1fr] gap-10 items-start"
            >
              <div className="text-[3rem] font-black text-white/10">
                {step.number}
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {step.title}
                </h3>

                <p className="text-gray-400 leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}