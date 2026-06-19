"use client";

import { motion, Variants } from "motion/react";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";

export default function Footer() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <footer className="w-screen left-1/2 -translate-x-1/2 relative mt-16 select-none overflow-hidden flex flex-col items-center">
      {/* Content wrapper with layout width max-w-6xl to move text towards corners comfortably */}
      <div className="w-full max-w-6xl px-8 sm:px-12 md:px-16 relative">
        {/* Curved glowing white top boundary line with proper curvature */}
        <div className="w-full relative pointer-events-none" style={{ height: "120px" }}>
          <svg
            viewBox="0 0 1152 120"
            preserveAspectRatio="none"
            className="w-full h-full text-white/20"
          >
            {/* Main glowing white curve with faded ends */}
            <motion.path
              d="M0,115 C288,10 864,10 1152,115"
              fill="none"
              stroke="url(#footerCurveGlow)"
              strokeWidth="1.0"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.95 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,115 C288,10 864,10 1152,115"
              fill="none"
              stroke="url(#footerCurveGlow)"
              strokeWidth="2.8"
              className="blur-[1.5px]"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.85 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.15 }}
            />
            <defs>
              <linearGradient id="footerCurveGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="15%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="85%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Scroll Reveal animated footer content - pt-6 pushes the content below the 120px curve container */}
        <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pt-6 pb-12 px-2">
          {/* Left Side: Find me at */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-40px" }}
            variants={containerVariants}
            className="flex flex-col items-center sm:items-start"
          >
            <motion.span
              variants={itemVariants}
              className="text-xs font-semibold tracking-wider text-muted-foreground/80 uppercase mb-3.5"
            >
              Find me at:
            </motion.span>
            <div className="flex items-center gap-5">
              <motion.a
                variants={itemVariants}
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/75 hover:text-sky-400 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Icons.linkedin className="size-5" />
              </motion.a>
              <motion.a
                variants={itemVariants}
                href={DATA.contact.social.GitHub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/75 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300 transform hover:scale-110"
                aria-label="GitHub"
              >
                <Icons.github className="size-5" />
              </motion.a>
              <motion.a
                variants={itemVariants}
                href="https://huggingface.co/deepakroshan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/75 hover:text-yellow-400 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] transition-all duration-300 transform hover:scale-110"
                aria-label="Hugging Face"
              >
                <Icons.huggingface className="size-5.5" />
              </motion.a>
              <motion.a
                variants={itemVariants}
                href={DATA.contact.social.YouTube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/75 hover:text-red-500 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-all duration-300 transform hover:scale-110"
                aria-label="YouTube"
              >
                <Icons.youtube className="size-5.5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side: Designed & Developed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
            className="flex flex-col items-center sm:items-end text-center sm:text-right gap-1 md:gap-1.5"
          >
            <p className="text-xs md:text-sm font-medium text-muted-foreground/80 tracking-wide">
              Thankyou for visiting my portfolio!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Spacer to reserve height in the scrollable document flow */}
      <div className="w-full h-[24vh] pointer-events-none" />
    </footer>
  );
}
