"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Sparkles, Cpu, Mail, Search, CheckCircle, Smartphone } from "lucide-react";

export default function TeaserPage() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runTimeline = () => {
      setStep(0);
      const t1 = setTimeout(() => setStep(1), 1800); // Step 1: Upload & Auto-type text
      const t2 = setTimeout(() => setStep(2), 3800); // Step 2: AI Processing (glowing rings)
      const t3 = setTimeout(() => setStep(3), 5800); // Step 3: Match found (badge counts up)
      const t4 = setTimeout(() => setStep(4), 7800); // Step 4: Success alert & branding
      return [t1, t2, t3, t4];
    };

    let timers = runTimeline();

    // Loop the entire sequence infinitely every 10 seconds
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = runTimeline();
    }, 10000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#050508] text-white flex flex-col items-center justify-center font-sans overflow-hidden select-none">
      {/* Grid background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Cinematic ambient glow behind the browser */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      {/* Title Text Banner */}
      <div className="absolute top-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.25em] text-indigo-400 font-semibold mb-3"
        >
          <Sparkles className="size-3 text-indigo-400 animate-pulse" />
          Teaser Demo
        </motion.div>
        
        <h2 className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          {step === 0 && "Step 1: Report Lost Item"}
          {step === 1 && "Step 2: Multimodal Embedding Extraction"}
          {step === 2 && "Step 3: High-Confidence AI Match"}
          {step === 3 && "Step 4: Automated Notification Alert"}
          {step === 4 && "Findora AI"}
        </h2>
        <p className="text-xs text-muted-foreground/80 mt-1 max-w-[280px]">
          {step === 0 && "User submits a lost item with details and photo."}
          {step === 1 && "AI model processes raw features into vector embeddings."}
          {step === 2 && "Real-time fusion scoring indexes matches in DB."}
          {step === 3 && "Instant email matches dispatch automatically."}
          {step === 4 && "Self-Healing Lost & Found system."}
        </p>
      </div>

      {/* Mock Laptop/Browser Shell */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
          scale: step === 1 ? 1.02 : step === 2 ? 1.05 : 1,
          opacity: 1 
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-[90%] max-w-xl h-[320px] rounded-xl border border-white/10 bg-[#0c0d12]/90 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden relative"
      >
        {/* Browser header */}
        <div className="h-8 border-b border-white/5 bg-[#08090d] flex items-center px-4 justify-between shrink-0">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/40" />
            <span className="size-2.5 rounded-full bg-yellow-500/40" />
            <span className="size-2.5 rounded-full bg-green-500/40" />
          </div>
          <div className="px-10 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-white/40 tracking-wider">
            findora.ai/dashboard
          </div>
          <div className="w-10" />
        </div>

        {/* Browser Content */}
        <div className="flex-1 p-5 flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col justify-center items-center gap-4"
              >
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3 w-full max-w-xs">
                  <div className="size-10 bg-indigo-500/20 rounded-md border border-indigo-500/30 flex items-center justify-center">
                    <Smartphone className="size-5 text-indigo-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[11px] font-semibold text-white">iPhone 15 Pro</p>
                    <p className="text-[9px] text-white/50">Coimbatore, India</p>
                  </div>
                  <span className="text-[8px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20">LOST</span>
                </div>

                <div className="w-full max-w-xs text-left text-[9px] font-mono text-indigo-300 bg-black/40 border border-white/5 p-2 rounded">
                  <span>$ reporting lost item...</span>
                  <motion.p
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, ease: "linear" }}
                    className="overflow-hidden whitespace-nowrap border-r border-white/80"
                  >
                    description: "Cracked screen near bottom left"
                  </motion.p>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col justify-center items-center gap-4"
              >
                <div className="relative size-16 flex items-center justify-center">
                  {/* Glowing processing rings */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-indigo-500/40"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border border-dashed border-purple-500/40"
                  />
                  <Cpu className="size-7 text-indigo-400" />
                </div>
                <div className="text-center font-mono text-[9px] text-white/70 space-y-1">
                  <p className="animate-pulse">Analyzing pixel metrics...</p>
                  <p className="text-white/40">Embedding shape: [1, 512]</p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col justify-center items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* Lost Card */}
                  <div className="w-24 bg-white/5 border border-white/10 rounded-md p-2 text-center text-[9px]">
                    <div className="size-6 bg-indigo-500/20 rounded mx-auto mb-1 flex items-center justify-center">
                      <Smartphone className="size-3 text-indigo-400" />
                    </div>
                    <p className="font-semibold truncate">Lost iPhone</p>
                  </div>

                  {/* Connect Ring */}
                  <div className="flex flex-col items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="size-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-[10px] font-bold text-green-400"
                    >
                      98%
                    </motion.div>
                    <span className="text-[7px] text-white/40 mt-1 uppercase tracking-wider">Similarity</span>
                  </div>

                  {/* Found Card */}
                  <div className="w-24 bg-white/5 border border-white/10 rounded-md p-2 text-center text-[9px]">
                    <div className="size-6 bg-green-500/20 rounded mx-auto mb-1 flex items-center justify-center">
                      <Smartphone className="size-3 text-green-400" />
                    </div>
                    <p className="font-semibold truncate">Found Phone</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col justify-center items-center gap-3"
              >
                <div className="size-10 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center">
                  <Mail className="size-5 text-green-400" />
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-semibold text-white">Email dispatch completed</p>
                  <p className="text-[9px] text-white/50 mt-0.5">Alerting owner & reporter immediately</p>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col justify-center items-center gap-2.5"
              >
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-white/70 bg-clip-text text-transparent tracking-tight">
                  FINDORA AI
                </h1>
                <p className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">
                  Zero manual search required
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info banner */}
        <div className="h-6 border-t border-white/5 bg-[#08090d] flex items-center px-4 justify-between text-[8px] text-white/30 tracking-wider shrink-0">
          <span>STATUS: ONLINE</span>
          <span>FUSION MATCH ENGINE V1.0</span>
        </div>
      </motion.div>

      {/* Progress timeline dots */}
      <div className="absolute bottom-10 flex gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              step === i ? "w-6 bg-indigo-500" : "w-1 bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
