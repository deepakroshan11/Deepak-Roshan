"use client";

import Lenis from "lenis";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

/**
 * Lenis drives scroll via requestAnimationFrame, so it tracks the display refresh rate.
 * Mobile tuning: touchMultiplier lower for more natural feel, syncTouchLerp reduced for smoother inertia.
 */
export function SmoothScroll({ children }: Props) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      /** Slightly lower = smoother interpolation on high refresh displays */
      lerp: 0.085,
      wheelMultiplier: 1,
      touchMultiplier: isMobile ? 0.65 : 1,
      syncTouch: true,
      syncTouchLerp: isMobile ? 0.05 : 0.075,
      anchors: true,
      stopInertiaOnNavigate: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
