"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const HOLLYWOOD_SIGN = [
  { char: "D", left: 12.0, baseHeight: 41.7, rotate: -3 },
  { char: "E", left: 18.3, baseHeight: 41.0, rotate: -1.5 },
  { char: "E", left: 24.6, baseHeight: 29.2, rotate: 2 },
  { char: "P", left: 31.0, baseHeight: 17.2, rotate: 0.5 },
  { char: "A", left: 37.3, baseHeight: 27.3, rotate: -2.5 },
  { char: "K", left: 43.6, baseHeight: 38.4, rotate: -1.5 },
  { char: " ", left: 50.0, baseHeight: 45.0, rotate: 0 },
  { char: "R", left: 56.3, baseHeight: 45.8, rotate: 1.5 },
  { char: "O", left: 62.6, baseHeight: 34.6, rotate: 2.5 },
  { char: "S", left: 69.0, baseHeight: 23.3, rotate: 0.5 },
  { char: "H", left: 75.3, baseHeight: 26.5, rotate: -2 },
  { char: "A", left: 81.6, baseHeight: 35.7, rotate: -1 },
  { char: "N", left: 88.0, baseHeight: 41.8, rotate: 1 },
];

const STATIC_STARS = [
  { top: "12%", left: "15%", delay: "0s", size: "2px" },
  { top: "8%", left: "45%", delay: "0.5s", size: "3px" },
  { top: "25%", left: "30%", delay: "1.2s", size: "1px" },
  { top: "18%", left: "75%", delay: "0.2s", size: "2px" },
  { top: "32%", left: "85%", delay: "1.7s", size: "2px" },
  { top: "15%", left: "60%", delay: "0.8s", size: "1px" },
  { top: "22%", left: "50%", delay: "1.4s", size: "3px" },
  { top: "5%", left: "28%", delay: "0.3s", size: "2px" },
  { top: "28%", left: "10%", delay: "1.1s", size: "2px" },
  { top: "35%", left: "65%", delay: "0.6s", size: "1.2px" },
  { top: "10%", left: "90%", delay: "0.9s", size: "3px" },
  { top: "40%", left: "20%", delay: "1.5s", size: "2px" },
  { top: "15%", left: "8%", delay: "0.4s", size: "1px" },
  { top: "30%", left: "40%", delay: "1.8s", size: "2px" },
  { top: "45%", left: "55%", delay: "1.0s", size: "1.5px" },
  { top: "50%", left: "80%", delay: "1.3s", size: "2px" },
  { top: "20%", left: "95%", delay: "0.7s", size: "1px" },
  { top: "38%", left: "3%", delay: "1.6s", size: "2px" },
];

