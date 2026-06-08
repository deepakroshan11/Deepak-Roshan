"use client";

import React, { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  leftBrace: boolean;
  springK: number; // individual spring coefficient for speed variance
  alwaysFloat?: boolean; // if true, this particle stays in floating state and doesn't gather
}

function generateParenthesisPoints(count: number, width: number, height: number, isLeft: boolean): Point[] {
  const points: Point[] = [];
  const h = height;
  const w = width;

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1 || 1);
    const angle = (t - 0.5) * (Math.PI * 0.72); // smooth arc span
    const pt = {
      x: -Math.cos(angle) * w + w * 0.6,
      y: Math.sin(angle) * (h / 2),
    };
    if (!isLeft) {
      pt.x = -pt.x;
    }
    points.push(pt);
  }
  return points;
}

export default function ParenthesesParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const hoverRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  const PARTICLE_COUNT = 540; // Increased density for bold outline + background floaters

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 300;
    let height = 300;

    const resize = () => {
      if (containerRef.current) {
        width = containerRef.current.clientWidth || 300;
        height = containerRef.current.clientHeight || 300;
      }
      canvas.width = width;
      canvas.height = height;
      
      // Re-map target positions based on new dimensions
      updateTargets(width, height);
    };

    const updateTargets = (w: number, h: number) => {
      const braceH = Math.min(h * 0.70, 240); // scaled down relative to canvas to avoid edge clipping
      const braceW = Math.min(w * 0.16, 44);  // curve depth
      const gap = Math.min(w * 0.25, 70);    // gap between left and right parenthesis

      const leftPoints = generateParenthesisPoints(PARTICLE_COUNT / 2, braceW, braceH, true);
      const rightPoints = generateParenthesisPoints(PARTICLE_COUNT / 2, braceW, braceH, false);

      const cx = w / 2;
      const cy = h / 2;

      particlesRef.current.forEach((p, idx) => {
        // Scatter targets randomly inside a 3D sphere for thick 3D depth coverage
        const spread = 12; // slightly tighter spread for clean boundaries
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * spread;
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;
        const offsetZ = (Math.random() - 0.5) * 45; // 3D depth thickness spread

        if (p.leftBrace) {
          const pt = leftPoints[idx] || { x: 0, y: 0 };
          p.targetX = cx - gap + pt.x + offsetX;
          p.targetY = cy + pt.y + offsetY;
          p.targetZ = offsetZ;
        } else {
          const pt = rightPoints[idx - PARTICLE_COUNT / 2] || { x: 0, y: 0 };
          p.targetX = cx + gap + pt.x + offsetX;
          p.targetY = cy + pt.y + offsetY;
          p.targetZ = offsetZ;
        }
      });
    };

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isAlwaysFloat = i % 8 === 0; // ~12.5% of particles always float for background depth
      const isSlowConformer = !isAlwaysFloat && i % 4 === 0; // ~22% converge slowly to simulate late-forming particles
      
      const springK = isSlowConformer 
        ? 0.003 + Math.random() * 0.004  // extremely slow late-formers
        : 0.025 + Math.random() * 0.015; // normal fast springs

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: (Math.random() - 0.5) * 150, // 3D depth coordinates
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        vz: (Math.random() - 0.5) * 0.6,
        // Large particles forming braces (1.8-4.0px radius), smaller for background floaters
        size: isAlwaysFloat ? 0.8 + Math.random() * 1.2 : 1.8 + Math.random() * 2.2,
        alpha: isAlwaysFloat ? 0.45 + Math.random() * 0.45 : 0.65 + Math.random() * 0.35, // High opacity blue
        targetX: 0,
        targetY: 0,
        targetZ: 0,
        leftBrace: i < PARTICLE_COUNT / 2,
        springK,
        alwaysFloat: isAlwaysFloat,
      });
    }
    particlesRef.current = particles;
    resize();

    // Event listeners for window resize
    window.addEventListener("resize", resize);

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const isHovered = hoverRef.current;
      const cx = width / 2;
      const cy = height / 2;

      particlesRef.current.forEach((p) => {
        if (isHovered && !p.alwaysFloat) {
          // Spring force towards brace target coordinates (no cursor repulsion to keep braces stable)
          const springK = p.springK;
          const damping = 0.86;  // Mild damping so they overshoot and oscillate ("hit together")

          const forceX = (p.targetX - p.x) * springK;
          const forceY = (p.targetY - p.y) * springK;
          const forceZ = (p.targetZ - p.z) * springK;

          p.vx += forceX;
          p.vy += forceY;
          p.vz += forceZ;

          // (Removed continuous micro-vibration to let shape settle and remain statically in shape)

          p.vx *= damping;
          p.vy *= damping;
          p.vz *= damping;
        } else {
          // Gentle floating motion with sinusoidal wind/fluid drift
          const time = Date.now() * 0.001;
          const driftX = Math.sin(p.y * 0.01 + time + p.alpha) * 0.04;
          const driftY = Math.cos(p.x * 0.01 + time + p.alpha) * 0.04;
          const driftZ = Math.sin(p.z * 0.01 + time + p.alpha) * 0.04;
          
          p.vx += driftX + (Math.random() - 0.5) * 0.04;
          p.vy += driftY + (Math.random() - 0.5) * 0.04;
          p.vz += driftZ + (Math.random() - 0.5) * 0.04;

          // Damping and speed limit
          p.vx *= 0.97;
          p.vy *= 0.97;
          p.vz *= 0.97;

          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy + p.vz * p.vz);
          if (speed > 1.0) {
            p.vx = (p.vx / speed) * 1.0;
            p.vy = (p.vy / speed) * 1.0;
            p.vz = (p.vz / speed) * 1.0;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Boundary collision / wrapping (added 10px safe margin to prevent edge clipping)
        const marginBound = 10;
        if (p.x < marginBound) {
          p.x = marginBound;
          p.vx *= -0.8;
        }
        if (p.x > width - marginBound) {
          p.x = width - marginBound;
          p.vx *= -0.8;
        }
        if (p.y < marginBound) {
          p.y = marginBound;
          p.vy *= -0.8;
        }
        if (p.y > height - marginBound) {
          p.y = height - marginBound;
          p.vy *= -0.8;
        }
        if (p.z < -150) {
          p.z = -150;
          p.vz *= -0.8;
        }
        if (p.z > 150) {
          p.z = 150;
          p.vz *= -0.8;
        }

        // 3D perspective projection onto 2D canvas plane (fov = 250 for stronger depth shading)
        const fov = 250;
        const scale = fov / (fov + p.z);
        const projX = cx + (p.x - cx) * scale;
        const projY = cy + (p.y - cy) * scale;
        const projSize = p.size * scale;

        // Draw blue particle
        ctx.beginPath();
        ctx.arc(projX, projY, projSize, 0, Math.PI * 2);
        
        // Depth-based shading: closer particles are brighter, farther ones are slightly faded
        ctx.fillStyle = `rgba(37, 99, 235, ${p.alpha * Math.min(1.2, scale)})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] md:h-[360px] overflow-hidden flex items-center justify-center select-none"
      onMouseEnter={() => {
        hoverRef.current = true;
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
      }}
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-default"
      />
    </div>
  );
}
