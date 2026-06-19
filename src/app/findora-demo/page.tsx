"use client";

import { FindoraAnimation } from "@/components/ProjectAnimations/FindoraAnimation";

export default function FindoraDemoPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#eef2ff] via-[#f8fafc] to-[#eef2ff] p-6 select-none overflow-hidden">
      {/* Decorative premium ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-xl relative z-10">
        <FindoraAnimation />
      </div>
    </div>
  );
}
