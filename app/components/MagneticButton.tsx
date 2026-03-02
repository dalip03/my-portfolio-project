"use client";

import { useRef } from "react";
import gsap from "gsap";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;

    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold transition ${className}`}
    >
      {children}
    </button>
  );
}