import BlurFade from "@/components/magicui/blur-fade";
import { getProjectsList, projectSlug } from "@/lib/projects-route";
import Link from "next/link";
import type { Metadata } from "next";
import { paginate, normalizePage } from "@/lib/pagination";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Works",
  description: "Selected projects — apps, ML, and systems I've built.",
  openGraph: {
    title: "Works",
    description: "Selected projects — apps, ML, and systems I've built.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Works",
    description: "Selected projects — apps, ML, and systems I've built.",
  },
};

const PAGE_SIZE = 5;
const BLUR_FADE_DELAY = 0.04;

export default async function WorksPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;

  const projects = getProjectsList();

  const totalPages = Math.ceil(projects.length / PAGE_SIZE);
  const currentPage = normalizePage(pageParam, totalPages);
  const { items: paginated, pagination } = paginate(projects, {
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  return (
    <section id="works">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="flex flex-col gap-2 text-2xl font-semibold tracking-tight text-pretty sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2 mb-2">
          <span>Works</span>
          <span className="w-fit shrink-0 rounded-md border border-border bg-card px-2 py-1 text-sm font-normal text-muted-foreground">
            {projects.length} projects
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Selected builds — full-stack apps, ML, and experiments worth sharing.
        </p>
      </BlurFade>

      {paginated.length > 0 ? (
        <>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex flex-col gap-5">
              {paginated.map((project, id) => {
                const slug = projectSlug(project.title);
                const indexNumber = (pagination.page - 1) * PAGE_SIZE + id + 1;
                return (
                  <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={slug}>
                    <Link
                      className="flex items-start gap-x-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      href={`/works/${slug}`}
                    >
                      <span className="text-xs font-mono tabular-nums font-medium mt-[5px]">
                        {String(indexNumber).padStart(2, "0")}.
                      </span>
                      <div className="flex flex-col gap-y-2 flex-1 min-w-0">
                        <p className="tracking-tight text-lg font-medium">
                          <span className="group-hover:text-foreground transition-colors wrap-break-word">
                            {project.title}
                            <ChevronRight
                              className="ml-1 inline-block size-4 stroke-3 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shrink-0"
                              aria-hidden
                            />
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {project.dates}
                          {project.active ? " · Active" : ""}
                        </p>
                      </div>
                    </Link>
                  </BlurFade>
                );
              })}
            </div>
          </BlurFade>

          {pagination.totalPages > 1 && (
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="flex gap-3 flex-row items-center justify-between mt-8">
                <div className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </div>
                <div className="flex gap-2 sm:justify-end">
                  {pagination.hasPreviousPage ? (
                    <Link
                      href={`/works?page=${pagination.page - 1}`}
                      className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Previous
                    </Link>
                  ) : (
                    <span className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">
                      Previous
                    </span>
                  )}
                  {pagination.hasNextPage ? (
                    <Link
                      href={`/works?page=${pagination.page + 1}`}
                      className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      Next
                    </Link>
                  ) : (
                    <span className="h-8 w-fit px-2 flex items-center justify-center text-sm border border-border rounded-lg opacity-50 cursor-not-allowed">
                      Next
                    </span>
                  )}
                </div>
              </div>
            </BlurFade>
          )}
        </>
      ) : (
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex flex-col items-center justify-center py-12 px-4 border border-border rounded-xl">
            <p className="text-muted-foreground text-center">
              No projects listed yet.
            </p>
          </div>
        </BlurFade>
      )}
    </section>
  );
}
