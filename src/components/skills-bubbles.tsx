"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface Ball {
  el: HTMLDivElement;
  inner: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  d: boolean;
  ox: number;
  oy: number;
  pvx: number;
  pvy: number;
  lastX: number;
  lastY: number;
  touchId: number | null;
}

interface Tech {
  n: string;
  logo: string;
  bg: string;
  inv?: boolean;
}

export function SkillsBubbles() {
  const areaRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const lastHitTRef = useRef(0);
  const [soundOn, setSoundOn] = useState(true);
  const soundOnRef = useRef(true);

  // Sync ref with state
  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  const techs: Tech[] = [
    { n: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "Jupyter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "ChatGPT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", bg: "#10a37f" },
    { n: "Claude", logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg", bg: "#c8a96e", inv: true },
    { n: "Gemini", logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg", bg: "rgba(255,255,255,.92)" },
    { n: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", bg: "rgba(255,255,255,.92)" },
    { n: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "Git Actions", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "Photoshop", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg", bg: "#001d26" },
    { n: "Blender", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "HuggingFace", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg", bg: "rgba(255,255,255,.92)" },
    { n: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "Premiere Pro", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg", bg: "#2a0f50" },
    { n: "Windsurf", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", bg: "#0a1628" },
    { n: "Lovable", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", bg: "rgba(255,80,120,.15)" },
    { n: "Cursor", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", bg: "rgba(255,255,255,.92)" },
    { n: "Caffeine AI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", bg: "rgba(60,20,5,.95)" },
  ];

  const SZ = [68, 62, 66, 60, 64, 72, 64, 68, 72, 66, 62, 60, 58, 64, 60, 62, 58, 66, 62, 60, 64, 58, 66, 62, 60, 58, 64];

  // Sound functions
  const snd = (freq: number, type: OscillatorType = "sine", dur: number = 0.1, vol: number = 0.1, freqEnd?: number) => {
    if (!soundOnRef.current) return;
    try {
      const ac = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.connect(g);
      g.connect(ac.destination);
      o.type = type;
      const t = ac.currentTime;
      o.frequency.setValueAtTime(freq, t);
      if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, t + dur * 0.8);
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.start(t);
      o.stop(t + dur + 0.01);
    } catch (e) {
      // Audio context not available
    }
  };

  const sndBounce = (imp: number) => {
    if (!soundOnRef.current) return;
    try {
      const ac = new (window.AudioContext || (window as any).webkitAudioContext)();
      const buf = ac.createBuffer(1, ac.sampleRate * 0.12, ac.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ac.sampleRate * 0.035));
      }
      const src = ac.createBufferSource();
      src.buffer = buf;
      const f = ac.createBiquadFilter();
      f.type = "bandpass";
      f.frequency.value = 200 + imp * 400;
      f.Q.value = 4;
      const g = ac.createGain();
      g.gain.value = Math.min(imp * 0.25, 0.2);
      src.connect(f);
      f.connect(g);
      g.connect(ac.destination);
      src.start();
      src.stop(ac.currentTime + 0.14);
    } catch (e) {
      // Audio context not available
    }
  };

  const sndWall = () => snd(320, "triangle", 0.07, 0.06, 60);
  const sndClick = () => snd(660, "sine", 0.05, 0.09, 440);

  // Initialize balls
  useEffect(() => {
    if (!areaRef.current) return;

    const area = areaRef.current;
    const balls: Ball[] = [];
    
    // Clean up any existing children that are wraps to support hot-reloads/re-mounts
    const existingWraps = area.querySelectorAll(".ball-wrap");
    existingWraps.forEach((el) => el.remove());

    const ballScale = window.innerWidth < 600 ? 0.72 : window.innerWidth < 900 ? 0.85 : 1;

    techs.forEach((t, i) => {
      const s = Math.round((SZ[i] || 62) * ballScale);
      const wrap = document.createElement("div");
      wrap.className = "ball-wrap";
      wrap.style.cssText = `position:absolute;width:${s}px;height:${s}px;border-radius:50%;user-select:none;will-change:transform;z-index:1;touch-action:none;-webkit-user-select:none;cursor:grab`;
      wrap.title = t.n;

      const inner = document.createElement("div");
      inner.style.cssText = `width:${s}px;height:${s}px;border-radius:50%;background:${t.bg || "rgba(255,255,255,.92)"};border:1.5px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 16px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.55),inset 0 -1px 0 rgba(0,0,0,.08);overflow:hidden;position:relative;pointer-events:none;`;

      const shine = document.createElement("div");
      shine.style.cssText = `position:absolute;top:7%;left:18%;width:38%;height:22%;border-radius:50%;background:rgba(255,255,255,.42);pointer-events:none;filter:blur(2px)`;
      inner.appendChild(shine);

      const img = document.createElement("img");
      img.src = t.logo;
      img.alt = t.n;
      img.draggable = false;
      img.style.cssText = `width:52%;height:52%;object-fit:contain;pointer-events:none;position:relative;z-index:1${t.inv ? ";filter:invert(1)" : ""}`;
      inner.appendChild(img);

      const nameEl = document.createElement("div");
      nameEl.textContent = t.n;
      nameEl.style.cssText = `position:absolute;bottom:-22px;left:50%;transform:translateX(-50%);font-size:9px;letter-spacing:.08em;color:rgba(144,165,180,.75);white-space:nowrap;font-family:'Jost',sans-serif;font-weight:300;pointer-events:none;opacity:0;transition:opacity .2s;`;

      wrap.appendChild(inner);
      wrap.appendChild(nameEl);
      area.appendChild(wrap);

      wrap.addEventListener("mouseenter", () => {
        nameEl.style.opacity = "1";
        wrap.style.zIndex = "10";
      });
      wrap.addEventListener("mouseleave", () => {
        nameEl.style.opacity = "0";
        wrap.style.zIndex = "1";
      });

      const aW = area.offsetWidth || 900;
      const aH = area.offsetHeight || 430;
      const x = s / 2 + Math.random() * (aW - s);
      const y = s / 2 + Math.random() * (aH - s);

      const ball: Ball = {
        el: wrap,
        inner,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        s,
        d: false,
        ox: 0,
        oy: 0,
        pvx: 0,
        pvy: 0,
        lastX: 0,
        lastY: 0,
        touchId: null,
      };

      balls.push(ball);
      wrap.style.left = x - s / 2 + "px";
      wrap.style.top = y - s / 2 + "px";

      // Mouse drag
      wrap.addEventListener("mousedown", (ev: MouseEvent) => {
        const b = balls[i];
        b.d = true;
        const r = area.getBoundingClientRect();
        b.ox = ev.clientX - b.x - r.left;
        b.oy = ev.clientY - b.y - r.top;
        b.pvx = 0;
        b.pvy = 0;
        wrap.style.zIndex = "99";
        inner.style.boxShadow = "0 8px 28px rgba(0,0,0,.3),0 0 0 2px rgba(200,169,110,.5),inset 0 1px 0 rgba(255,255,255,.55)";
        sndClick();
        ev.preventDefault();
      });

      // Touch drag
      wrap.addEventListener(
        "touchstart",
        (ev: TouchEvent) => {
          const b = balls[i];
          if (b.d) return;
          const touch = ev.changedTouches[0];
          b.touchId = touch.identifier;
          b.d = true;
          const r = area.getBoundingClientRect();
          b.ox = touch.clientX - b.x - r.left;
          b.oy = touch.clientY - b.y - r.top;
          b.pvx = 0;
          b.pvy = 0;
          wrap.style.zIndex = "99";
          inner.style.boxShadow = "0 8px 28px rgba(0,0,0,.3),0 0 0 2px rgba(200,169,110,.5),inset 0 1px 0 rgba(255,255,255,.55)";
          sndClick();
          ev.stopPropagation();
        },
        { passive: true }
      );
    });

    ballsRef.current = balls;

    // Global mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const r = area.getBoundingClientRect();
      balls.forEach((b) => {
        if (b.d && b.touchId === null) {
          const px = b.x;
          const py = b.y;
          b.x = e.clientX - b.ox - r.left;
          b.y = e.clientY - b.oy - r.top;
          b.pvx = b.x - px;
          b.pvy = b.y - py;
        }
      });
    };

    // Global touch move
    const handleTouchMove = (ev: TouchEvent) => {
      const r = area.getBoundingClientRect();
      for (let ti = 0; ti < ev.changedTouches.length; ti++) {
        const touch = ev.changedTouches[ti];
        balls.forEach((b) => {
          if (b.d && b.touchId === touch.identifier) {
            const px = b.x;
            const py = b.y;
            b.x = touch.clientX - b.ox - r.left;
            b.y = touch.clientY - b.oy - r.top;
            b.pvx = b.x - px;
            b.pvy = b.y - py;
          }
        });
      }
      // Only prevent default on active touches inside container
      if (ev.cancelable) ev.preventDefault();
    };

    // Mouse up
    const handleMouseUp = () => {
      balls.forEach((b) => {
        if (b.d && b.touchId === null) {
          b.d = false;
          b.el.style.zIndex = "1";
          b.vx = b.pvx * 0.65;
          b.vy = b.pvy * 0.65;
          b.inner.style.boxShadow = "0 2px 16px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.55)";
        }
      });
    };

    // Touch end
    const handleTouchEnd = (ev: TouchEvent) => {
      for (let ti = 0; ti < ev.changedTouches.length; ti++) {
        const touch = ev.changedTouches[ti];
        balls.forEach((b) => {
          if (b.d && b.touchId === touch.identifier) {
            b.d = false;
            b.touchId = null;
            b.el.style.zIndex = "1";
            b.vx = b.pvx * 0.65;
            b.vy = b.pvy * 0.65;
            b.inner.style.boxShadow = "0 2px 16px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.55)";
          }
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    area.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("mouseup", handleMouseUp);
    area.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      area.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);
      area.removeEventListener("touchend", handleTouchEnd);
      
      // Clean up wraps on unmount
      const wraps = area.querySelectorAll(".ball-wrap");
      wraps.forEach((el) => el.remove());
    };
  }, []);

  // Physics loop
  useEffect(() => {
    const balls = ballsRef.current;
    const area = areaRef.current;
    if (!area) return;

    let animId: number;
    const animate = () => {
      const aW = area.offsetWidth;
      const aH = area.offsetHeight;
      const now = performance.now();

      balls.forEach((b, i) => {
        if (!b.d) {
          b.x += b.vx;
          b.y += b.vy;
          b.vx *= 0.996;
          b.vy *= 0.996;
        }

        let wh = false;
        if (b.x < b.s / 2) {
          b.x = b.s / 2;
          b.vx *= -0.76;
          wh = true;
        }
        if (b.x > aW - b.s / 2) {
          b.x = aW - b.s / 2;
          b.vx *= -0.76;
          wh = true;
        }
        if (b.y < b.s / 2) {
          b.y = b.s / 2;
          b.vy *= -0.76;
          wh = true;
        }
        if (b.y > aH - b.s / 2) {
          b.y = aH - b.s / 2;
          b.vy *= -0.76;
          wh = true;
        }

        if (wh && now - lastHitTRef.current > 70 && Math.abs(b.vx) + Math.abs(b.vy) > 1.1) {
          sndWall();
          lastHitTRef.current = now;
        }

        // Collision detection
        for (let j = i + 1; j < balls.length; j++) {
          const b2 = balls[j];
          const dx = b2.x - b.x;
          const dy = b2.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const mn = (b.s + b2.s) / 2;

          if (d < mn && d > 0) {
            const nx = dx / d;
            const ny = dy / d;
            const ov = (mn - d) / 2;
            b.x -= nx * ov;
            b.y -= ny * ov;
            b2.x += nx * ov;
            b2.y += ny * ov;

            const rv = (b.vx - b2.vx) * nx + (b.vy - b2.vy) * ny;
            b.vx -= rv * nx * 0.82;
            b.vy -= rv * ny * 0.82;
            b2.vx += rv * nx * 0.82;
            b2.vy += rv * ny * 0.82;

            const imp = Math.abs(rv);
            if (imp > 0.7 && now - lastHitTRef.current > 55) {
              sndBounce(Math.min(imp / 10, 1));
              lastHitTRef.current = now;
            }
          }
        }

        b.el.style.left = b.x - b.s / 2 + "px";
        b.el.style.top = b.y - b.s / 2 + "px";
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={areaRef}
      className="relative w-full h-[280px] xs:h-[360px] md:h-[430px] overflow-hidden rounded-2xl border border-[#c8a96e]/20 dark:border-[#c8a96e]/30 bg-muted/20 dark:bg-[#0d1b2a]/40 backdrop-blur-md shadow-2xl touch-none select-none"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 55% 35% at 50% 0%, rgba(200, 169, 110, .08), transparent 65%)",
        }}
      />

      {/* Sound Toggle Button */}
      <button
        onClick={() => setSoundOn((prev) => !prev)}
        className="absolute bottom-4 right-4 z-50 p-2.5 rounded-full border border-[#c8a96e]/30 bg-[#0d1b2a]/80 dark:bg-[#162235]/90 backdrop-blur-md hover:border-[#c8a96e]/70 transition-all text-[#c8a96e] hover:scale-105 active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
        title={soundOn ? "Mute sounds" : "Unmute sounds"}
      >
        {soundOn ? <Volume2 className="h-4.5 w-4.5" /> : <VolumeX className="h-4.5 w-4.5" />}
      </button>
    </div>
  );
}
