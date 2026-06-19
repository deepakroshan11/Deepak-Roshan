import { DATA } from "@/data/resume";
import {
  getProjectBySlug,
  getProjectNeighbors,
  getProjectsList,
  projectSlug,
} from "@/lib/projects-route";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Markdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { markdownExcerpt } from "@/lib/markdown-excerpt";

// Import animation components
import { FindoraAnimation } from "@/components/ProjectAnimations/FindoraAnimation";
import { VoxAIAnimation } from "@/components/ProjectAnimations/VoxAIAnimation";
import { ISLAnimation } from "@/components/ProjectAnimations/ISLAnimation";
import { CloudGuardAnimation } from "@/components/ProjectAnimations/CloudGuardAnimation";

// Animation component mapping
const animationComponents: Record<string, React.ComponentType> = {
  FindoraAnimation,
  VoxAIAnimation,
  ISLAnimation,
  CloudGuardAnimation,
};

export async function generateStaticParams() {
  return getProjectsList().map((project) => ({
    slug: projectSlug(project.title),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return undefined;

  const description = markdownExcerpt(project.description, 165);

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: "article",
      url: `${DATA.url}/works/${slug}`,
      images: [
        {
          url: `${DATA.url}/works/${slug}/opengraph-image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [`${DATA.url}/works/${slug}/opengraph-image`],
    },
  };
}

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const neighbors = getProjectNeighbors(slug);
  if (!neighbors) notFound();

  const { project, previous, next } = neighbors;

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: markdownExcerpt(project.description, 320),
    dateCreated: project.dates,
    url: project.href || `${DATA.url}/works/${slug}`,
    author: {
      "@type": "Person",
      name: DATA.name,
    },
  }).replace(/</g, "\\u003c");

  return (
    <section id="works">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div className="mb-6 flex flex-wrap items-center justify-start gap-3 gap-y-2">
        <Link
          href="/works"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-3 py-2 inline-flex items-center gap-1 group touch-manipulation min-h-11 sm:min-h-0 sm:px-2 sm:py-1.5"
          aria-label="Back to Works"
        >
          <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
          Back to Works
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="title wrap-break-word text-pretty text-[clamp(1.5rem,5vw+0.75rem,2.25rem)] font-semibold leading-tight tracking-tighter md:text-4xl">
          {project.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {project.dates}
          {project.active ? " · Active" : ""}
        </p>
      </div>
      <div className="my-6 flex w-full items-center">
        <div
          className="flex-1 h-px bg-border"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        />
      </div>
      <article className="prose prose-sm sm:prose-base max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
        <Markdown>{project.description}</Markdown>
      </article>

      {/* ANIMATION JOURNEY - NEW */}
      {"animationComponent" in project && project.animationComponent ? (
        <div className="not-prose mt-10 space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Demo
          </h2>
          {React.createElement(
            animationComponents[project.animationComponent as keyof typeof animationComponents]
          )}
        </div>
      ) : null}

      {project.video ? (
        <div className="mt-10">
          <h2 className="not-prose text-xl font-semibold tracking-tight text-foreground mb-3">
            Demo
          </h2>
          {project.video.endsWith(".webp") ? (
            <img
              src={project.video}
              alt={`${project.title} Teaser Demo`}
              className="w-full max-h-64 rounded-lg border object-cover bg-muted sm:max-h-96"
            />
          ) : (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-h-64 rounded-lg border object-cover bg-muted sm:max-h-96"
            />
          )}
        </div>
      ) : null}

      <div className="not-prose mt-10 space-y-3">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Tech stack
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs font-medium border-border"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="not-prose mt-8 flex flex-wrap items-center gap-3">
        {project.href ? (
          <Link
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary underline underline-offset-4"
          >
            {project.href.includes("github.com")
              ? "GitHub repository ↗"
              : "Live site ↗"}
          </Link>
        ) : null}
        {project.links?.map((link, idx) => (
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

      <nav className="mt-12 pt-8 max-w-2xl">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {previous ? (
            <Link
              href={`/works/${projectSlug(previous.title)}`}
              className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ChevronLeft className="size-3" />
                Previous
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors whitespace-normal wrap-break-word">
                {previous.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}

          {next ? (
            <Link
              href={`/works/${projectSlug(next.title)}`}
              className="group flex-1 flex flex-col gap-1 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors text-right"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next
                <ChevronRight className="size-3" />
              </span>
              <span className="text-sm font-medium group-hover:text-foreground transition-colors whitespace-normal wrap-break-word">
                {next.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block flex-1" />
          )}
        </div>
      </nav>
    </section>
  );
}

// Add React import for createElement
import React from "react";