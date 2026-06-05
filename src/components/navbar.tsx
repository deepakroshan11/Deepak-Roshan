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
        "sm:pb-[max(0.25rem,env(safe-area-inset-bottom,0px))]"
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
                  <DockIcon className="cursor-pointer rounded-3xl border border-border bg-background p-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
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
                    <DockIcon className="cursor-pointer rounded-3xl border border-border bg-background p-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
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
              <DockIcon className="cursor-pointer rounded-3xl border border-border bg-background p-0 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <ModeToggle className="size-full cursor-pointer" />
              </DockIcon>
            </div>
          </NavTooltip>
        </Dock>
      </div>
    </nav>
  );
}
