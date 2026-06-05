"use client";

import { cn } from "@/lib/utils";
import { motion, type MotionValue, useMotionValue, useSpring, useTransform } from "motion/react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

interface DockProps {
  className?: string;
  children: ReactNode;
  magnification?: number;
  distance?: number;
}

interface DockIconProps {
  className?: string;
  children?: ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 100;
const BASE_SIZE = 40;
const BASE_ICON_SIZE = 20;
const ICON_SIZE_RATIO = 0.5;
const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

interface DockContextValue {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
  coarsePointer: boolean;
}

const DockContext = createContext<DockContextValue | null>(null);

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return coarse;
}

const Dock = ({ className, children, magnification = DEFAULT_MAGNIFICATION, distance = DEFAULT_DISTANCE }: DockProps) => {
  const mouseX = useMotionValue(Infinity);
  const coarsePointer = useCoarsePointer();

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance, coarsePointer }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto flex h-full w-max justify-center overflow-visible rounded-full border",
          coarsePointer ? "items-center" : "items-end",
          className
        )}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
};

const DockIconStatic = ({ className, children }: DockIconProps) => {
  return (
    <div
      className={cn(
        "relative flex aspect-square shrink-0 items-center justify-center rounded-full",
        /* 44px minimum touch target (WCAG / platform guidelines) */
        "h-11 w-11 sm:h-10 sm:w-10",
        className
      )}
    >
      <div className="flex h-6 w-6 items-center justify-center sm:h-5 sm:w-5">{children}</div>
    </div>
  );
};

const DockIconInteractive = ({ className, children }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(DockContext);

  if (!context) {
    throw new Error("DockIcon must be used within a Dock component");
  }

  const { mouseX, magnification, distance } = context;

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const containerSize = useSpring(
    useTransform(distanceCalc, [-distance, 0, distance], [BASE_SIZE, magnification, BASE_SIZE]),
    SPRING
  );
  const iconSize = useSpring(
    useTransform(distanceCalc, [-distance, 0, distance], [BASE_ICON_SIZE, magnification * ICON_SIZE_RATIO, BASE_ICON_SIZE]),
    SPRING
  );

  return (
    <motion.div
      ref={ref}
      style={{ width: containerSize, height: containerSize }}
      className={cn("relative flex aspect-square items-center justify-center rounded-full shrink-0", className)}
    >
      <motion.div
        style={{ width: iconSize, height: iconSize }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const DockIcon = ({ className, children }: DockIconProps) => {
  const context = useContext(DockContext);

  if (!context) {
    throw new Error("DockIcon must be used within a Dock component");
  }

  if (context.coarsePointer) {
    return (
      <DockIconStatic className={className}>
        {children}
      </DockIconStatic>
    );
  }

  return (
    <DockIconInteractive className={className}>
      {children}
    </DockIconInteractive>
  );
};

export { Dock, DockIcon };
export type { DockProps, DockIconProps };
