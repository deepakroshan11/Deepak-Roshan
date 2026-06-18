"use client";

import { useRef, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   OceanWaveOverlay — A canvas-rendered realistic ocean wave
   that cascades from the top when active and slowly retreats
   when deactivated. Inspired by Japanese ukiyo-e ocean waves.
   
   Color palette: Deep Ocean Blue with white foam caps.
   ═══════════════════════════════════════════════════════════ */

/* ── Wave layer definition ── */
interface WaveLayer {
  amplitude: number;
  wavelength: number;
  speed: number;
  phase: number;
  fillColors: string[];   // gradient stops for the body fill
  foamOpacity: number;    // white foam on crest
  foamWidth: number;
  yBase: number;          // final resting Y position (0 = top of wave zone)
}

/* Wave zone height — the area from top where waves render */
const WAVE_ZONE_H = 280;

/* 6 wave layers: back (deep/slow) → front (shallow/fast) */
const LAYERS: WaveLayer[] = [
  {
    amplitude: 22, wavelength: 380, speed: 0.08, phase: 0,
    fillColors: ["rgba(8, 32, 50, 0.45)", "rgba(8, 32, 50, 0.15)", "rgba(8, 32, 50, 0)"],
    foamOpacity: 0.08, foamWidth: 1.5, yBase: 20,
  },
  {
    amplitude: 18, wavelength: 300, speed: 0.12, phase: 1.5,
    fillColors: ["rgba(0, 60, 95, 0.40)", "rgba(0, 60, 95, 0.12)", "rgba(0, 60, 95, 0)"],
    foamOpacity: 0.12, foamWidth: 1.5, yBase: 50,
  },
  {
    amplitude: 15, wavelength: 240, speed: 0.17, phase: 3.0,
    fillColors: ["rgba(4, 100, 140, 0.35)", "rgba(4, 100, 140, 0.10)", "rgba(4, 100, 140, 0)"],
    foamOpacity: 0.18, foamWidth: 2, yBase: 85,
  },
  {
    amplitude: 12, wavelength: 200, speed: 0.22, phase: 0.8,
    fillColors: ["rgba(4, 126, 165, 0.30)", "rgba(4, 126, 165, 0.08)", "rgba(4, 126, 165, 0)"],
    foamOpacity: 0.22, foamWidth: 2.5, yBase: 120,
  },
  {
    amplitude: 9, wavelength: 160, speed: 0.28, phase: 4.2,
    fillColors: ["rgba(60, 170, 220, 0.22)", "rgba(60, 170, 220, 0.06)", "rgba(60, 170, 220, 0)"],
    foamOpacity: 0.30, foamWidth: 3, yBase: 155,
  },
  {
    amplitude: 6, wavelength: 130, speed: 0.35, phase: 5.5,
    fillColors: ["rgba(120, 200, 240, 0.18)", "rgba(167, 231, 223, 0.04)", "rgba(167, 231, 223, 0)"],
    foamOpacity: 0.40, foamWidth: 3.5, yBase: 190,
  },
];

/* How far below each wave the fill gradient extends */
const FILL_DEPTH = 80;

export function OceanWaveOverlay({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const progressRef = useRef(0);      // 0 = off-screen, 1 = fully visible
  const activeRef = useRef(false);

  activeRef.current = active;

  /* ── Compute the Y coordinate of the wave at a given X ── */
  const waveY = (x: number, layer: WaveLayer, t: number): number => {
    const w = layer.wavelength;
    const s = layer.speed;
    const p = layer.phase;
    const primary   = Math.sin((x / w) * Math.PI * 2 + t * s * Math.PI * 2 + p);
    const secondary = Math.sin((x / (w * 0.55)) * Math.PI * 2 + t * s * 1.4 * Math.PI * 2 + p * 1.8) * 0.3;
    const tertiary  = Math.sin((x / (w * 1.7))  * Math.PI * 2 + t * s * 0.6 * Math.PI * 2 + p * 0.4) * 0.15;
    return (primary + secondary + tertiary) * layer.amplitude;
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── Responsive sizing ── */
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /* ── Progress interpolation ── */
    const target = activeRef.current ? 1 : 0;
    // Arrive over ~2.5s, leave over ~2s
    const lerpSpeed = activeRef.current ? 0.025 : 0.035;
    progressRef.current += (target - progressRef.current) * lerpSpeed;
    if (!activeRef.current && progressRef.current < 0.002) progressRef.current = 0;
    const progress = progressRef.current;

    /* ── Advance time ── */
    timeRef.current += 0.016;
    const t = timeRef.current;

    /* ── Clear ── */
    ctx.clearRect(0, 0, w, h);

    if (progress <= 0) {
      rafRef.current = requestAnimationFrame(draw);
      return;
    }

    const step = 4; // pixel step for path resolution

    for (let li = 0; li < LAYERS.length; li++) {
      const layer = LAYERS[li];

      /* Staggered per-layer progress */
      const stagger = li * 0.08;
      const lp = Math.max(0, Math.min(1, (progress - stagger) / (1 - stagger)));
      /* Ease-out cubic for natural deceleration */
      const eased = 1 - Math.pow(1 - lp, 3);
      if (eased <= 0) continue;

      /* Vertical position: start above viewport, settle to yBase */
      const offScreen = -WAVE_ZONE_H - 40;
      const baseY = offScreen + (layer.yBase - offScreen) * eased;

      ctx.globalAlpha = eased;

      /* ── Build the wave crest path ── */
      const points: { x: number; y: number }[] = [];
      for (let x = -10; x <= w + 10; x += step) {
        points.push({ x, y: baseY + waveY(x, layer, t) });
      }

      /* ── Fill: gradient from crest line downward ── */
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      // Close downward
      ctx.lineTo(w + 10, baseY + FILL_DEPTH);
      ctx.lineTo(-10, baseY + FILL_DEPTH);
      ctx.closePath();

      // Vertical gradient from crest to FILL_DEPTH below
      const grad = ctx.createLinearGradient(0, baseY - layer.amplitude, 0, baseY + FILL_DEPTH);
      grad.addColorStop(0, layer.fillColors[0]);
      grad.addColorStop(0.5, layer.fillColors[1]);
      grad.addColorStop(1, layer.fillColors[2]);
      ctx.fillStyle = grad;
      ctx.fill();

      /* ── Foam cap: white line along the crest ── */
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        // Smooth with quadratic curves for organic feel
        const prev = points[i - 1];
        const curr = points[i];
        const cx = (prev.x + curr.x) / 2;
        const cy = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
      }
      ctx.strokeStyle = `rgba(255, 255, 255, ${layer.foamOpacity})`;
      ctx.lineWidth = layer.foamWidth;
      ctx.lineCap = "round";
      ctx.stroke();

      /* ── Secondary foam sparkle on wave peaks ── */
      for (let i = 1; i < points.length - 1; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const next = points[i + 1];
        // Detect local peaks (where wave crests)
        if (curr.y < prev.y && curr.y < next.y) {
          const sparkleSize = layer.foamWidth * 1.5;
          ctx.beginPath();
          ctx.arc(curr.x, curr.y - 1, sparkleSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${layer.foamOpacity * 0.5})`;
          ctx.fill();
        }
      }
    }

    ctx.globalAlpha = 1;
    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 5,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
