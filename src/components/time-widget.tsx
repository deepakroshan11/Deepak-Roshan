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

  // Format date (Tue 09 Jun)
  const dayOfWeek = time.toLocaleDateString("en-US", { weekday: "short", timeZone: "Asia/Kolkata" });
  const dayNum = time.toLocaleDateString("en-US", { day: "2-digit", timeZone: "Asia/Kolkata" });
  const monthStr = time.toLocaleDateString("en-US", { month: "short", timeZone: "Asia/Kolkata" });

  return (
    <div className="absolute top-4 left-4 md:fixed md:top-6 md:left-8 z-50 flex items-center gap-2 bg-transparent select-none pointer-events-auto cursor-default transition-all duration-500 ease-in-out hover:scale-[1.03] animate-in fade-in duration-500">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c8a96e] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c8a96e] shadow-[0_0_8px_rgba(200,169,110,0.8)]"></span>
      </div>
      <div className="flex items-center gap-2 font-mono text-[10px] leading-none">
        <span className="font-extrabold tracking-wider text-slate-700 dark:text-slate-300 transition-colors duration-300">{timeStr}</span>
        <span className="text-slate-400 dark:text-slate-600 font-extrabold">·</span>
        <span className="text-slate-600 dark:text-slate-400 font-bold tracking-wide transition-colors duration-300">{dayOfWeek} {dayNum} {monthStr}</span>
        <span className="text-slate-400 dark:text-slate-600 font-extrabold">·</span>
        <span className="text-[9px] tracking-widest text-slate-500 dark:text-slate-500 font-extrabold transition-colors duration-300">IST</span>
      </div>
    </div>
  );
}
