/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type HackathonLogoProps = {
  src: string;
  /** Used for accessible fallback when the image fails; heading already states the event name. */
  eventName: string;
  className?: string;
};

/** Matches `LogoImage` in work-section.tsx (32px / 40px) so hackathon marks align visually. */
const imgClass =
  "size-8 shrink-0 rounded-full border border-border p-1 shadow ring-2 ring-border overflow-hidden object-contain md:size-10";

/**
 * Hackathon organiser mark in a circle. Decorative when the title appears next to it (`alt=""`).
 */
export function HackathonLogo({ src, eventName, className }: HackathonLogoProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted p-1 shadow ring-2 ring-border md:size-10",
          className
        )}
        role="img"
        aria-label={
          eventName ? `Organiser mark: ${eventName}` : "Hackathon organiser mark"
        }
      >
        <Trophy className="size-3.5 text-muted-foreground md:size-4" strokeWidth={1.75} aria-hidden />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden
      className={cn(imgClass, className)}
      onError={() => setFailed(true)}
    />
  );
}
