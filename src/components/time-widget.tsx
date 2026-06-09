"use client";

import { useEffect, useState } from "react";

export function TimeWidget() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return null;

  // Format time in 24h format for Asia/Kolkata (IST)
  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });

  // Format date (TUE • 09 JUN 2026)
  const dayOfWeek = time.toLocaleDateString("en-US", { weekday: "short", timeZone: "Asia/Kolkata" }).toUpperCase();
  const dayNum = time.toLocaleDateString("en-US", { day: "2-digit", timeZone: "Asia/Kolkata" });
  const monthStr = time.toLocaleDateString("en-US", { month: "short", timeZone: "Asia/Kolkata" }).toUpperCase();
  const yearStr = time.toLocaleDateString("en-US", { year: "numeric", timeZone: "Asia/Kolkata" });
  const dateStr = `${dayOfWeek} • ${dayNum} ${monthStr} ${yearStr}`;

  return (
    <div className="absolute top-4 left-4 md:fixed md:top-6 md:left-8 z-50 flex items-center gap-2 select-none pointer-events-none animate-in fade-in duration-500">
      <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] animate-pulse shadow-[0_0_8px_rgba(200,169,110,0.8)]" />
      <div className="flex flex-col gap-0.5 font-mono text-left leading-none">
        <span className="text-[9px] tracking-[0.2em] text-muted-foreground">• IST</span>
        <span className="text-sm font-semibold tracking-wider text-foreground/90 my-0.5">{timeStr}</span>
        <span className="text-[9px] tracking-[0.15em] text-muted-foreground">{dateStr}</span>
      </div>
    </div>
  );
}