export default function CosmicBackdrop() {
  const pathname = usePathname();
  const isWorksPage = pathname?.startsWith("/works");

  const { scrollYProgress: windowScroll } = useScroll();
  const fallbackScroll = useMotionValue(0.43);
  const scrollYProgress = isWorksPage ? fallbackScroll : windowScroll;

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent SSR mismatch for theme checks
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Sky layers opacities driven by scroll
  // Layer A: Morning white/blue mixed color
  const opacityMorning = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  // Layer B: Sunset Golden Evening
  const opacityGolden = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [0, 1, 1, 0]);
  // Layer C: Shifting Twilight
  const opacityTwilight = useTransform(scrollYProgress, [0.18, 0.25, 0.40, 0.48], [0, 1, 1, 0]);
  // Layer D: Cosmic Night (Diamond Aesthetic Silver Blue)
  const opacityDiamondBlue = useTransform(scrollYProgress, [0.40, 0.48], [0, 1]);

  // Sun path (rises and sets rapidly at the top, sets completely by scroll 0.24)
  const sunX = useTransform(scrollYProgress, [0, 0.12, 0.24], ["12%", "26%", "40%"]);
  const sunY = useTransform(scrollYProgress, [0, 0.12, 0.24], ["80%", "18%", "85%"]);
  const sunScale = useTransform(scrollYProgress, [0, 0.12, 0.24], [0.8, 1.1, 0.7]);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.20, 0.24], [1, 1, 0]);

  // Moon path (rises during diamond night phase)
  const moonX = useTransform(scrollYProgress, [0.40, 0.60, 1.0], ["82%", "68%", "58%"]);
  const moonY = useTransform(scrollYProgress, [0.40, 0.60, 1.0], ["85%", "25%", "15%"]);
  const moonScale = useTransform(scrollYProgress, [0.40, 0.60, 1.0], [0.75, 1.0, 1.05]);
  const moonOpacity = useTransform(scrollYProgress, [0.40, 0.48], [0, 1]);

  // Staggered multiple comets sequence (starts off-screen at top: -25%)
  const comet1X = useTransform(scrollYProgress, [0.22, 0.24, 0.34, 0.38], ["115%", "95%", "45%", "10%"]);
  const comet1Y = useTransform(scrollYProgress, [0.22, 0.24, 0.34, 0.38], ["-25%", "-5%", "55%", "80%"]);
  const comet1Opacity = useTransform(scrollYProgress, [0.22, 0.235, 0.34, 0.38], [0, 1, 1, 0]);

  const comet2X = useTransform(scrollYProgress, [0.26, 0.28, 0.38, 0.42], ["110%", "90%", "35%", "0%"]);
  const comet2Y = useTransform(scrollYProgress, [0.26, 0.28, 0.38, 0.42], ["-25%", "-5%", "55%", "85%"]);
  const comet2Opacity = useTransform(scrollYProgress, [0.26, 0.275, 0.38, 0.42], [0, 1, 1, 0]);

  const comet3X = useTransform(scrollYProgress, [0.30, 0.32, 0.42, 0.46], ["115%", "95%", "45%", "15%"]);
  const comet3Y = useTransform(scrollYProgress, [0.30, 0.32, 0.42, 0.46], ["-25%", "-5%", "55%", "80%"]);
  const comet3Opacity = useTransform(scrollYProgress, [0.30, 0.315, 0.42, 0.46], [0, 1, 1, 0]);

  const comet4X = useTransform(scrollYProgress, [0.34, 0.36, 0.46, 0.50], ["110%", "90%", "40%", "5%"]);
  const comet4Y = useTransform(scrollYProgress, [0.34, 0.36, 0.46, 0.50], ["-25%", "-5%", "55%", "85%"]);
  const comet4Opacity = useTransform(scrollYProgress, [0.34, 0.355, 0.46, 0.50], [0, 1, 1, 0]);

  const comet5X = useTransform(scrollYProgress, [0.38, 0.40, 0.50, 0.55], ["110%", "90%", "35%", "0%"]);
  const comet5Y = useTransform(scrollYProgress, [0.38, 0.40, 0.50, 0.55], ["-25%", "-5%", "55%", "90%"]);
  const comet5Opacity = useTransform(scrollYProgress, [0.38, 0.395, 0.50, 0.55], [0, 1, 1, 0]);

  // Stars opacity
  const starsOpacity = useTransform(scrollYProgress, [0.22, 0.32], [0, 1]);

  // Parallax mountains vertical movement (drift down slightly, then rise at footer)
  const farMountainsY = useTransform(scrollYProgress, [0, 0.8, 1], [0, 5, -8]);
  const nearMountainsY = useTransform(scrollYProgress, [0, 0.8, 1], [0, 5, -15]);

  const lightsScaleY = useTransform(scrollYProgress, [0.70, 0.92, 1.0], [0, 1, 1]);
  const leftLightOpacity = useTransform(scrollYProgress, [0.70, 0.92, 1.0], [0, 0.90, 0.90]);
  const rightLightOpacity = useTransform(scrollYProgress, [0.70, 0.92, 1.0], [0, 0.85, 0.85]);

  const letterTransforms = HOLLYWOOD_SIGN.map((item, i) => {
    const startScroll = 0.72 + i * 0.012;
    const endScroll = Math.min(startScroll + 0.08, 0.95);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const y = useTransform(scrollYProgress, [0.65, startScroll, endScroll], [300, 300, 0]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const transform = useMotionTemplate`translateX(-50%) rotate(${item.rotate}deg) translateY(${y}px)`;
    return { transform };
  });

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-slate-50 dark:bg-black transition-colors duration-500" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none" aria-hidden="true">
      {/* ── SKY GRADIENT LAYERS ── */}
      {/* Layer A: Morning white/blue mixed color with an atmospheric golden sunset horizon blend at the bottom */}
      <motion.div
        style={{ opacity: opacityMorning }}
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? "bg-gradient-to-b from-[#030712] via-[#09152b] to-[#ff5e36]/20"
            : "bg-gradient-to-b from-white via-sky-50/70 to-[#ffa560]/40"
        }`}
      />

      {/* Layer B: Sunset Golden Evening */}
      <motion.div
        style={{ opacity: opacityGolden }}
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? "bg-gradient-to-b from-[#12072b] via-[#3b0d36]/95 to-[#ff5e36]/30"
            : "bg-gradient-to-b from-[#fdf2e9] via-[#f5d6c6]/85 to-[#ffe5d9]/55"
        }`}
      />

      {/* Layer C: Shifting Twilight */}
      <motion.div
        style={{ opacity: opacityTwilight }}
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? "bg-gradient-to-b from-[#0a0518] via-[#1a0f30]/90 to-[#ff5e36]/10"
            : "bg-gradient-to-b from-[#e0e7ff] via-[#fce7f3] to-[#ffedd5]/60"
        }`}
      />

      {/* Layer D: Cosmic Night (Diamond Aesthetic Silver Blue) */}
      <motion.div
        style={{ opacity: opacityDiamondBlue }}
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark
            ? "bg-gradient-to-b from-[#02050f] via-[#0a1532] to-[#122352]/20"
            : "bg-gradient-to-b from-[#e2eafc] via-[#d7e3fc] to-[#eff2f3]/40"
        }`}
      />

      {/* ── BACKGROUND STARS ── */}
      <motion.div
        style={{ opacity: starsOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        {STATIC_STARS.map((star, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
            className={`rounded-full animate-pulse ${
              isDark ? "bg-blue-100/80 shadow-[0_0_4px_rgba(255,255,255,0.4)]" : "bg-indigo-400/60"
            }`}
          />
        ))}
      </motion.div>

      {/* ── MULTIPLE STAGGERED COMETS ── */}
      {/* Comet 1 */}
      <motion.div
        style={{
          position: "absolute",
          left: comet1X,
          top: comet1Y,
          opacity: comet1Opacity,
          transform: "rotate(-25deg)",
        }}
        className="pointer-events-none"
      >
        <div className="relative w-36 h-[1.5px] pointer-events-none">
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full transition-all duration-700 ${
              isDark ? "bg-white" : "bg-indigo-600"
            }`}
            style={{
              boxShadow: isDark
                ? "0 0 10px 3px rgba(255, 255, 255, 0.95), 0 0 20px 6px rgba(255, 255, 255, 0.6)"
                : "0 0 8px 3px rgba(99, 102, 241, 0.85), 0 0 16px 5px rgba(99, 102, 241, 0.5)",
            }}
          />
          <div
            className={`w-full h-full rounded-full bg-gradient-to-r ${
              isDark ? "from-white via-white/50 to-transparent" : "from-indigo-600 via-indigo-300/50 to-transparent"
            }`}
          />
        </div>
      </motion.div>

      {/* Comet 2 */}
      <motion.div
        style={{
          position: "absolute",
          left: comet2X,
          top: comet2Y,
          opacity: comet2Opacity,
          transform: "rotate(-25deg)",
        }}
        className="pointer-events-none"
      >
        <div className="relative w-32 h-[1.5px] pointer-events-none">
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full transition-all duration-700 ${
              isDark ? "bg-white" : "bg-indigo-600"
            }`}
            style={{
              boxShadow: isDark
                ? "0 0 10px 3px rgba(255, 255, 255, 0.95), 0 0 20px 6px rgba(255, 255, 255, 0.6)"
                : "0 0 8px 3px rgba(99, 102, 241, 0.85), 0 0 16px 5px rgba(99, 102, 241, 0.5)",
            }}
          />
          <div
            className={`w-full h-full rounded-full bg-gradient-to-r ${
              isDark ? "from-white via-white/50 to-transparent" : "from-indigo-600 via-indigo-300/50 to-transparent"
            }`}
          />
        </div>
      </motion.div>

      {/* Comet 3 */}
      <motion.div
        style={{
          position: "absolute",
          left: comet3X,
          top: comet3Y,
          opacity: comet3Opacity,
          transform: "rotate(-25deg)",
        }}
        className="pointer-events-none"
      >
        <div className="relative w-40 h-[1.5px] pointer-events-none">
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full transition-all duration-700 ${
              isDark ? "bg-white" : "bg-indigo-600"
            }`}
            style={{
              boxShadow: isDark
                ? "0 0 10px 3px rgba(255, 255, 255, 0.95), 0 0 20px 6px rgba(255, 255, 255, 0.6)"
                : "0 0 8px 3px rgba(99, 102, 241, 0.85), 0 0 16px 5px rgba(99, 102, 241, 0.5)",
            }}
          />
          <div
            className={`w-full h-full rounded-full bg-gradient-to-r ${
              isDark ? "from-white via-white/50 to-transparent" : "from-indigo-600 via-indigo-300/50 to-transparent"
            }`}
          />
        </div>
      </motion.div>

      {/* Comet 4 */}
      <motion.div
        style={{
          position: "absolute",
          left: comet4X,
          top: comet4Y,
          opacity: comet4Opacity,
          transform: "rotate(-25deg)",
        }}
        className="pointer-events-none"
      >
        <div className="relative w-36 h-[1.5px] pointer-events-none">
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full transition-all duration-700 ${
              isDark ? "bg-white" : "bg-indigo-600"
            }`}
            style={{
              boxShadow: isDark
                ? "0 0 10px 3px rgba(255, 255, 255, 0.95), 0 0 20px 6px rgba(255, 255, 255, 0.6)"
                : "0 0 8px 3px rgba(99, 102, 241, 0.85), 0 0 16px 5px rgba(99, 102, 241, 0.5)",
            }}
          />
          <div
            className={`w-full h-full rounded-full bg-gradient-to-r ${
              isDark ? "from-white via-white/50 to-transparent" : "from-indigo-600 via-indigo-300/50 to-transparent"
            }`}
          />
        </div>
      </motion.div>

      {/* Comet 5 */}
      <motion.div
        style={{
          position: "absolute",
          left: comet5X,
          top: comet5Y,
          opacity: comet5Opacity,
          transform: "rotate(-25deg)",
        }}
        className="pointer-events-none"
      >
        <div className="relative w-28 h-[1.5px] pointer-events-none">
          <div
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full transition-all duration-700 ${
              isDark ? "bg-white" : "bg-indigo-600"
            }`}
            style={{
              boxShadow: isDark
                ? "0 0 10px 3px rgba(255, 255, 255, 0.95), 0 0 20px 6px rgba(255, 255, 255, 0.6)"
                : "0 0 8px 3px rgba(99, 102, 241, 0.85), 0 0 16px 5px rgba(99, 102, 241, 0.5)",
            }}
          />
          <div
            className={`w-full h-full rounded-full bg-gradient-to-r ${
              isDark ? "from-white via-white/50 to-transparent" : "from-indigo-600 via-indigo-300/50 to-transparent"
            }`}
          />
        </div>
      </motion.div>

      {/* The Sun (Rises & Sets with Aesthetic Warm Evening Sunset Look) */}
      <motion.div
        style={{
          position: "absolute",
          left: sunX,
          top: sunY,
          scale: sunScale,
          opacity: sunOpacity,
        }}
        className="pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        {/* Soft evening orange corona glow - larger, more atmospheric blur */}
        <div
          className={`absolute inset-[-30px] rounded-full blur-2xl transition-all duration-700 opacity-80 ${
            isDark ? "bg-orange-500/35" : "bg-amber-400/45"
          }`}
        />
        <div
          className={`w-20 h-20 rounded-full bg-gradient-to-br transition-all duration-700 ${
            isDark
              ? "from-amber-400 via-orange-500 to-rose-600 shadow-[0_0_50px_rgba(249,115,22,0.8),0_0_100px_rgba(239,68,68,0.5)]"
              : "from-amber-300 via-orange-400 to-rose-400 shadow-[0_0_40px_rgba(251,191,36,0.65),0_0_80px_rgba(251,146,60,0.4)]"
          }`}
        />
      </motion.div>

      {/* The Crescent Moon (Diamond Aesthetic Silver Blue Look) */}
      <motion.div
        style={{
          position: "absolute",
          left: moonX,
          top: moonY,
          scale: moonScale,
          opacity: moonOpacity,
        }}
        className="pointer-events-none -translate-x-1/2 -translate-y-1/2"
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 100 100"
          className={`transition-colors duration-700 ${
            isDark
              ? "text-slate-100 drop-shadow-[0_0_22px_rgba(200,225,255,0.85),0_0_45px_rgba(100,160,255,0.45)]"
              : "text-slate-700 drop-shadow-[0_0_15px_rgba(148,163,184,0.45)]"
          }`}
        >
          {/* Earthshine (faint full moon circle backing with diamond glow) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="currentColor"
            className="opacity-[0.04] dark:opacity-[0.06] text-blue-200"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="opacity-[0.08] dark:opacity-[0.12] text-blue-300"
          />
          {/* Glowing Crescent Path (Silver-white Core) */}
          <path
            d="M 50 10 
               A 40 40 0 0 1 90 50 
               A 40 40 0 0 1 50 90 
               A 34 34 0 0 0 78 50 
               A 34 34 0 0 0 50 10 Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      {/* ── MOUNTAIN PARALLAX LAYERS ── */}
      {/* ── SEARCHLIGHTS ── */}
      <motion.div
        style={{ y: nearMountainsY }}
        className="w-screen max-w-[100vw] left-1/2 -translate-x-1/2 absolute bottom-[-60px] overflow-visible flex justify-center items-end h-[30vh] z-15 pointer-events-none"
      >
        <div className="absolute inset-0 overflow-visible pointer-events-none">
          {/* Left Searchlight Beam (Volumetric Cinematic Blue-Cyan) */}
          <motion.div
            className="absolute bottom-0 left-[15.2%] w-[240px] h-[450px] origin-bottom -translate-x-1/2 pointer-events-none"
            style={{
              scaleY: lightsScaleY,
              opacity: leftLightOpacity,
              filter: "blur(3px)",
            }}
          >
            <div
              className="w-full h-full origin-bottom"
              style={{
                background: "linear-gradient(to top, rgba(167, 243, 255, 0.75) 0%, rgba(56, 189, 248, 0.2) 40%, rgba(56, 189, 248, 0.05) 70%, transparent 100%)",
                clipPath: "polygon(50% 100%, 0 0, 100% 0)",
                animation: "searchlight-l 7.5s ease-in-out infinite",
              }}
            />
            {/* Spotlight Base Glow Flare */}
            <div 
              className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-sky-400/80 blur-md"
            />
          </motion.div>
          
          {/* Right Searchlight Beam (Volumetric Cinematic Golden Orange) */}
          <motion.div
            className="absolute bottom-0 left-[86.8%] w-[260px] h-[470px] origin-bottom -translate-x-1/2 pointer-events-none"
            style={{
              scaleY: lightsScaleY,
              opacity: rightLightOpacity,
              filter: "blur(3px)",
            }}
          >
            <div
              className="w-full h-full origin-bottom"
              style={{
                background: "linear-gradient(to top, rgba(254, 240, 138, 0.7) 0%, rgba(251, 146, 60, 0.25) 40%, rgba(251, 146, 60, 0.05) 70%, transparent 100%)",
                clipPath: "polygon(50% 100%, 0 0, 100% 0)",
                animation: "searchlight-r 9.5s ease-in-out infinite",
              }}
            />
            {/* Spotlight Base Glow Flare */}
            <div 
              className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-400/80 blur-md"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* ── GIANT NAME & MOUNTAINS ── */}
      <motion.div
        style={{ y: nearMountainsY }}
        className="w-screen max-w-[100vw] left-1/2 -translate-x-1/2 absolute bottom-[-60px] overflow-hidden flex justify-center items-end h-[30vh] z-30 pointer-events-none"
      >
        {/* Far Mountain Silhouette (Purple) - lowest z-index inside name container */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 300"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="footerFarMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isDark ? "#1a0f30" : "#cbd5e1"} stopOpacity={0.65} />
                <stop offset="100%" stopColor={isDark ? "#090514" : "#f1f5f9"} stopOpacity={0.95} />
              </linearGradient>
            </defs>
            <path
              d="M0 300 L0 180 L180 110 L360 210 L580 90 L850 230 L1100 130 L1280 200 L1440 150 L1440 300 Z"
              fill="url(#footerFarMountainGrad)"
            />
            {/* Far Mountain Rim Light - dual layer stroke for glow */}
            <path
              d="M0 180 L180 110 L360 210 L580 90 L850 230 L1100 130 L1280 200 L1440 150"
              fill="none"
              stroke={isDark ? "#9d4edd" : "#cbd5e1"}
              strokeWidth={3}
              className="opacity-25 blur-[1px]"
            />
            <path
              d="M0 180 L180 110 L360 210 L580 90 L850 230 L1100 130 L1280 200 L1440 150"
              fill="none"
              stroke={isDark ? "#9d4edd" : "#c084fc"}
              strokeWidth={1}
              className="opacity-55"
            />
          </svg>
        </div>

        {/* Letters standing in front of Far Mountain but behind Near Mountain */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {HOLLYWOOD_SIGN.map((item, i) => {
            const bottomPct = item.baseHeight;
            if (item.char === " ") {
              return null;
            }
            return (
              <div
                key={`char-container-${i}`}
                className="absolute top-0 bottom-0 pointer-events-none"
                style={{
                  left: `${item.left}%`,
                  width: "clamp(2rem, 5.5vw, 5rem)",
                }}
              >
                <motion.span
                  className="absolute inline-block text-[clamp(1.5rem,5.5vw,6.5rem)] font-bebas font-bold leading-none uppercase cursor-default select-none origin-bottom pointer-events-auto"
                  style={{
                    bottom: `calc(${bottomPct}% - 4px)`,
                    left: "50%",
                    transform: letterTransforms[i].transform,
                    color: "#ffffff",
                    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))",
                    transition: "transform 0.3s ease-out, filter 0.3s ease-out",
                  }}
                >
                  {item.char}
                </motion.span>
              </div>
            );
          })}
        </div>

        {/* Near Mountain Silhouette (Orange) in front of the letters */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-visible">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 300"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="footerNearMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isDark ? "#0f0724" : "#94a3b8"} stopOpacity={0.9} />
                <stop offset="100%" stopColor={isDark ? "#030308" : "#f8fafc"} stopOpacity={1} />
              </linearGradient>
              <linearGradient id="footerNearRimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isDark ? "#ff8c38" : "#fdb777"} stopOpacity={0.85} />
                <stop offset="100%" stopColor="transparent" stopOpacity={0} />
              </linearGradient>
            </defs>
            <path
              d="M0 300 L0 230 L220 160 L450 250 L750 140 L1020 240 L1250 170 L1440 220 L1440 300 Z"
              fill="url(#footerNearMountainGrad)"
            />
            {/* Near Mountain Rim Light - dual layer stroke for glow */}
            <path
              d="M0 230 L220 160 L450 250 L750 140 L1020 240 L1250 170 L1440 220"
              fill="none"
              stroke="url(#footerNearRimGrad)"
              strokeWidth={5}
              className="opacity-30 blur-[2px]"
            />
            <path
              d="M0 230 L220 160 L450 250 L750 140 L1020 240 L1250 170 L1440 220"
              fill="none"
              stroke="url(#footerNearRimGrad)"
              strokeWidth={1.8}
              className="opacity-95"
            />
          </svg>
        </div>
      </motion.div>

    </div>
  );
}
