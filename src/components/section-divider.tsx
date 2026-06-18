"use client";

import SlideIn from "@/components/slide-in";

interface SectionDividerProps {
  delay?: number;
  className?: string;
}

export default function SectionDivider({ delay = 0, className }: SectionDividerProps) {
  return (
    <SlideIn delay={delay} inView={true} xOffset={80} className={className}>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent my-1.5 select-none" aria-hidden="true" />
    </SlideIn>
  );
}
