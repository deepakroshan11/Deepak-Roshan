"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type HeroProfileAvatarProps = {
  name: string;
  initials: string;
  src: string;
  className?: string;
  imageClassName?: string;
};

/**
 * Best-effort friction for casual save/copy via context menu or drag.
 * The image URL still ships to the browser, so determined users can capture it
 * (DevTools, network tab, screenshots). This does not provide real protection.
 */
export function HeroProfileAvatar({
  name,
  initials,
  src,
  className,
  imageClassName,
}: HeroProfileAvatarProps) {
  return (
    <div
      className={cn(
        "select-none [-webkit-touch-callout:none] [-webkit-user-drag:none] [&_*]:[-webkit-user-drag:none]"
      )}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      <Avatar className={cn(className, "select-none")}>
        <AvatarImage
          alt={name}
          src={src}
          draggable={false}
          className={cn(
            imageClassName,
            "pointer-events-none select-none [-webkit-user-drag:none]"
          )}
        />
        <AvatarFallback className="select-none">{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}
