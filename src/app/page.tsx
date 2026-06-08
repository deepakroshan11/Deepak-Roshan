import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { PendulumIDCard } from "@/components/pendulum-id-card";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import CertificationsSection from "@/components/section/certifications-section"; // ← ADD THIS
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import EducationSection from "@/components/section/education-section";
import { SkillsBubbles } from "@/components/skills-bubbles";
import ParenthesesParticles from "@/components/parentheses-particles";
import Footer from "@/components/footer";

const BLUR_FADE_DELAY = 0.04;

const sectionTitleClass =
  "text-xl font-bold tracking-tight text-foreground sm:text-2xl";

export default function Page() {
  return (
    <main className="relative flex min-h-dvh w-full min-w-0 flex-col gap-10 sm:gap-12 md:gap-20 lg:gap-24">
      {/* Hero — ID card + copy; card sits on the right, strap extends to page top */}
      <section id="hero" className="scroll-mt-24 md:scroll-mt-28 overflow-visible">
        <div className="flex flex-col items-start gap-6 min-[400px]:flex-row min-[400px]:items-start sm:gap-6 md:gap-8 md:justify-between overflow-visible">
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
          {/* Pendulum ID Card — strap extends above via absolute positioning */}
          <div className="order-1 shrink-0 self-start md:order-2 overflow-visible">
            <PendulumIDCard />
          </div>
        </div>
      </section>

      <section id="about" className="relative scroll-mt-24 md:scroll-mt-28">
        {/* Floating Particles in the Left Margin (positioned deep in the page corner with wider 3D projection canvas) */}
        <div className="absolute left-[-380px] top-[-50px] w-[280px] h-[380px] hidden xl:block pointer-events-auto">
          <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
            <ParenthesesParticles />
          </BlurFade>
        </div>

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
            <div className="flex flex-col gap-2">
              <h2 className={sectionTitleClass}>Skills</h2>
              <div className="flex items-center justify-center gap-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a96e] my-2">
                <span className="h-[1px] w-6 sm:w-8 bg-[#c8a96e]/30" />
                Click & drag to explore
                <span className="h-[1px] w-6 sm:w-8 bg-[#c8a96e]/30" />
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <SkillsBubbles />
          </BlurFade>
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

      {/* ← CERTIFICATIONS SECTION ADDED HERE */}
      <section id="certifications" className="scroll-mt-24 md:scroll-mt-28">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <CertificationsSection />
        </BlurFade>
      </section>

      <section id="contact" className="scroll-mt-24 md:scroll-mt-28 pb-6">
        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <ContactSection />
        </BlurFade>
      </section>

      <Footer />
    </main>
  );
}