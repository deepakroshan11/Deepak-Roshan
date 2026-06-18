"use client";

import { useEffect, useState } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";


/** Desktop / trackpad: show Radix tooltips. Touch: skip so first tap always follows the link. */
function useHoverTooltipsEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return enabled;
}

function NavTooltip({
  enabled,
  label,
  children,
}: {
  enabled: boolean;
  label: string;
  children: ReactNode;
}) {
  if (!enabled) {
    return <>{children}</>;
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
      >
        <p>{label}</p>
        <TooltipArrow className="fill-primary" />
      </TooltipContent>
    </Tooltip>
  );
}

export default function Navbar() {
  const tooltips = useHoverTooltipsEnabled();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [glowColor, setGlowColor] = useState<"sunrise" | "twilight" | "moon">("sunrise");
  const [isVisible, setIsVisible] = useState(true);

  const pathname = usePathname();
  const isWorksPage = pathname?.startsWith("/works");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isWorksPage) {
      setGlowColor("moon");
      setIsVisible(true);
    }
  }, [isWorksPage]);

  const { scrollYProgress } = useScroll();

  // Track scroll updates to shift the active scenery phase state
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isWorksPage) {
      setGlowColor("moon");
      setIsVisible(true);
      return;
    }

    if (latest < 0.18) {
      setGlowColor("sunrise");
    } else if (latest < 0.45) {
      setGlowColor("twilight");
    } else {
      setGlowColor("moon");
    }

    if (latest > 0.92) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  const glowStyles = {
    sunrise: {
      dark: {
        boxShadow: "0 0 18px 4px rgba(249, 115, 22, 0.45), 0 0 36px 8px rgba(239, 68, 68, 0.15)",
        borderColor: "rgba(249, 115, 22, 0.5)",
        backgroundColor: "rgba(24, 15, 15, 0.85)",
        iconBorder: "rgba(249, 115, 22, 0.45)",
      },
      light: {
        boxShadow: "0 0 14px 3px rgba(251, 191, 36, 0.35)",
        borderColor: "rgba(251, 191, 36, 0.45)",
        backgroundColor: "rgba(254, 243, 199, 0.85)",
        iconBorder: "rgba(251, 191, 36, 0.45)",
      },
    },
    twilight: {
      dark: {
        boxShadow: "0 0 18px 4px rgba(139, 92, 246, 0.45), 0 0 36px 8px rgba(99, 102, 241, 0.2)",
        borderColor: "rgba(139, 92, 246, 0.5)",
        backgroundColor: "rgba(15, 12, 28, 0.85)",
        iconBorder: "rgba(139, 92, 246, 0.45)",
      },
      light: {
        boxShadow: "0 0 14px 3px rgba(139, 92, 246, 0.35)",
        borderColor: "rgba(139, 92, 246, 0.45)",
        backgroundColor: "rgba(245, 243, 255, 0.85)",
        iconBorder: "rgba(139, 92, 246, 0.45)",
      },
    },
    moon: {
      dark: {
        boxShadow: "0 0 18px 4px rgba(100, 160, 255, 0.55), 0 0 36px 8px rgba(100, 160, 255, 0.15)",
        borderColor: "rgba(100, 160, 255, 0.55)",
        backgroundColor: "rgba(10, 16, 30, 0.85)",
        iconBorder: "rgba(100, 160, 255, 0.5)",
      },
      light: {
        boxShadow: "0 0 14px 3px rgba(147, 197, 253, 0.4)",
        borderColor: "rgba(147, 197, 253, 0.5)",
        backgroundColor: "rgba(239, 246, 255, 0.85)",
        iconBorder: "rgba(147, 197, 253, 0.5)",
      },
    },
  };

  const isDark = resolvedTheme === "dark";
  const activeStyle = mounted
    ? glowStyles[glowColor][isDark ? "dark" : "light"]
    : {
        boxShadow: "none",
        borderColor: "transparent",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        iconBorder: "transparent",
      };

  return (
    <nav
      aria-label="Site"
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-30 w-full min-w-0 max-w-[100dvw]",
        "flex justify-center",
        "ps-[max(0.5rem,env(safe-area-inset-left,0px))]",
        "pe-[max(0.5rem,env(safe-area-inset-right,0px))]",
        "pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]",
        "sm:bottom-4 sm:left-1/2 sm:right-auto sm:w-max sm:-translate-x-1/2 sm:max-w-[min(100dvw-1rem,calc(100dvw-env(safe-area-inset-left)-env(safe-area-inset-right)-1rem)))] sm:px-0",
        "sm:pb-[max(0.25rem,env(safe-area-inset-bottom,0px))]",
        "transition-all duration-500 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      )}
    >
      <div
        data-lenis-prevent
        className={cn(
          "pointer-events-auto w-full min-w-0 sm:w-max",
          /* Mobile: edge-to-edge horizontal scroll; sm+: shrink to dock width */
          "overflow-x-auto overflow-y-visible overscroll-x-contain",
          "[-webkit-overflow-scrolling:touch]",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          "sm:overflow-x-visible sm:overflow-y-visible",
          "mask-[linear-gradient(to_right,transparent,black_0.5rem,black_calc(100%-0.5rem),transparent)] sm:mask-none",
          "[-webkit-mask-image:linear-gradient(to_right,transparent,black_0.5rem,black_calc(100%-0.5rem),transparent)] sm:[-webkit-mask-image:none]"
        )}
      >
        <Dock
          style={{
            boxShadow: activeStyle.boxShadow,
            borderColor: activeStyle.borderColor,
            backgroundColor: activeStyle.backgroundColor,
            transition: "box-shadow 0.8s ease, border-color 0.8s ease, background-color 0.8s ease",
          }}
          className={cn(
            "z-50 relative mx-auto min-h-[3.625rem] w-max shrink-0",
            "flex flex-nowrap items-center justify-center",
            "gap-1 px-1 py-2 sm:min-h-14 sm:gap-2 sm:px-2 sm:py-2",
            "rounded-[999px] border bg-card/90 shadow-[0_0_10px_3px] shadow-primary/5 backdrop-blur-3xl",
            "supports-[backdrop-filter]:bg-card/85"
          )}
        >
          {DATA.navbar.map((item) => {
            const isExternal = item.href.startsWith("http");
            const download =
              "download" in item && item.download ? item.download : undefined;
            return (
              <NavTooltip key={item.href} enabled={tooltips} label={item.label}>
                <a
                  href={item.href}
                  download={download}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={item.label}
                  className="touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full shrink-0"
                >
                  <DockIcon
                    style={{
                      borderColor: activeStyle.iconBorder,
                      transition: "border-color 0.8s ease, background-color 0.3s ease",
                    }}
                    className="cursor-pointer rounded-3xl border bg-background p-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <item.icon className="size-full overflow-hidden rounded-sm object-contain" />
                  </DockIcon>
                </a>
              </NavTooltip>
            );
          })}
          <Separator
            orientation="vertical"
            className="h-[60%] min-h-[1.25rem] w-px shrink-0 self-center bg-border sm:h-2/3"
          />
          {Object.entries(DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social], index) => {
              const isExternal = social.url.startsWith("http");
              const IconComponent = social.icon;
              return (
                <NavTooltip key={`social-${name}-${index}`} enabled={tooltips} label={name}>
                  <a
                    href={social.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={name}
                    className="touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full shrink-0"
                  >
                    <DockIcon
                      style={{
                        borderColor: activeStyle.iconBorder,
                        transition: "border-color 0.8s ease, background-color 0.3s ease",
                      }}
                      className="cursor-pointer rounded-3xl border bg-background p-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <IconComponent className="size-full overflow-hidden rounded-sm object-contain" />
                    </DockIcon>
                  </a>
                </NavTooltip>
              );
            })}
          <Separator
            orientation="vertical"
            className="h-[60%] min-h-[1.25rem] w-px shrink-0 self-center bg-border sm:h-2/3"
          />
          <NavTooltip enabled={tooltips} label="Theme">
            <div className="touch-manipulation outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background rounded-full shrink-0">
              <DockIcon
                style={{
                  borderColor: activeStyle.iconBorder,
                  transition: "border-color 0.8s ease, background-color 0.3s ease",
                }}
                className="cursor-pointer rounded-3xl border bg-background p-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ModeToggle className="size-full cursor-pointer" />
              </DockIcon>
            </div>
          </NavTooltip>
        </Dock>
      </div>
    </nav>
  );
}
