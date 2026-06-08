"use client";

import React, { useEffect, useRef } from "react";

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
  springK: number;
  alwaysFloat?: boolean;
}

function generateInfinityPoints(count: number, width: number, height: number): Point[] {
  const points: Point[] = [];
  const a = width * 0.45; // scale width

  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const sinT = Math.sin(t);
    const cosT = Math.cos(t);
    const denom = 1 + sinT * sinT;

    // Lemniscate of Bernoulli equations for a figure-eight on its side
    const x = (a * cosT) / denom;
    // Scale y slightly to make the loop height look perfectly proportioned
    const y = (a * sinT * cosT * 1.55) / denom;

    points.push({ x, y });
  }

  return points;
}

export default function InfinityParticles({ isGathered = false }: { isGathered?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const hoverRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  const isGatheredRef = useRef(isGathered);
  useEffect(() => {
    isGatheredRef.current = isGathered;
  }, [isGathered]);

  const PARTICLE_COUNT = 1400;

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

      updateTargets(width, height);
    };

    const updateTargets = (w: number, h: number) => {
      const infinityH = Math.min(h * 0.70, 220);
      const infinityW = Math.min(w * 0.75, 220);

      const infinityPoints = generateInfinityPoints(PARTICLE_COUNT, infinityW, infinityH);

      const cx = w / 2;
      const cy = h / 2;

      particlesRef.current.forEach((p, idx) => {
        const spread = 9; // smooth outline width
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * spread;
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;
        const offsetZ = (Math.random() - 0.5) * 45;

        const pt = infinityPoints[idx] || { x: 0, y: 0 };
        p.targetX = cx + pt.x + offsetX;
        p.targetY = cy + pt.y + offsetY;
        p.targetZ = offsetZ;
      });
    };

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isAlwaysFloat = i % 8 === 0;
      const isSlowConformer = !isAlwaysFloat && i % 4 === 0;

      const springK = isSlowConformer
        ? 0.003 + Math.random() * 0.004
        : 0.025 + Math.random() * 0.015;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: (Math.random() - 0.5) * 150,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        vz: (Math.random() - 0.5) * 0.6,
        // Refined tiny particles
        size: isAlwaysFloat ? 0.3 + Math.random() * 0.45 : 0.65 + Math.random() * 0.65,
        alpha: isAlwaysFloat ? 0.45 + Math.random() * 0.45 : 0.7 + Math.random() * 0.3,
        targetX: 0,
        targetY: 0,
        targetZ: 0,
        springK,
        alwaysFloat: isAlwaysFloat,
      });
    }
    particlesRef.current = particles;
    resize();

    window.addEventListener("resize", resize);

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const isHovered = hoverRef.current || isGatheredRef.current;
      const cx = width / 2;
      const cy = height / 2;

      particlesRef.current.forEach((p) => {
        if (isHovered && !p.alwaysFloat) {
          const springK = p.springK;
          const damping = 0.86;

          const forceX = (p.targetX - p.x) * springK;
          const forceY = (p.targetY - p.y) * springK;
          const forceZ = (p.targetZ - p.z) * springK;

          p.vx += forceX;
          p.vy += forceY;
          p.vz += forceZ;

          p.vx *= damping;
          p.vy *= damping;
          p.vz *= damping;
        } else {
          const time = Date.now() * 0.001;
          const driftX = Math.sin(p.y * 0.01 + time + p.alpha) * 0.04;
          const driftY = Math.cos(p.x * 0.01 + time + p.alpha) * 0.04;
          const driftZ = Math.sin(p.z * 0.01 + time + p.alpha) * 0.04;

          p.vx += driftX + (Math.random() - 0.5) * 0.04;
          p.vy += driftY + (Math.random() - 0.5) * 0.04;
          p.vz += driftZ + (Math.random() - 0.5) * 0.04;

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

        const fov = 250;
        const scale = fov / (fov + p.z);
        const projX = cx + (p.x - cx) * scale;
        const projY = cy + (p.y - cy) * scale;
        const projSize = p.size * scale;

        ctx.beginPath();
        ctx.arc(projX, projY, projSize, 0, Math.PI * 2);

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
