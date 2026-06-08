"use client";

import BlurFade from "@/components/magicui/blur-fade";

interface SectionDividerProps {
  delay?: number;
}

export default function SectionDivider({ delay = 0 }: SectionDividerProps) {
  return (
    <BlurFade delay={delay} inView={true} xOffset={40} yOffset={0}>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent my-1.5 select-none" aria-hidden="true" />
    </BlurFade>
  );
}
