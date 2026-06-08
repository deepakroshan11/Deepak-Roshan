"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  glitterDelay: number;
  glitterDuration: number;
}

// Pre-seeded stars to avoid hydration mismatch
const STARS: Star[] = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: ((i * 41 + 7)  % 97) + 1.5,
  y: ((i * 59 + 13) % 92) + 3,
  size: (i % 3 === 0) ? 3.5 : (i % 3 === 1) ? 2.5 : 1.8,
  baseOpacity: ((i % 7) * 0.08 + 0.35),
  glitterDelay: (i % 9) * 0.45,
  glitterDuration: 1.2 + (i % 5) * 0.4,
}));

// Comets stream from various top positions, aimed diagonally toward DEEPAK ROSHAN
const COMETS = [
  { id: 1, x: 8,  delay: 0.3, dur: 4.5, angle: 65 },
  { id: 2, x: 25, delay: 1.8, dur: 5.0, angle: 72 },
  { id: 3, x: 55, delay: 3.5, dur: 4.8, angle: 58 },
  { id: 4, x: 75, delay: 5.2, dur: 5.2, angle: 48 },
  { id: 5, x: 90, delay: 7.0, dur: 4.6, angle: 40 },
];

export default function Footer() {
  const socials = [
    { name: "LinkedIn", url: DATA.contact.social.LinkedIn.url, icon: Icons.linkedin },
    { name: "GitHub",   url: DATA.contact.social.GitHub.url,   icon: Icons.github   },
    { name: "YouTube",  url: DATA.contact.social.YouTube.url,  icon: Icons.youtube  },
    { name: "Email",    url: DATA.contact.social.email.url,    icon: Icons.email    },
  ];

  const [isHovered, setIsHovered] = useState(false);

  // Measure where the curved divider sits within the footer
  const footerRef = useRef<HTMLElement>(null);
  const curveRef  = useRef<HTMLDivElement>(null);
  const [curveY, setCurveY] = useState(90);

  useEffect(() => {
    function measure() {
      if (!footerRef.current || !curveRef.current) return;
      const fRect = footerRef.current.getBoundingClientRect();
      const cRect = curveRef.current.getBoundingClientRect();
      setCurveY(Math.round(cRect.top - fRect.top));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ── Clip-path: wave/sunrise elliptical expansion from the curve line ──
  const idleClip  = `ellipse(0% 0% at 50% ${curveY}px)`;
  const hoverClip = `ellipse(200% 200% at 50% ${curveY}px)`;

  return (
    <footer
      ref={footerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full mt-2 relative overflow-visible flex flex-col gap-4 select-none pt-6 pb-2"
    >
      {/* ════════════════════════════════════════════════════════
          BACKGROUND OVERLAY  — expands downward from the curve
          Gradient: silver-grey at top → deep navy at bottom
          ════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 bottom-[-14rem] sm:bottom-[-12.5rem] md:bottom-[-13rem] left-1/2 -translate-x-1/2 w-screen max-w-[100vw] overflow-hidden z-0"
      >
        {/* ── Main gradient layer ── */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg,
              #b8bfc8 0%,
              #8a96a8 12%,
              #5a6680 26%,
              #2c3d62 44%,
              #162040 62%,
              #0c1530 80%,
              #070d20 100%
            )`,
            clipPath: isHovered ? hoverClip : idleClip,
            transition: "clip-path 0.5s ease-out",
          }}
        />

        {/* ── Subtle atmospheric depth layers (inside the gradient) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 30% at 50% 100%, rgba(10,20,60,0.6) 0%, transparent 70%)`,
            clipPath: isHovered ? hoverClip : idleClip,
            transition: "clip-path 0.5s ease-out",
          }}
        />

        {/* ── GLITTERING STARS ── */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: isHovered ? hoverClip : idleClip,
            transition: "clip-path 0.5s ease-out",
          }}
        >
          {STARS.map((s) => (
            <div
              key={s.id}
              className="footer-star absolute rounded-full"
              style={{
                left: `${s.x}%`,
                top:  `${s.y}%`,
                width:  `${s.size}px`,
                height: `${s.size}px`,
                background: `radial-gradient(circle at 32% 28%,
                  #ffffff 0%,
                  rgba(220,230,255,0.9) 40%,
                  rgba(160,185,240,0.5) 70%,
                  transparent 100%
                )`,
                animationDuration:  `${s.glitterDuration}s`,
                animationDelay:     `${s.glitterDelay}s`,
              }}
            />
          ))}
        </div>

        {/* ── COMETS — streak top-to-bottom toward DEEPAK ROSHAN ── */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: isHovered ? hoverClip : idleClip,
            transition: "clip-path 0.5s ease-out",
          }}
        >
          {isHovered && COMETS.map((c) => (
            <div
              key={c.id}
              className="footer-comet-down absolute"
              style={{
                left: `${c.x}%`,
                top: "0",
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.dur}s`,
                "--comet-angle": `${c.angle}deg`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* ── CURVED DIVIDER (visible trigger line) ── */}
      <div
        ref={curveRef}
        className="relative w-full h-[1px] overflow-visible my-4 z-10"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[160%] aspect-[21/9] rounded-[100%] border-t pointer-events-none"
          style={{
            borderColor: isHovered ? "rgba(180,195,220,0.25)" : "rgba(148,163,184,0.35)",
            transition: "border-color 0.7s",
          }}
        />
      </div>

      {/* ── WARNING TEXT ── */}
      <div className={cn(
        "text-center w-full max-w-md mx-auto px-4 text-[11px] leading-relaxed italic mt-2 z-10 transition-colors duration-700",
        isHovered ? "text-slate-300/70" : "text-muted-foreground/60"
      )}>
        Warning: Collaborating with me might result in an overload of intelligent code,
        scalable models, and cloud-native systems. Please proceed with caution.
      </div>

      {/* ── SOCIALS ROW ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 px-1 mt-4 z-10">
        <div className="flex flex-col gap-2">
          <span className={cn(
            "text-[10px] uppercase tracking-widest font-mono transition-colors duration-700",
            isHovered ? "text-slate-400/80" : "text-muted-foreground"
          )}>
            Find me at:
          </span>
          <div className="flex items-center gap-3.5">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                  aria-label={social.name}
                  className={cn(
                    "transition-all duration-700 hover:scale-110 active:scale-95",
                    isHovered ? "text-slate-300/80 hover:text-white" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="size-5" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:items-end text-left sm:text-right max-w-xs sm:max-w-md">
          <p className={cn(
            "text-xs leading-relaxed transition-colors duration-700",
            isHovered ? "text-slate-400/70" : "text-muted-foreground"
          )}>
            Thank you for visiting my portfolio!
          </p>
          <p className={cn(
            "text-[11px] mt-1 font-medium tracking-wide transition-colors duration-700",
            isHovered ? "text-slate-100/80" : "text-slate-900 dark:text-white/80"
          )}>
            It has been Designed &amp; Developed by me with Love &lt;3
          </p>
        </div>
      </div>

      {/* ── GIANT NAME ── */}
      <div
        className="w-screen max-w-[100vw] left-1/2 -translate-x-1/2 relative text-center mt-8 pt-4 pb-2 border-t overflow-visible flex justify-center z-10"
        style={{
          borderColor: isHovered ? "rgba(160,175,200,0.15)" : "rgba(226,232,240,0.8)",
          transition: "border-color 0.7s",
        }}
      >
        <div className="flex justify-between select-none w-full max-w-7xl px-8 sm:px-16 md:px-24 lg:px-32 overflow-visible">
          {/* DEEPAK */}
          <div className="flex justify-between w-full max-w-[43%] overflow-visible">
            {"DEEPAK".split("").map((char, i) => (
              <span
                key={`d-${i}`}
                className="inline-block text-[clamp(2rem,7.5vw,5rem)] font-syne font-extrabold select-none leading-none cursor-pointer origin-center"
                style={{
                  // Normal: dark navy. Hover: warm off-white (cream), NOT gold
                  color: isHovered ? "#edeae4" : "rgb(15,23,42)",
                  transition: `color 0.6s ease ${i * 55}ms`,
                }}
                onMouseEnter={e => {
                  // Individual letter hover → slightly brighter off-white
                  (e.currentTarget as HTMLElement).style.color = "#f5f2ec";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.15) translateY(-8px)";
                  (e.currentTarget as HTMLElement).style.transition = "transform 0.22s ease, color 0.15s ease";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = isHovered ? "#edeae4" : "rgb(15,23,42)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1) translateY(0)";
                  (e.currentTarget as HTMLElement).style.transition = `transform 0.35s ease, color 0.5s ease ${i * 55}ms`;
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* ROSHAN */}
          <div className="flex justify-between w-full max-w-[49%] overflow-visible">
            {"ROSHAN".split("").map((char, i) => (
              <span
                key={`r-${i}`}
                className="inline-block text-[clamp(2rem,7.5vw,5rem)] font-syne font-extrabold select-none leading-none cursor-pointer origin-center"
                style={{
                  color: isHovered ? "#edeae4" : "rgb(15,23,42)",
                  transition: `color 0.6s ease ${(i + 6) * 55}ms`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "#f5f2ec";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.15) translateY(-8px)";
                  (e.currentTarget as HTMLElement).style.transition = "transform 0.22s ease, color 0.15s ease";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = isHovered ? "#edeae4" : "rgb(15,23,42)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1) translateY(0)";
                  (e.currentTarget as HTMLElement).style.transition = `transform 0.35s ease, color 0.5s ease ${(i + 6) * 55}ms`;
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
