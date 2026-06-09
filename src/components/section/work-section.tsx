/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import SlideIn from "@/components/slide-in";
import Markdown from "react-markdown";

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

export default function WorkSection() {
  return (
    <Accordion type="single" collapsible className="w-full grid gap-6">
      {DATA.work.map((work, idx) => (
        <SlideIn
          key={work.company}
          inView={true}
          xOffset={80}
          delay={idx * 0.05}
        >
          <AccordionItem
            value={work.company}
            className="w-full border-b-0 grid gap-2"
          >
            <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden py-1">
                <div className="flex w-full flex-col items-stretch gap-2 text-left sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <LogoImage src={work.logoUrl} alt={work.company} />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <div className="font-semibold leading-snug flex items-start gap-2 flex-wrap">
                        {work.company}
                        <span className="relative inline-flex items-center w-3.5 h-3.5 shrink-0 mt-0.5">
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
                      <div className="font-sans text-sm text-muted-foreground">
                        {work.title}
                      </div>
                      <div className="pt-0.5 text-xs leading-snug tabular-nums text-muted-foreground sm:hidden">
                        {work.start} - {work.end ?? "Present"}
                      </div>
                    </div>
                  </div>
                  <div className="hidden w-[10rem] shrink-0 flex-col items-end pt-1 text-right text-xs tabular-nums text-muted-foreground sm:flex">
                    <span className="leading-snug">
                      {work.start} - {work.end ?? "Present"}
                    </span>
                  </div>
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 ml-12 sm:ml-13 text-xs sm:text-sm text-muted-foreground prose dark:prose-invert max-w-none prose-sm leading-relaxed [overflow-wrap:anywhere] prose-p:my-1 prose-ul:my-1 prose-li:my-0.5">
              <Markdown>{work.description}</Markdown>
            </AccordionContent>
          </AccordionItem>
        </SlideIn>
      ))}
    </Accordion>
  );
}

