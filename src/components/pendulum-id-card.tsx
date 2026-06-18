"use client";

import { useRef, useCallback, useEffect } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Barcode decoration (pure CSS bars)
───────────────────────────────────────────── */
const BARCODE_WIDTHS = [2, 1, 3, 1, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 1];

function Barcode() {
  return (
    <div className="id-card-bc" aria-hidden="true">
      {BARCODE_WIDTHS.map((w, i) => (
        <span key={i} style={{ width: w }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export function PendulumIDCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  // current animated state
  const state = useRef({ rx: 0, ry: 0, mx: 0.5, my: 0.5, settled: true });

  /* smooth lerp on every frame */
  const animate = useCallback(() => {
    const s = state.current;
    const card = cardRef.current;
    if (!card) return;

    const TARGET_RX = s.settled ? 0 : (s.my - 0.5) * -28;
    const TARGET_RY = s.settled ? 0 : (s.mx - 0.5) * 28;

    s.rx += (TARGET_RX - s.rx) * 0.1;
    s.ry += (TARGET_RY - s.ry) * 0.1;

    const shimX = (s.mx * 100).toFixed(1);
    const shimY = (s.my * 100).toFixed(1);

    card.style.transform =
      `perspective(800px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg)`;
    card.style.setProperty("--shim-x", `${shimX}%`);
    card.style.setProperty("--shim-y", `${shimY}%`);

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  /* start / stop RAF */
  const startLoop = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  /* pointer handlers */
  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    state.current.mx = (e.clientX - rect.left) / rect.width;
    state.current.my = (e.clientY - rect.top) / rect.height;
    state.current.settled = false;
  }, []);

  const onLeave = useCallback(() => {
    state.current.settled = true;
  }, []);

  /* kick off the loop once on mount */
  useEffect(() => {
    startLoop();
    return stopLoop;
  }, [startLoop, stopLoop]);

  return (
    /* ── wrapper: pendulum origin at top-center ── */
    <div className="id-pendulum-wrapper">

      {/* ── strap ── */}
      <div className="id-strap">
        <div className="id-strap-highlight" />
      </div>

      {/* ── clip assembly ── */}
      <div className="id-clip-assy">
        <div className="id-clip-outer" />
        <div className="id-clip-ring">
          <div className="id-clip-ring-hole" />
        </div>
      </div>

      {/* ── 3-D tilting card ── */}
      <div
        ref={cardRef}
        className="id-card"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* holographic shimmer pseudo-element via a real div */}
        <div className="id-card-shim" aria-hidden="true" />

        {/* top bar */}
        <div className="id-card-topbar">
          <span className="id-card-tb-name">DEEPAK ROSHAN A</span>
          <span className="id-card-tb-tag">[PORTFOLIO]</span>
        </div>

        {/* photo zone */}
        <div className="id-card-photo-wrap">
          <Image
            src="/me.jpeg"
            alt="Deepak Roshan"
            fill
            priority
            draggable={false}
            className="id-card-photo"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          {/* gradient overlay */}
          <div className="id-card-photo-overlay" />

          {/* name + role overlay */}
          <div className="id-card-name-overlay">
            <p className="id-card-name-sub">AI Engineer</p>
            <div className="id-card-role-row">
              <span className="id-card-role-ai">AI&nbsp;</span>
              <span className="id-card-role-eng">ENGINEER</span>
            </div>
            <p className="id-card-name-italic">Deepak Roshan A</p>
          </div>
        </div>

        {/* bottom strip */}
        <div className="id-card-bottom">
          <div className="id-card-bottom-row">
            <span className="id-card-loc">COIMBATORE&nbsp;·&nbsp;INDIA</span>
          </div>
          <div className="id-card-divider" />
          <Barcode />
          <p className="id-card-bc-num">AI ENG · DEEPAK ROSHAN A · 2026</p>
        </div>
      </div>
    </div>
  );
}
