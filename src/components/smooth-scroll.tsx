"use client";

import Lenis from "lenis";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

/**
 * Lenis drives scroll via requestAnimationFrame, so it tracks the display refresh rate
 * (e.g. 120 Hz on ProMotion / many high-refresh monitors). Skipped when the user
 * prefers reduced motion.
 */
export function SmoothScroll({ children }: Props) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      /** Slightly lower = smoother interpolation on high refresh displays */
      lerp: 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      anchors: true,
      stopInertiaOnNavigate: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
