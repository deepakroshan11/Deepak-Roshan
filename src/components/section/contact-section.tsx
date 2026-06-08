"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import ParenthesesParticles from "@/components/parentheses-particles";
import InfinityParticles from "@/components/infinity-particles";

export default function ContactSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="relative w-full">
      {/* Floating Parentheses Particles in the Left Margin */}
      <div className="absolute left-[-310px] top-1/2 -translate-y-1/2 w-[280px] h-[300px] hidden xl:block pointer-events-auto">
        <ParenthesesParticles isGathered={isHovered || isClicked} />
      </div>

      {/* Floating Infinity Particles in the Right Margin */}
      <div className="absolute right-[-310px] top-1/2 -translate-y-1/2 w-[280px] h-[300px] hidden xl:block pointer-events-auto">
        <InfinityParticles isGathered={isHovered || isClicked} />
      </div>

      <div
        className="relative w-full border rounded-xl p-5 sm:p-8 md:p-10 cursor-pointer select-none transition-all duration-300 hover:border-primary/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsClicked((prev) => !prev)}
      >
        <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
          <span className="text-background text-sm font-medium">Contact</span>
        </div>
        <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={2}
            gridGap={2}
            style={{
              maskImage: "linear-gradient(to bottom, black, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          />
        </div>
        <div className="relative flex flex-col items-center gap-4 text-center">
          <h2 className="text-[clamp(1.5rem,5vw+0.75rem,2.25rem)] font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Get in Touch
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground text-balance text-sm sm:text-base px-1">
            Want to chat? Send a note on{" "}
            <Link
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              onClick={(e) => {
                // Prevent card click toggling when clicking the link
                e.stopPropagation();
              }}
            >
              LinkedIn
            </Link>{" "}
            with a direct question and I&apos;ll respond whenever I can. I will
            ignore all soliciting.
          </p>
        </div>
      </div>
    </div>
  );
}
