"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollReveal({ children, className }: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Interpolate values based on scroll progress:
  // - Starts entering from bottom (progress 0)
  // - Fully visible in screen center (progress 0.18 to 0.82)
  // - Starts exiting from top (progress 1)
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.97, 1, 1, 0.97]);
  const y = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [30, 0, 0, -30]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        opacity,
        scale,
        y,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
