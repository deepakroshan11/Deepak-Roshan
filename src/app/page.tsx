import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { HeroProfileAvatar } from "@/components/hero-profile-avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import EducationSection from "@/components/section/education-section";

const BLUR_FADE_DELAY = 0.04;

const sectionTitleClass =
  "text-xl font-bold tracking-tight text-foreground sm:text-2xl";

export default function Page() {
  return (
    <main className="relative flex min-h-dvh w-full min-w-0 flex-col gap-10 sm:gap-12 md:gap-20 lg:gap-24">
      {/* Hero — Magic UI: avatar + copy row; stack only on very narrow screens */}
      <section id="hero" className="scroll-mt-24 md:scroll-mt-28">
        <div className="flex flex-col items-start gap-4 min-[400px]:flex-row min-[400px]:items-start sm:gap-6 md:gap-8 md:justify-between">
          <div className="order-2 flex min-w-0 w-full flex-1 flex-col gap-3 text-left md:order-1 md:max-w-xl">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-balance break-words text-[clamp(1.5rem,4.2vw+1rem,1.85rem)] font-bold leading-[1.12] tracking-tighter text-foreground sm:text-[clamp(1.85rem,4vw+1rem,3rem)] sm:leading-[1.08] md:text-5xl xl:text-6xl xl:leading-[1.1]"
              yOffset={8}
              text={`Hi, I'm ${DATA.name}`}
            />
            <BlurFadeText
              className="text-pretty text-sm leading-[1.65] text-muted-foreground sm:text-base sm:leading-relaxed md:max-w-[550px] md:text-lg lg:text-xl"
              delay={BLUR_FADE_DELAY}
              text={DATA.description}
            />
          </div>
          <BlurFade
            delay={BLUR_FADE_DELAY}
            className="order-1 shrink-0 self-start pt-0.5 md:order-2 md:pt-1"
          >
            <HeroProfileAvatar
              name={DATA.name}
              initials={DATA.initials}
              src={DATA.avatarUrl}
              className="size-[7rem] border-2 border-border/80 shadow-[0_8px_30px_-8px_rgb(0_0_0/0.25)] ring-4 ring-background min-[400px]:size-[7.5rem] md:size-32 lg:size-36 dark:shadow-[0_8px_32px_-10px_rgb(0_0_0/0.55)] rounded-full"
              imageClassName="origin-center object-[55%_28%] scale-[1.14] brightness-[1.15] contrast-[1.1] saturate-[1.06]"
            />
          </BlurFade>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 md:scroll-mt-28">
        <div className="flex flex-col gap-4 md:gap-5">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className={sectionTitleClass}>About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose prose-sm sm:prose-base prose-p:mb-4 prose-p:last:mb-0 prose-p:leading-[1.7] sm:prose-p:leading-relaxed w-full max-w-none text-pretty font-sans text-muted-foreground dark:prose-invert prose-strong:text-foreground prose-strong:font-semibold">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="work" className="scroll-mt-24 md:scroll-mt-28">
        <div className="flex flex-col gap-4 md:gap-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className={sectionTitleClass}>Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>

      <section id="education" className="scroll-mt-24 md:scroll-mt-28">
        <div className="flex flex-col gap-4 md:gap-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className={sectionTitleClass}>Education</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <EducationSection />
          </BlurFade>
        </div>
      </section>

      <section id="skills" className="scroll-mt-24 scroll-pt-20 md:scroll-mt-28 md:scroll-pt-24">
        <div className="flex flex-col gap-4 pt-1">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className={sectionTitleClass}>Skills</h2>
          </BlurFade>
          <div className="flex w-full flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <div className="flex min-h-8 w-fit max-w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-1.5 ring-2 ring-border/20 sm:h-8 sm:px-4 sm:py-0">
                  {skill.icon && (
                    <skill.icon className="size-4 shrink-0 overflow-hidden rounded object-contain" />
                  )}
                  <span className="break-words text-sm font-medium text-foreground [overflow-wrap:anywhere]">
                    {skill.name}
                  </span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 md:scroll-mt-28">
        <div className="flex flex-col gap-4 md:gap-6">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <h2 className={sectionTitleClass}>Projects</h2>
              <Link
                href="/works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline w-fit shrink-0"
              >
                View all works
              </Link>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <ProjectsSection />
          </BlurFade>
        </div>
      </section>

      <section id="hackathons" className="scroll-mt-24 md:scroll-mt-28">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>

      <section id="contact" className="scroll-mt-24 md:scroll-mt-28 pb-6">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
