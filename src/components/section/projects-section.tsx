/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { projectSlug } from "@/lib/projects-route";
import { ArrowUpRight, Box, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";

function ProjectLogo({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div
        className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex items-center justify-center flex-none"
        aria-hidden
      >
        <Box className="size-4 text-muted-foreground" strokeWidth={2} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border overflow-hidden object-cover flex-none"
      onError={() => setImageError(true)}
    />
  );
}

function projectSubtitle(project: (typeof DATA.projects)[number]) {
  const max = 4;
  const tech = project.technologies;
  const head = tech.slice(0, max).join(" · ");
  const tail = tech.length > max ? ` · +${tech.length - max}` : "";
  const active = project.active ? " · Active" : "";
  return `${head}${tail}${active}`;
}

export default function ProjectsSection() {
  return (
    <Accordion type="single" collapsible className="w-full grid gap-6">
      {DATA.projects.map((project, idx) => (
        <BlurFade
          key={project.title}
          inView={true}
          xOffset={80}
          yOffset={0}
          delay={idx * 0.06}
        >
          <AccordionItem
            value={project.title}
            className="w-full border border-border bg-card rounded-lg overflow-hidden hover:border-foreground/15 transition-all duration-300 data-[state=open]:border-foreground/30 data-[state=open]:shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:data-[state=open]:shadow-[0_8px_30px_rgba(255,255,255,0.015)]"
          >
            <AccordionTrigger className="hover:no-underline p-4 cursor-pointer w-full group [&>svg]:hidden">
              <div className="flex w-full flex-col items-stretch gap-2 text-left sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <ProjectLogo src={project.image} alt={project.title} />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex min-w-0 items-start justify-between gap-2">
                      <span className="min-w-0 flex-1 font-semibold leading-snug text-balance [overflow-wrap:anywhere]">
                        {project.title}
                      </span>
                      <div className="flex shrink-0 items-start gap-1.5 pt-0.5">
                        {project.href ? (
                          <Link
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={`${project.title} (opens in new tab)`}
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
                    <div className="font-sans text-sm text-muted-foreground line-clamp-2">
                      {projectSubtitle(project)}
                    </div>
                    <div className="pt-0.5 text-xs leading-snug tabular-nums text-muted-foreground sm:hidden">
                      {project.dates}
                    </div>
                  </div>
                </div>
                <div className="hidden w-[10rem] shrink-0 flex-col items-end gap-1 pt-1 text-right text-xs tabular-nums text-muted-foreground sm:flex">
                  <span className="leading-snug">{project.dates}</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="grid gap-3 px-4 pb-4 pl-16 text-xs text-muted-foreground sm:pl-18 sm:text-sm">
              <div className="prose prose-sm max-w-full text-pretty font-sans leading-relaxed dark:prose-invert">
                <Markdown>{project.description}</Markdown>
              </div>
              <Link
                href={`/works/${projectSlug(project.title)}`}
                className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/90 w-fit"
                onClick={(e) => e.stopPropagation()}
              >
                Project page →
              </Link>
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full max-h-40 rounded-lg border object-cover bg-muted sm:max-h-52"
                />
              ) : null}
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[11px] font-medium h-6 px-2 border-border"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              {project.links && project.links.length > 0 ? (
                <div className="flex flex-wrap gap-2 pb-1">
                  {project.links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Badge className="flex items-center gap-1.5 text-xs bg-foreground text-background hover:bg-foreground/90 h-7 cursor-pointer">
                        {link.icon}
                        {link.type}
                      </Badge>
                    </Link>
                  ))}
                </div>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        </BlurFade>
      ))}
    </Accordion>
  );
}
