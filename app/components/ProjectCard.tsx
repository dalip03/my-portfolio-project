"use client";

import Image from "next/image";

interface Props {
  index: number;
  title: string;
  description: string;
  tech: string;
  role?: string;
  highlights?: string[];
  image: string;
  liveUrl: string;
  githubUrl?: string;
}

export default function FeaturedProject({
  index,
  title,
  description,
  tech,
  role,
  highlights,
  image,
  liveUrl,
  githubUrl,
}: Props) {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

      {/* BIG INDEX */}
      <div className="absolute left-0 top-0 text-[8rem] md:text-[12rem] font-black text-white/5 select-none pointer-events-none">
        {String(index).padStart(2, "0")}
      </div>

      {/* TEXT SIDE */}
      <div className="relative z-10 space-y-6">
        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          {title}
        </h3>

        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
          {description}
        </p>

        {role && (
          <p className="text-sm text-purple-400">
            <span className="text-white font-semibold">Role:</span> {role}
          </p>
        )}

        <p className="text-sm text-gray-500">
          <span className="text-white font-semibold">Tech:</span> {tech}
        </p>

        {highlights && (
          <ul className="space-y-2 text-gray-400 text-sm">
            {highlights.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-4 pt-6">
          <a
            href={liveUrl}
            target="_blank"
            className="px-6 py-3 bg-white text-black rounded-full font-medium hover:scale-105 transition"
          >
            View Live →
          </a>

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              className="px-6 py-3 border border-white/20 rounded-full text-white hover:bg-white/10 transition"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* IMAGE SIDE */}
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden ">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}