import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { HackathonLogo } from "@/components/section/hackathon-logo";
import { Timeline, TimelineItem, TimelineConnectItem } from "@/components/timeline";

const HACKATHONS_INTRO =
  "";

// ============================================
// TYPE DEFINITIONS
// ============================================

type HackathonEntry = (typeof DATA.hackathons)[number];
type HackathonLinkItem = NonNullable<HackathonEntry["links"]>[number];

// ============================================
// COMPONENTS
// ============================================

function HackathonExternalLink(props: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  const { href, label, icon } = props;
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Badge className="flex items-center gap-1.5 bg-primary px-2 py-1 text-xs text-primary-foreground">
        {icon}
        <span>{label}</span>
      </Badge>
    </Link>
  );
}

function HackathonLinkList(props: { links?: HackathonLinkItem[] }) {
  const { links } = props;
  if (!links || links.length === 0) {
    return null;
  }
  return (
    <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
      {links.map((l, idx) => (
        <HackathonExternalLink
          key={idx}
          href={l.href}
          label={l.title}
          icon={l.icon}
        />
      ))}
    </div>
  );
}

function HackathonTeamInfo(props: { entry: HackathonEntry }) {
  const { entry } = props;
  const teamInfo = [
    entry.team,
    entry.teamLead && `Lead: ${entry.teamLead}`,
    entry.department,
    entry.theme,
  ]
    .filter(Boolean)
    .join(" · ");

  if (!teamInfo) return null;

  return (
    <p className="text-xs font-medium text-muted-foreground">
      {teamInfo}
    </p>
  );
}

function HackathonProblemStatement(props: { entry: HackathonEntry }) {
  const { entry } = props;

  if (!entry.problemStatement) return null;

  return (
    <div className="mt-2 rounded-md bg-muted/30 p-3 border border-muted">
      <p className="text-xs font-semibold text-foreground">
        Problem Statement {entry.problemStatement.id}
      </p>
      <p className="text-xs leading-relaxed text-muted-foreground mt-1.5">
        {entry.problemStatement.title}
      </p>
    </div>
  );
}

function HackathonAchievementBadge(props: { achievement: string }) {
  const { achievement } = props;
  const badgeVariant = achievement.includes("Winner")
    ? "default"
    : achievement.includes("Top")
      ? "secondary"
      : "outline";

  return (
    <Badge variant={badgeVariant} className="text-xs font-semibold">
      {achievement}
    </Badge>
  );
}

function HackathonTimelineEntry(props: { entry: HackathonEntry }) {
  const { entry } = props;
  const subline = [entry.dates, entry.location].filter(Boolean).join(" · ");

  return (
    <TimelineItem className="flex w-full items-start justify-between gap-3 sm:gap-6 lg:gap-10">
      <TimelineConnectItem className="flex items-start justify-center pt-0.5">
        <HackathonLogo src={""} eventName={entry.title} />
      </TimelineConnectItem>

      <div className="flex min-w-0 flex-1 flex-col justify-start gap-2">
        {/* Title & Achievement Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-balance font-semibold leading-snug">
              {entry.title}
            </h3>
            {subline && (
              <p className="text-xs text-muted-foreground mt-1">{subline}</p>
            )}
          </div>
          <HackathonAchievementBadge achievement={entry.achievement} />
        </div>

        {/* Team Info */}
        <HackathonTeamInfo entry={entry} />

        {/* Problem Statement */}
        <HackathonProblemStatement entry={entry} />

        {/* Links */}
        <HackathonLinkList links={entry.links} />
      </div>
    </TimelineItem>
  );
}

// ============================================
// MAIN SECTION
// ============================================

export default function HackathonsSection() {
  const list = DATA.hackathons;

  return (
    <div className="w-full min-w-0 overflow-hidden">
      <div className="flex min-h-0 w-full flex-col gap-y-8">
        <div className="flex w-full flex-col gap-y-4 text-left">
          <div className="flex w-full items-center">
            <div className="h-px flex-1 bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="z-10 shrink-0 rounded-xl border bg-primary px-4 py-1">
              <span className="text-sm font-medium text-background">
                Hackathons
              </span>
            </div>
            <div className="h-px flex-1 bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>

          <div className="flex w-full flex-col gap-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Hackathons
            </h2>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg md:leading-relaxed lg:text-base lg:leading-relaxed">
              {HACKATHONS_INTRO}
            </p>
          </div>
        </div>

        <Timeline>
          {list.map((entry) => (
            <HackathonTimelineEntry
              key={entry.id}
              entry={entry}
            />
          ))}
        </Timeline>
      </div>
    </div>
  );
}