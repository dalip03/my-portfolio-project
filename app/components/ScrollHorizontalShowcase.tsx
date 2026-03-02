"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollHorizontalShowcase({
  children,
}: {
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const totalWidth = trackRef.current!.scrollWidth;
      const viewportWidth = window.innerWidth;

      const scrollTween = gsap.to(trackRef.current, {
        x: () => -(totalWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (trackRef.current!.children.length - 1),
            duration: 0.4,
            ease: "power1.inOut",
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {" "}
      <div
        ref={trackRef}
        className="flex h-full items-center gap-16"
        style={{ width: "max-content" }}
      >
        {children}
      </div>
    </section>
  );
}
