"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, AlertTriangle, RefreshCw, Bell } from "lucide-react";

export const CloudGuardAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const runTimeline = () => {
      setStep(0);
      const t1 = setTimeout(() => setStep(1), 2800);
      const t2 = setTimeout(() => setStep(2), 5600);
      const t3 = setTimeout(() => setStep(3), 8400);
      return [t1, t2, t3];
    };

    let timers = runTimeline();
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
      <motion.div
        animate={{
          scale: step === 1 ? 1.02 : step === 2 ? 1.01 : 1,
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
            cloudguard.ai/dashboard
          </div>
          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col relative overflow-hidden bg-card/40">
          {/* Step indicator */}
          <div className="absolute top-2 left-4 flex items-center gap-1.5 text-[8px] uppercase tracking-wider text-muted-foreground/50">
            <Activity className="size-2.5 text-primary/60 animate-pulse" />
            {step === 0 && "Step 1: Normal Operation — Metrics Stable"}
            {step === 1 && "Step 2: Anomaly Detected — CPU Spike"}
            {step === 2 && "Step 3: Lambda Self-Healing Triggered"}
            {step === 3 && "Step 4: System Recovered — SNS Alert Sent"}
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
                {/* Metrics dashboard */}
                <div className="w-full max-w-xs bg-muted/30 border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono text-muted-foreground/80">EC2 · ap-south-1</span>
                    <span className="text-[8px] bg-green-500/10 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded border border-green-500/20 font-bold">NORMAL</span>
                  </div>
                  {/* Mini metric bars */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] text-muted-foreground/60 w-8">CPU</span>
                      <div className="flex-1 h-2 bg-muted/60 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: ["35%", "45%", "38%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="h-full bg-green-500/60 rounded-full"
                        />
                      </div>
                      <span className="text-[8px] font-mono text-muted-foreground/60 w-8 text-right">45%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] text-muted-foreground/60 w-8">MEM</span>
                      <div className="flex-1 h-2 bg-muted/60 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: ["50%", "55%", "52%"] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          className="h-full bg-blue-500/60 rounded-full"
                        />
                      </div>
                      <span className="text-[8px] font-mono text-muted-foreground/60 w-8 text-right">52%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] text-muted-foreground/60 w-8">NET</span>
                      <div className="flex-1 h-2 bg-muted/60 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: ["20%", "30%", "25%"] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                          className="h-full bg-cyan-500/60 rounded-full"
                        />
                      </div>
                      <span className="text-[8px] font-mono text-muted-foreground/60 w-8 text-right">25%</span>
                    </div>
                  </div>
                </div>
                <p className="text-[9px] text-muted-foreground/60 font-mono">CloudWatch streaming · Isolation Forest monitoring</p>
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
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="size-14 bg-red-500/10 border-2 border-red-500/40 rounded-full flex items-center justify-center"
                >
                  <AlertTriangle className="size-7 text-red-500" />
                </motion.div>
                <div className="w-full max-w-xs bg-red-500/5 border border-red-500/20 rounded-lg p-3 text-center">
                  <p className="text-[11px] font-bold text-red-600 dark:text-red-400">⚠ ANOMALY DETECTED</p>
                  <div className="flex items-center gap-2 mt-2 justify-center">
                    <span className="text-[8px] text-muted-foreground/60">CPU</span>
                    <div className="flex-1 max-w-[120px] h-2 bg-muted/60 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "45%" }}
                        animate={{ width: "99%" }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full bg-red-500/80 rounded-full"
                      />
                    </div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[9px] font-mono font-bold text-red-500"
                    >
                      99%
                    </motion.span>
                  </div>
                  <p className="text-[8px] text-muted-foreground/60 mt-1.5 font-mono">isolation-forest: anomaly_score = 0.94</p>
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
                <div className="relative size-14 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/40"
                  />
                  <RefreshCw className="size-6 text-amber-500/80" />
                </div>
                <div className="w-full max-w-xs bg-muted/30 border border-border rounded-lg p-3 space-y-1.5">
                  <p className="text-[9px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                    AWS Lambda: self-heal triggered
                  </p>
                  {["Isolating anomalous node...", "Scaling replacement instance...", "Restarting services..."].map((msg, i) => (
                    <motion.div
                      key={msg}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.4 }}
                      className="flex items-center gap-1.5 text-[8px] font-mono text-muted-foreground/70"
                    >
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                        className="size-1.5 rounded-full bg-amber-500"
                      />
                      {msg}
                    </motion.div>
                  ))}
                </div>
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
                  <Bell className="size-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-semibold text-foreground">System Self-Healed</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5">CPU stabilized · 22% load</p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full max-w-xs bg-muted/30 border border-border rounded-lg p-2 text-center"
                >
                  <p className="text-[8px] font-mono text-green-600 dark:text-green-400">
                    [SNS] Node auto-healed in 14s. CPU: 22%. Alert sent to ops team.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="h-6 border-t border-border bg-muted/40 flex items-center px-4 justify-between text-[8px] text-muted-foreground/50 tracking-wider shrink-0">
          <span>STATUS: MONITORING</span>
          <span>ISOLATION FOREST + AWS LAMBDA</span>
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
