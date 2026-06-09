"use client";

import { motion, useInView, Variants } from "motion/react";
import { useRef } from "react";

interface SlideInProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  xOffset?: number;
  yOffset?: number;
  inView?: boolean;
}

export default function SlideIn({
  children,
  className,
  duration = 0.5,
  delay = 0,
  xOffset = 80,
  yOffset = 0,
  inView = true,
}: SlideInProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, {
    once: true,
    margin: "-50px",
  });
  const isInView = !inView || inViewResult;

  const variants: Variants = {
    hidden: { x: -xOffset, y: -yOffset, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: [0.16, 1, 0.3, 1], // Smooth easeOutExpo curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
