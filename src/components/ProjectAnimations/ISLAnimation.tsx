"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Hand, Smile, MessageCircle } from "lucide-react";

export const ISLAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runTimeline = () => {
      setStep(0);
      const t1 = setTimeout(() => setStep(1), 2500);
      const t2 = setTimeout(() => setStep(2), 5000);
      const t3 = setTimeout(() => setStep(3), 7500);
      return [t1, t2, t3];
    };

    let timers = runTimeline();
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
    <div className="w-full max-w-2xl mx-auto py-4 font-sans select-none overflow-hidden">
      <motion.div
        animate={{
          scale: step === 1 ? 1.01 : step === 2 ? 1.02 : 1,
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
            isl-translator.ai/live
          </div>
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col relative overflow-hidden bg-card/40">
          {/* Step indicator */}
          <div className="absolute top-2 left-4 flex items-center gap-1.5 text-[8px] uppercase tracking-wider text-muted-foreground/50">
            <Camera className="size-2.5 text-primary/60 animate-pulse" />
            {step === 0 && "Step 1: Webcam + MediaPipe Skeleton"}
            {step === 1 && "Step 2: Gesture Recognition — 95% Accuracy"}
            {step === 2 && "Step 3: Emotion Detection"}
            {step === 3 && "Step 4: Real-Time Translation Output"}
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
                {/* Webcam frame with skeleton dots */}
                <div className="relative w-48 h-32 bg-muted/30 border border-border rounded-lg overflow-hidden">
                  {/* Camera active indicator */}
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="size-1.5 rounded-full bg-red-500"
                    />
                    <span className="text-[7px] text-red-500/80 font-mono">REC</span>
                  </div>
                  {/* Silhouette skeleton points */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-16 h-24">
                      {/* Head */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 size-4 rounded-full border border-blue-500/60 bg-blue-500/10"
                      />
                      {/* Shoulders */}
                      <div className="absolute top-5 left-0 w-full h-px bg-blue-500/40" />
                      {/* Left hand */}
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        className="absolute top-10 left-0 size-2.5 rounded-full bg-green-500/60 border border-green-500/40"
                      />
                      {/* Right hand */}
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute top-8 right-0 size-2.5 rounded-full bg-green-500/60 border border-green-500/40"
                      />
                      {/* Spine line */}
                      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-px h-10 bg-blue-500/30" />
                      {/* Joint dots */}
                      {[
                        { x: "25%", y: "35%" },
                        { x: "75%", y: "35%" },
                        { x: "50%", y: "65%" },
                        { x: "35%", y: "85%" },
                        { x: "65%", y: "85%" },
                      ].map((pos, i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                          className="absolute size-1.5 rounded-full bg-blue-400"
                          style={{ left: pos.x, top: pos.y }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[9px] text-muted-foreground/60 font-mono">MediaPipe · 21 hand landmarks tracked</p>
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
                <div className="flex items-center gap-4">
                  {/* Hand gesture detected */}
                  <div className="relative">
                    <div className="size-16 bg-muted/30 border border-border rounded-lg flex items-center justify-center">
                      <Hand className="size-8 text-blue-500/70" />
                    </div>
                    {/* Keypoint skeleton overlay */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute -inset-1 rounded-lg border-2 border-dashed border-blue-500/30"
                    />
                  </div>

                  {/* Arrow */}
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-muted-foreground/40 text-lg"
                  >
                    →
                  </motion.div>

                  {/* Detected gesture */}
                  <div className="bg-muted/40 border border-border rounded-lg p-3 text-center">
                    <p className="text-[11px] font-semibold text-foreground">🙏 Namaste</p>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.2 }}
                      className="h-1 bg-green-500/60 rounded-full mt-2"
                    />
                    <p className="text-[8px] text-green-600 dark:text-green-400 font-bold mt-1">96.4% Confidence</p>
                  </div>
                </div>
                <p className="text-[9px] text-muted-foreground/60 font-mono">TensorFlow CNN · ~95% accuracy on ISL gestures</p>
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
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-rose-500/40"
                  />
                  <Smile className="size-7 text-rose-500/80" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-muted/40 border border-border rounded-lg p-2.5 text-center">
                    <p className="text-[10px] font-semibold text-foreground">😊 Friendly</p>
                    <p className="text-[8px] text-green-600 dark:text-green-400 font-bold mt-0.5">95.0%</p>
                  </div>
                  <div className="bg-muted/40 border border-border rounded-lg p-2.5 text-center opacity-50">
                    <p className="text-[10px] font-semibold text-foreground">😐 Neutral</p>
                    <p className="text-[8px] text-muted-foreground font-bold mt-0.5">3.8%</p>
                  </div>
                </div>
                <p className="text-[9px] text-muted-foreground/60 font-mono">Facial landmarks · temporal smoothing</p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col justify-center items-center gap-3"
              >
                <div className="size-10 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center">
                  <MessageCircle className="size-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="bg-muted/40 border border-border rounded-xl rounded-bl-none p-3 max-w-[200px]">
                  <motion.p
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, ease: "linear" }}
                    className="overflow-hidden whitespace-nowrap text-[12px] font-semibold text-foreground"
                  >
                    &ldquo;Hello, welcome!&rdquo;
                  </motion.p>
                </div>
                <p className="text-[9px] text-muted-foreground/60 font-mono">
                  Bridging communication for the hearing-impaired
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="h-6 border-t border-border bg-muted/40 flex items-center px-4 justify-between text-[8px] text-muted-foreground/50 tracking-wider shrink-0">
          <span>STATUS: TRANSLATING</span>
          <span>MEDIAPIPE + TENSORFLOW CNN</span>
        </div>
      </motion.div>

      {/* Progress dots */}
      <div className="flex gap-2 justify-center mt-3">
        {[0, 1, 2, 3].map((i) => (
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
