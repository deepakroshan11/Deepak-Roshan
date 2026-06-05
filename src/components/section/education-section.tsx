/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { ArrowUpRight, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-contain flex-none"
      onError={() => setImageError(true)}
    />
  );
}

export default function EducationSection() {
  return (
    <div className="w-full grid gap-6">
      {DATA.education.map((edu) =>
        "description" in edu && edu.description ? (
          <Accordion
            key={edu.school}
            type="single"
            collapsible
            className="w-full grid gap-2"
          >
            <AccordionItem
              value={edu.school}
              className="w-full border-b-0 grid gap-2"
            >
              <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden py-1">
                <div className="flex w-full flex-col items-stretch gap-2 text-left sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <LogoImage src={edu.logoUrl} alt={edu.school} />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <span className="min-w-0 flex-1 font-semibold leading-snug [overflow-wrap:anywhere]">
                          {edu.school}
                        </span>
                        <div className="flex shrink-0 items-start gap-1.5 pt-0.5">
                          {edu.href ? (
                            <Link
                              href={edu.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex text-muted-foreground hover:text-foreground transition-colors"
                              aria-label={`${edu.school} (opens in new tab)`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                            </Link>
                          ) : null}
                          <span className="relative inline-flex h-3.5 w-3.5 shrink-0 items-center">
                            <ChevronRight
                              className={cn(
                                "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                                "translate-x-0 opacity-0",
                                "group-hover:translate-x-1 group-hover:opacity-100",
                                "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                              )}
                            />
                            <ChevronDown
                              className={cn(
                                "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                                "opacity-0 rotate-0",
                                "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                              )}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">
                        {edu.degree}
                      </div>
                      <div className="pt-0.5 text-xs leading-snug tabular-nums text-muted-foreground sm:hidden">
                        {edu.start} - {edu.end}
                      </div>
                    </div>
                  </div>
                  <div className="hidden w-[10rem] shrink-0 flex-col items-end pt-1 text-right text-xs tabular-nums text-muted-foreground sm:flex">
                    <span className="leading-snug">
                      {edu.start} - {edu.end}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0 ml-12 sm:ml-13 text-xs sm:text-sm text-muted-foreground whitespace-pre-line data-[state=closed]:animate-none">
                {edu.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <div
            key={edu.school}
            className="w-full border-b-0 grid gap-2"
          >
            <Link
              href={edu.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-stretch gap-2 py-1 group sm:flex-row sm:items-start sm:justify-between sm:gap-4"
            >
              <div className="flex min-w-0 flex-1 items-start gap-4">
                <LogoImage src={edu.logoUrl} alt={edu.school} />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex min-w-0 items-start justify-between gap-2">
                    <span className="min-w-0 flex-1 font-semibold leading-snug [overflow-wrap:anywhere]">
                      {edu.school}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" aria-hidden />
                  </div>
                  <div className="font-sans text-sm text-muted-foreground">
                    {edu.degree}
                  </div>
                  <div className="pt-0.5 text-xs leading-snug tabular-nums text-muted-foreground sm:hidden">
                    {edu.start} - {edu.end}
                  </div>
                </div>
              </div>
              <div className="hidden w-[10rem] shrink-0 flex-col items-end pt-1 text-right text-xs tabular-nums text-muted-foreground sm:flex">
                <span className="leading-snug">
                  {edu.start} - {edu.end}
                </span>
              </div>
            </Link>
          </div>
        )
      )}
    </div>
  );
}
