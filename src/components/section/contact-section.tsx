"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { DATA } from "@/data/resume";
import SlideIn from "@/components/slide-in";

const SparkleIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`absolute pointer-events-none text-white/95 select-none animate-sparkle-glow ${className || ""}`}
    style={style}
  >
    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
  </svg>
);

const GridPattern = ({ isHovered }: { isHovered: boolean }) => {
  if (!isHovered) return null;
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0 opacity-20 animate-grid-slide rounded-full"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(147, 197, 253, 0.35) 1.5px, transparent 1.5px),
          linear-gradient(to bottom, rgba(147, 197, 253, 0.35) 1.5px, transparent 1.5px)
        `,
        backgroundSize: '20px 20px',
      }}
    />
  );
};

export default function ContactSection() {
  const originalText = "Let's Connect";
  const [displayText, setDisplayText] = useState(originalText);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chars = "!@#$%^&*()_+~`|}{[]\\:;?><,./-=";

  const startScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    let iteration = 0;
    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      iteration += 1 / 3;
    }, 30);
  };

  const resetText = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(originalText);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-10 md:py-16 overflow-visible select-none">
      {/* Big standalone button slides in */}
      <SlideIn
        inView={true}
        xOffset={0}
        yOffset={45}
        delay={0.12}
        className="relative overflow-visible"
      >
        <div 
          className="relative group/btn-container inline-block overflow-visible"
          onMouseEnter={() => {
            setIsHovered(true);
            startScramble();
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            resetText();
          }}
        >
          {/* Floating Sparkles appear only when hovered */}
          {isHovered && (
            <>
              <SparkleIcon className="left-[-24px] bottom-[-14px] w-5 h-5 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]" style={{ animationDelay: "0s" }} />
              <SparkleIcon className="left-[40px] bottom-[-28px] w-3 h-3 text-sky-100 drop-shadow-[0_0_10px_rgba(186,230,253,0.9)]" style={{ animationDelay: "0.8s" }} />
              <SparkleIcon className="right-[30px] top-[-24px] w-3.5 h-3.5 text-sky-100 drop-shadow-[0_0_10px_rgba(186,230,253,0.9)]" style={{ animationDelay: "1.4s" }} />
              <SparkleIcon className="right-[-20px] bottom-[-10px] w-5 h-5 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]" style={{ animationDelay: "0.4s" }} />
              <SparkleIcon className="left-[15px] top-[-24px] w-2.5 h-2.5 text-sky-200 drop-shadow-[0_0_8px_rgba(186,230,253,0.7)]" style={{ animationDelay: "2.1s" }} />
            </>
          )}

          <Link
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-4 border-2 rounded-full px-10 py-5 sm:px-14 sm:py-6 md:px-16 md:py-7 text-[clamp(1.2rem,4.5vw,2.2rem)] font-bold tracking-wide transition-all duration-300 select-none relative overflow-hidden group/btn ${
              isHovered
                ? "border-sky-300/80 shadow-[0_0_35px_rgba(186,230,253,0.35)] bg-gradient-to-br from-white via-sky-50/90 to-sky-100/80 cursor-pointer text-slate-900"
                : "border-white/95 bg-transparent hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] cursor-pointer text-white"
            }`}
          >
            {/* Background line pattern */}
            <GridPattern isHovered={isHovered} />

            <span className="relative z-10 transition-colors duration-300">
              {displayText}
            </span>
            <span className={`relative z-10 transition-all duration-300 font-sans text-[clamp(1.4rem,5vw,2.5rem)] leading-none ${
              isHovered ? "translate-x-2" : "translate-x-0"
            }`}>
              &rarr;
            </span>
          </Link>
        </div>
      </SlideIn>
    </div>
  );
}
