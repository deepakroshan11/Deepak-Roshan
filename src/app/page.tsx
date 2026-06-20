import SlideIn from "@/components/slide-in";
import { PendulumIDCard } from "@/components/pendulum-id-card";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import CertificationsSection from "@/components/section/certifications-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import EducationSection from "@/components/section/education-section";
import { SkillsBubbles } from "@/components/skills-bubbles";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/scroll-reveal";
import SectionDivider from "@/components/section-divider";

const BLUR_FADE_DELAY = 0.04;

const sectionTitleClass =
  "text-xl font-bold tracking-tight text-foreground sm:text-2xl";

export default function Page() {
  return (
    <main className="relative flex min-h-dvh w-full min-w-0 flex-col gap-10 sm:gap-12 md:gap-20 lg:gap-24">
      {/* Hero — ID card + copy; card sits on the right, strap extends to page top */}
    <ScrollReveal>
        <section id="hero" className="scroll-mt-20 md:scroll-mt-28 overflow-visible">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-6 md:gap-8 md:justify-between overflow-visible">
            <SlideIn
              inView={true}
              xOffset={80}
              yOffset={0}
              delay={0.24}
              className="order-2 flex min-w-0 w-full flex-1 flex-col gap-3 text-left sm:order-1 md:max-w-xl"
            >
              <h1 className="text-balance break-words text-[clamp(1.65rem,6vw,1.85rem)] font-bold leading-[1.12] tracking-tighter text-foreground sm:text-[clamp(1.85rem,4vw+1rem,3rem)] sm:leading-[1.08] md:text-5xl xl:text-6xl xl:leading-[1.1]">
                Hi, I&apos;m {DATA.name}
              </h1>
              <p className="text-pretty text-sm leading-[1.65] text-muted-foreground sm:text-base sm:leading-relaxed md:max-w-[550px] md:text-lg lg:text-xl">
                {DATA.description}
              </p>
            </SlideIn>
            {/* Pendulum ID Card — centered on mobile, right-side on desktop */}
            <SlideIn
              inView={true}
              xOffset={0}
              yOffset={100}
              delay={BLUR_FADE_DELAY}
              className="order-1 flex justify-center w-full sm:w-auto sm:shrink-0 sm:self-start sm:order-2 overflow-visible"
            >
              <PendulumIDCard />
            </SlideIn>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal className="-my-5 sm:-my-6 md:-my-10 lg:-my-12">
        <SectionDivider delay={BLUR_FADE_DELAY * 2} />
      </ScrollReveal>

      <ScrollReveal>
        <section id="about" className="relative scroll-mt-24 md:scroll-mt-28">
          <div className="flex flex-col gap-4 md:gap-5">
            <SlideIn delay={BLUR_FADE_DELAY * 3} inView={true} xOffset={80}>
              <h2 className={sectionTitleClass}>About</h2>
            </SlideIn>
            <SlideIn delay={BLUR_FADE_DELAY * 4} inView={true} xOffset={80}>
              <div className="prose prose-sm sm:prose-base prose-p:mb-4 prose-p:last:mb-0 prose-p:leading-[1.7] sm:prose-p:leading-relaxed w-full max-w-none text-pretty font-sans text-muted-foreground dark:prose-invert prose-strong:text-foreground prose-strong:font-semibold">
                <Markdown>{DATA.summary}</Markdown>
              </div>
            </SlideIn>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal className="-my-5 sm:-my-6 md:-my-10 lg:-my-12">
        <SectionDivider delay={BLUR_FADE_DELAY * 4.5} />
      </ScrollReveal>

      <ScrollReveal>
        <section id="work" className="scroll-mt-24 md:scroll-mt-28">
          <div className="flex flex-col gap-4 md:gap-6">
            <SlideIn delay={BLUR_FADE_DELAY * 5} inView={true} xOffset={80}>
              <h2 className={sectionTitleClass}>Work Experience</h2>
            </SlideIn>
            <WorkSection />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal className="-my-5 sm:-my-6 md:-my-10 lg:-my-12">
        <SectionDivider delay={BLUR_FADE_DELAY * 5.5} />
      </ScrollReveal>

      <ScrollReveal>
        <section id="education" className="scroll-mt-24 md:scroll-mt-28">
          <div className="flex flex-col gap-4 md:gap-6">
            <SlideIn delay={BLUR_FADE_DELAY * 6} inView={true} xOffset={80}>
              <h2 className={sectionTitleClass}>Education</h2>
            </SlideIn>
            <EducationSection />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal className="-my-5 sm:-my-6 md:-my-10 lg:-my-12">
        <SectionDivider delay={BLUR_FADE_DELAY * 6.5} />
      </ScrollReveal>

      <ScrollReveal>
        <section id="skills" className="scroll-mt-24 scroll-pt-20 md:scroll-mt-28 md:scroll-pt-24">
          <div className="flex flex-col gap-4 pt-1">
            <SlideIn delay={BLUR_FADE_DELAY * 7} inView={true} xOffset={80}>
              <div className="flex flex-col gap-2">
                <h2 className={sectionTitleClass}>Skills</h2>
                <div className="flex items-center justify-center gap-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a96e] my-2">
                  <span className="h-[1px] w-6 sm:w-8 bg-[#c8a96e]/30" />
                  <span className="hidden touch-hidden sm:inline">Click &amp; drag to explore</span>
                  <span className="sm:hidden">Touch &amp; drag to explore</span>
                  <span className="h-[1px] w-6 sm:w-8 bg-[#c8a96e]/30" />
                </div>
              </div>
            </SlideIn>
            <SlideIn delay={BLUR_FADE_DELAY * 8} inView={true} xOffset={80}>
              <SkillsBubbles />
            </SlideIn>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal className="-my-5 sm:-my-6 md:-my-10 lg:-my-12">
        <SectionDivider delay={BLUR_FADE_DELAY * 8.5} />
      </ScrollReveal>

      <ScrollReveal>
        <section id="projects" className="scroll-mt-24 md:scroll-mt-28">
          <div className="flex flex-col gap-4 md:gap-6">
            <SlideIn delay={BLUR_FADE_DELAY * 9} inView={true} xOffset={80}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <h2 className={sectionTitleClass}>Projects</h2>
                <Link
                  href="/works"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline w-fit shrink-0"
                >
                  View all works
                </Link>
              </div>
            </SlideIn>
            <ProjectsSection />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal className="-my-5 sm:-my-6 md:-my-10 lg:-my-12">
        <SectionDivider delay={BLUR_FADE_DELAY * 9.5} />
      </ScrollReveal>

      <ScrollReveal>
        <section id="hackathons" className="scroll-mt-24 md:scroll-mt-28">
          <HackathonsSection />
        </section>
      </ScrollReveal>

      <ScrollReveal className="-my-5 sm:-my-6 md:-my-10 lg:-my-12">
        <SectionDivider delay={BLUR_FADE_DELAY * 10} />
      </ScrollReveal>

      <ScrollReveal>
        <section id="certifications" className="scroll-mt-24 md:scroll-mt-28">
          <CertificationsSection />
        </section>
      </ScrollReveal>

      <ScrollReveal className="-my-5 sm:-my-6 md:-my-10 lg:-my-12">
        <SectionDivider delay={BLUR_FADE_DELAY * 11} />
      </ScrollReveal>

      <ScrollReveal>
        <section id="contact" className="scroll-mt-24 md:scroll-mt-28 pb-6">
          <ContactSection />
        </section>
      </ScrollReveal>

      <Footer />
    </main>
  );
}