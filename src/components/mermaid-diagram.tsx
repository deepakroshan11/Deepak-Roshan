"use client";

import mermaid from "mermaid";
import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState } from "react";

type MermaidDiagramProps = {
  chart: string;
  className?: string;
};

/**
 * Renders a Mermaid diagram (client-only). Theme follows site light/dark.
 */
export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const stableId = useId().replace(/:/g, "");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !ref.current || !chart.trim()) return;

    const el = ref.current;
    const theme = resolvedTheme === "dark" ? "dark" : "default";
    const id = `mmd-${stableId}`;

    let cancelled = false;

    mermaid.initialize({
      startOnLoad: false,
      theme,
      securityLevel: "loose",
      fontFamily: "var(--font-sans), system-ui, sans-serif",
    });

    el.innerHTML = "";
    mermaid
      .render(id, chart.trim(), el)
      .then(({ svg, bindFunctions }) => {
        if (cancelled) return;
        el.innerHTML = svg;
        bindFunctions?.(el);
      })
      .catch(() => {
        if (!cancelled) {
          el.innerHTML =
            "<p class='text-sm text-destructive'>Could not render diagram.</p>";
        }
      });

    return () => {
      cancelled = true;
    };
  }, [chart, mounted, resolvedTheme, stableId]);

  if (!chart.trim()) return null;

  return (
    <div
      ref={ref}
      className={[
        "not-prose min-h-[120px] rounded-xl border border-border bg-muted/20 p-4 overflow-x-auto flex justify-center items-start",
        "[&_svg]:max-w-full [&_svg]:h-auto",
        className ?? "",
      ].join(" ")}
      aria-hidden
    />
  );
}
