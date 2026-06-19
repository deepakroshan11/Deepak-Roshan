"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Cpu, Mail, Smartphone } from "lucide-react";

export const FindoraAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runTimeline = () => {
      setStep(0);
      const t1 = setTimeout(() => setStep(1), 2200); // Step 1: Processing
      const t2 = setTimeout(() => setStep(2), 4400); // Step 2: Matching
      const t3 = setTimeout(() => setStep(3), 6600); // Step 3: Alert
      const t4 = setTimeout(() => setStep(4), 8800); // Step 4: Final logo screen
      return [t1, t2, t3, t4];
    };

    let timers = runTimeline();

    // Loop the entire 11-second teaser sequence infinitely
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = runTimeline();
    }, 11000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto py-4 font-sans select-none overflow-hidden">
      {/* Mock Laptop/Browser Shell */}
      <motion.div 
        animate={{ 
          scale: step === 1 ? 1.01 : step === 2 ? 1.03 : 1,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full h-[320px] rounded-xl border border-border bg-card/65 backdrop-blur-md shadow-xl flex flex-col overflow-hidden relative"
      >
        {/* Browser header */}
        <div className="h-8 border-b border-border bg-muted/40 flex items-center px-4 justify-between shrink-0">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/40" />
            <span className="size-2.5 rounded-full bg-yellow-500/40" />
            <span className="size-2.5 rounded-full bg-green-500/40" />
          </div>
          <div className="px-10 py-0.5 rounded bg-muted/60 border border-border text-[9px] text-muted-foreground/60 tracking-wider">
            findora.ai/dashboard
          </div>
          <div className="w-10" />
        </div>

        {/* Browser Content */}
        <div className="flex-1 p-5 flex flex-col relative overflow-hidden bg-card/40">
          {/* Timeline info tags */}
          <div className="absolute top-2 left-4 flex items-center gap-1.5 text-[8px] uppercase tracking-wider text-muted-foreground/50">
            <Sparkles className="size-2.5 text-primary/60 animate-pulse" />
            {step === 0 && "Step 1: Report Lost Item"}
            {step === 1 && "Step 2: Vector Embedding Extraction"}
            {step === 2 && "Step 3: High-Confidence AI Match"}
            {step === 3 && "Step 4: Automated Notification Alert"}
            {step === 4 && "Findora AI"}
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col justify-center items-center gap-4"
              >
                <div className="flex items-center gap-3 bg-muted/40 border border-border rounded-lg p-3 w-full max-w-xs shadow-sm">
                  <div className="size-10 bg-primary/10 rounded-md border border-primary/20 flex items-center justify-center">
                    <Smartphone className="size-5 text-primary/80" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[11px] font-semibold text-foreground">iPhone 15 Pro</p>
                    <p className="text-[9px] text-muted-foreground">Coimbatore, India</p>
                  </div>
                  <span className="text-[8px] bg-red-500/10 text-red-500 dark:text-red-400 px-1.5 py-0.5 rounded border border-red-500/20 font-bold">LOST</span>
                </div>

                <div className="w-full max-w-xs text-left text-[9px] font-mono text-primary/80 bg-muted/30 border border-border p-2 rounded">
                  <span>$ reporting lost item...</span>
                  <motion.p
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, ease: "linear" }}
                    className="overflow-hidden whitespace-nowrap border-r border-foreground/80 font-semibold"
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
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-primary/40"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border border-dashed border-muted-foreground/30"
                  />
                  <Cpu className="size-7 text-primary/80 animate-pulse" />
                </div>
                <div className="text-center font-mono text-[9px] text-muted-foreground space-y-1">
                  <p className="animate-pulse font-semibold">Extracting features...</p>
                  <p className="opacity-60">MobileNetV3 shape: [1, 512]</p>
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
                  <div className="w-24 bg-muted/40 border border-border rounded-md p-2 text-center text-[9px] shadow-sm">
                    <div className="size-6 bg-red-500/10 rounded mx-auto mb-1 flex items-center justify-center">
                      <Smartphone className="size-3 text-red-500" />
                    </div>
                    <p className="font-semibold truncate">Lost iPhone</p>
                  </div>

                  {/* Connect Ring */}
                  <div className="flex flex-col items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="size-8 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-[10px] font-bold text-green-600 dark:text-green-400"
                    >
                      98%
                    </motion.div>
                    <span className="text-[7px] text-muted-foreground mt-1 uppercase tracking-wider">Similarity</span>
                  </div>

                  {/* Found Card */}
                  <div className="w-24 bg-muted/40 border border-border rounded-md p-2 text-center text-[9px] shadow-sm">
                    <div className="size-6 bg-green-500/10 rounded mx-auto mb-1 flex items-center justify-center">
                      <Smartphone className="size-3 text-green-600" />
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
                <div className="size-10 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center">
                  <Mail className="size-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-semibold text-foreground">Email alert dispatched</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5">Matched users notified automatically</p>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col justify-center items-center gap-2"
              >
                <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight">
                  FINDORA AI
                </h1>
                <p className="text-[9px] text-primary/80 font-mono tracking-widest uppercase font-semibold">
                  Zero Manual Search Required
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info banner */}
        <div className="h-6 border-t border-border bg-muted/40 flex items-center px-4 justify-between text-[8px] text-muted-foreground/50 tracking-wider shrink-0">
          <span>STATUS: ACTIVE</span>
          <span>FUSION MATCH ENGINE V1.0</span>
        </div>
      </motion.div>

      {/* Progress timeline dots */}
      <div className="flex gap-2 justify-center mt-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              step === i ? "w-6 bg-primary" : "w-1 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
