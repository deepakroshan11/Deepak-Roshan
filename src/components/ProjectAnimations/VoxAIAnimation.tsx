"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mic, Zap, AudioLines, SlidersHorizontal, Play } from "lucide-react";

export const VoxAIAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runTimeline = () => {
      setStep(0);
      const t1 = setTimeout(() => setStep(1), 2400);
      const t2 = setTimeout(() => setStep(2), 4800);
      const t3 = setTimeout(() => setStep(3), 7200);
      const t4 = setTimeout(() => setStep(4), 9600);
      return [t1, t2, t3, t4];
    };

    let timers = runTimeline();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = runTimeline();
    }, 12000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto py-4 font-sans select-none overflow-hidden">
      <motion.div
        animate={{
          scale: step === 2 ? 1.02 : step === 4 ? 1.01 : 1,
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
            voxai.ai/studio
          </div>
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col relative overflow-hidden bg-card/40">
          {/* Step indicator */}
          <div className="absolute top-2 left-4 flex items-center gap-1.5 text-[8px] uppercase tracking-wider text-muted-foreground/50">
            <AudioLines className="size-2.5 text-primary/60 animate-pulse" />
            {step === 0 && "Step 1: Import Voice Sample"}
            {step === 1 && "Step 2: Enter Speech Prompt"}
            {step === 2 && "Step 3: Neural Voice Cloning"}
            {step === 3 && "Step 4: DSP Audio Pipeline"}
            {step === 4 && "VoxAI Studio"}
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
                  <div className="size-10 bg-amber-500/10 rounded-md border border-amber-500/20 flex items-center justify-center">
                    <Mic className="size-5 text-amber-500/80" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[11px] font-semibold text-foreground">voice_sample.wav</p>
                    <p className="text-[9px] text-muted-foreground">3.2s · 44.1kHz · Mono</p>
                  </div>
                  <span className="text-[8px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20 font-bold">LOADED</span>
                </div>

                {/* Waveform visualization */}
                <div className="w-full max-w-xs flex items-center gap-0.5 justify-center h-8">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-amber-500/60 rounded-full"
                      animate={{
                        height: [4, Math.random() * 24 + 6, 4],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.04,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
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
                <div className="w-full max-w-xs bg-muted/30 border border-border rounded-lg p-3">
                  <p className="text-[8px] text-muted-foreground/60 uppercase tracking-wider mb-2">Speech Prompt</p>
                  <motion.p
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.8, ease: "linear" }}
                    className="overflow-hidden whitespace-nowrap border-r border-foreground/80 text-[11px] font-mono text-foreground/90 font-semibold"
                  >
                    &quot;Welcome to the future of voice.&quot;
                  </motion.p>
                </div>
                <p className="text-[9px] text-muted-foreground/60 font-mono">target-voice: imported_sample.wav</p>
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
                <div className="relative size-16 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-purple-500/40"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border border-dashed border-blue-500/30"
                  />
                  <Zap className="size-7 text-purple-500/80 animate-pulse" />
                </div>
                <div className="text-center font-mono text-[9px] text-muted-foreground space-y-1">
                  <p className="animate-pulse font-semibold">ChatterboxTTS synthesizing...</p>
                  <p className="opacity-60">Zero-shot · No fine-tuning required</p>
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
                <div className="size-10 bg-teal-500/10 border border-teal-500/30 rounded-full flex items-center justify-center">
                  <SlidersHorizontal className="size-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div className="w-full max-w-xs grid grid-cols-2 gap-1.5">
                  {["Bass Restore", "De-Noise", "Harmonics", "Dynamics", "Room Tone", "LUFS Norm", "Peak Limit"].map((stage, i) => (
                    <motion.div
                      key={stage}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                      className="flex items-center gap-1.5 text-[8px] font-mono text-muted-foreground/80 bg-muted/30 border border-border rounded px-2 py-1"
                    >
                      <span className="size-1.5 rounded-full bg-teal-500" />
                      {stage}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col justify-center items-center gap-3"
              >
                <div className="flex items-center gap-3 bg-muted/40 border border-border rounded-lg p-3 w-full max-w-xs">
                  <div className="size-8 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center">
                    <Play className="size-4 text-green-600 dark:text-green-400 ml-0.5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-semibold text-foreground">Cloned Output Ready</p>
                    <p className="text-[8px] text-muted-foreground">broadcast-quality · 44.1kHz</p>
                  </div>
                </div>
                {/* Visualizer bars */}
                <div className="flex items-end gap-0.5 h-6">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-green-500/50 rounded-t"
                      animate={{
                        height: [2, Math.random() * 20 + 4, 2],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="h-6 border-t border-border bg-muted/40 flex items-center px-4 justify-between text-[8px] text-muted-foreground/50 tracking-wider shrink-0">
          <span>STATUS: ACTIVE</span>
          <span>CHATTERBOX TTS + 7-STAGE DSP</span>
        </div>
      </motion.div>

      {/* Progress dots */}
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
