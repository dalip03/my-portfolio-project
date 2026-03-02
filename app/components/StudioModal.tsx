"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image: string;
}

export default function StudioModal({
  isOpen,
  onClose,
  title,
  description,
  image,
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const tl = gsap.timeline();

    tl.fromTo(
      modalRef.current,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        ease: "power4.out",
      }
    );

    tl.from(".modal-content > *", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.3");

  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] bg-black text-white flex flex-col"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-white text-xl"
      >
        ✕
      </button>

      {/* Image */}
      <div
        className="h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Content */}
      <div className="modal-content flex-1 px-10 py-16 max-w-5xl">
        <h2 className="text-5xl font-bold mb-8">{title}</h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}