"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function DraggableShowcase({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let velocity = 0;
    let x = 0;

    const cards = Array.from(track.children) as HTMLElement[];
    const cardWidth = cards[0]?.offsetWidth || 0;
    const gap = 64; // matches gap-16 (16 * 4px)
    const totalCardWidth = cardWidth + gap;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
      container.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      currentX = e.clientX;
      const delta = currentX - startX;
      velocity = delta;
      startX = currentX;

      x += delta;
      gsap.set(track, { x });
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      container.style.cursor = "grab";

      // Apply inertia
      x += velocity * 8;

      // Snap to nearest card
      const snapIndex = Math.round(-x / totalCardWidth);
      const snapX = -snapIndex * totalCardWidth;

      const maxX = 0;
      const minX = -((cards.length - 1) * totalCardWidth);

      x = clamp(snapX, minX, maxX);

      gsap.to(track, {
        x,
        duration: 0.8,
        ease: "power4.out",
      });
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden cursor-grab select-none"
    >
      <div
        ref={trackRef}
        className="flex gap-16 will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}