import { Icons } from "@/components/icons";
import { HomeIcon, Layers } from "lucide-react";
import { Javascript } from "@/components/ui/svgs/javascript";
import { Typescript } from "@/components/ui/svgs/typescript";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Tailwindcss } from "@/components/ui/svgs/tailwindcss";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Fastapi } from "@/components/ui/svgs/fastapi";
import { Java } from "@/components/ui/svgs/java";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Mysql } from "@/components/ui/svgs/mysql";
import { Supabase } from "@/components/ui/svgs/supabase";
import { Azure } from "@/components/ui/svgs/azure";
import { Powerbi } from "@/components/ui/svgs/powerbi";
import { GoogleCloud } from "@/components/ui/svgs/googleCloud";
import { Git } from "@/components/ui/svgs/git";
import { Selenium } from "@/components/ui/svgs/selenium";
import type { ReactNode } from "react";

type ProjectLink = { type: string; href: string; icon: ReactNode };
type HackathonLink = { title: string; href: string; icon: ReactNode };

/** Optional rich fields for `/works/[slug]` pages */
type PortfolioProject = {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: string[];
  links: ProjectLink[];
  image: string;
  video: string;
  /** Mermaid source for an architecture diagram */
  architectureMermaid?: string;
};

export const DATA = {
  name: "Deepak Roshan",
  initials: "DR",
  url: "https://dillion.io",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "Software engineer and data analyst. University rank holder in Computer Science with a CGPA of 9.61, specializing in Artificial Intelligence and Data Science.",
  summary: `I'm a **software engineer and data analyst**, a **university rank holder** in Computer Science with a **CGPA of 9.61**, specializing in **Artificial Intelligence and Data Science**. I'm passionate about exploring new technologies and turning ideas into reality through thoughtful, well-crafted work.

I build where intelligent systems meet strong user experiences: production-grade web and mobile apps, custom **LLM** integrations, and hands-on **data analytics**.`,
  avatarUrl: "/me.jpeg?v=2",
  skills: [
    { name: "JavaScript", icon: Javascript },
    { name: "TypeScript", icon: Typescript },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "React", icon: ReactLight },
    { name: "Tailwind CSS", icon: Tailwindcss },
    { name: "Node.js", icon: Nodejs },
    { name: "Python", icon: Python },
    { name: "FastAPI (Python)", icon: Fastapi },
    { name: "Java", icon: Java },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "MySQL", icon: Mysql },
    { name: "Supabase", icon: Supabase },
    { name: "Microsoft Azure", icon: Azure },
    { name: "Power BI", icon: Powerbi },
    { name: "GCP", icon: GoogleCloud },
    { name: "Git", icon: Git },
    { name: "GitHub", icon: Icons.github },
    { name: "Selenium", icon: Selenium },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/works", icon: Layers, label: "Works" },
    {
      href: "/resume.pdf",
      icon: Icons.resume,
      label: "Resume",
      download: "Deepak-Roshan-Resume.pdf",
    },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/deepakroshan11",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/milanirosef/",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Hexaware Technologies",
      href: "https://www.hexaware.com",
      badges: [],
      location: "",
      title: "Data Analyst Intern",
      logoUrl: "/hexa.png",
      start: "Dec 2025",
      end: "March 2026",
      description:
        "Wrote and tuned PL/SQL procedures to automate reporting pipelines, then surfaced results in Power BI for business stakeholders. Paired with senior engineers to keep data accurate and core systems dependable at enterprise scale.",
    },
    {
      company: "Global Techno Solutions",
      href: "https://www.globaltechnosolutions.com",
      badges: [],
      location: "",
      title: "Machine Learning Intern",
      logoUrl: "/globaltech.png",
      start: "Jun 2024",
      end: "Jul 2024",
      description:
        "Trained and evaluated ML models for production use, tightened experiment hygiene (data splits, metrics, reproducibility), and picked up new tooling quickly to raise model quality and delivery speed.",
    },
  ],
  education: [
    {
      school: "Sri Krishna College of Technology",
      href: "https://hindustanuniv.ac.in/",
      degree:
        "B.Tech. in Computer Science (Specialization: AI & Data Science)",
      description: `CGPA: 9.61/10 · English (professional proficiency)

Blue Screen Programming Club (2024–2025)

Hosted Innothon 2025 CodeArena (1,000+ participants)`,
      logoUrl: "/hindustan.svg",
      start: "09.2022",
      end: "09.2026",
    },
    {
      school: "John Dewey Higher Secondary School",
      href: "https://zionschool.ac.in/",
      degree: "Higher secondary education",
      logoUrl: "/school.jpeg",
      start: "09.2017",
      end: "06.2022",
    },
  ],
  projects: [
    {
      title: "AI Powered Inventory Management System",
      href: "https://github.com/Milanirosefrancis/AI-powered-Inventory-Management",
      dates: "Jan 2024 – Feb 2024 (10-week CSE capstone)",
      active: true,
      description: `## Overview

A **full-stack inventory platform** for products, suppliers, stock levels, and purchase flows—designed as a **10-week final-year CSE project**. Phase 1 ships production-ready foundations: **JWT authentication**, **role-based access (admin / manager)**, **product & supplier CRUD** with search and filters, a **dashboard** with inventory insights, **low-stock alerts**, and a **PostgreSQL** schema managed with **Prisma**. Later phases add **Socket.io** chat, **OpenAI GPT‑4** for natural-language ops, **Google Document AI** for invoice OCR, and **demand / analytics** UI.

The public codebase lives on GitHub: **[Milanirosefrancis/AI-powered-Inventory-Management](https://github.com/Milanirosefrancis/AI-powered-Inventory-Management)**.

## What it solves

- **Single source of truth** for stock—replacing scattered spreadsheets with audited CRUD, low-stock signals, and structured supplier data (including GST-oriented fields).
- **Clear split of concerns**: Vite + React UI, Express API, Prisma data access, Redis for sessions/caching, and optional AI sidecars (\`ai-services\`) for GPT‑4 and Document AI.
- **Operability**: Docker Compose for Postgres + Redis, seed data for demos, structured logging (**Winston**), and CI via **GitHub Actions**.

## Highlights

- Dashboards and **Recharts**-driven analytics views for at-a-glance inventory health.
- **Zustand** for predictable client state; **React Hot Toast** for feedback.
- Extensible roadmap: real-time chat commands, conversational reorder, invoice ingestion, and forecasting—without rewriting the core domain model.`,
      technologies: [
        "React 18 + TypeScript",
        "Vite",
        "Tailwind CSS",
        "Zustand",
        "Recharts",
        "React Hot Toast",
        "Socket.io",
        "Node.js + Express",
        "JWT · bcrypt · Winston",
        "PostgreSQL",
        "Prisma ORM",
        "Redis",
        "OpenAI GPT-4 API",
        "Google Document AI",
        "Docker · Docker Compose",
        "GitHub Actions",
      ],
      links: [
        {
          type: "Source code",
          href: "https://github.com/Milanirosefrancis/AI-powered-Inventory-Management",
          icon: <Icons.github className="size-3" />,
        },
      ] as ProjectLink[],
      image: "",
      video: "",
      architectureMermaid: `flowchart TB
  subgraph FE["Frontend"]
    UI["React + TypeScript"]
    Vite["Vite dev/build"]
    UI --> Vite
  end
  subgraph BE["Backend API"]
    EX["Express + Node"]
    JWT["JWT / RBAC"]
    SOCK["Socket.io"]
    EX --> JWT
    EX --> SOCK
  end
  subgraph DATA["Data"]
    PG[("PostgreSQL")]
    PR["Prisma ORM"]
    RD[("Redis")]
    EX --> PR
    PR --> PG
    EX --> RD
  end
  subgraph AI["AI — phased"]
    OAI["OpenAI GPT-4"]
    DOC["Google Document AI"]
  end
  UI -->|REST JSON| EX
  SOCK <-->|live updates| UI
  EX -.->|Phase 3+| OAI
  EX -.->|Phase 4+| DOC`,
    } satisfies PortfolioProject,
    {
      title: "AI Coding Agent",
      href: "https://github.com/Milanirosefrancis/ai-coding-agent",
      dates: "2024 – Present",
      active: true,
      description: `## Overview

**AI Coding Agent** is a **local-first, multi-agent coding assistant** that plans work, writes and refines code, debugs failures, and uses tools against your filesystem and runtime. It runs on a **local LLM via [Ollama](https://ollama.com)** (e.g. **DeepSeek Coder**), so prompts and generated code stay on your machine—ideal when you want automation without sending proprietary repos to a hosted API.

The implementation follows a **specialized multi-agent pattern**: separate agents focus on **planning**, **implementation**, and **debugging**, coordinated through a **core orchestrator** and a **tools layer** (file ops, execution helpers, etc.). Long-horizon context is supported with **structured memory** (**[Supabase](https://supabase.com)**) and **semantic recall** via **[Chroma](https://www.trychroma.com/) vector memory**, so later steps can still “remember” earlier decisions and codebase facts.

**Repository:** **[Milanirosefrancis/ai-coding-agent](https://github.com/Milanirosefrancis/ai-coding-agent)** — clone it to run the CLI, configure Ollama, and wire optional memory backends from \`requirements.txt\`.

## What it can do

- **End-to-end project work** — describe a feature or greenfield task; the planner breaks it down, the coder generates patches, and the debugger tightens loops when something breaks.
- **GitHub-style inputs** — point the workflow at repositories or unpacked code so analysis and edits stay grounded in real project layout.
- **Links and external context** — fetch and reason about content from URLs when you need API docs, specs, or reference material alongside the repo.
- **Autonomous tool use** — the agent doesn’t only “chat”; it can execute allowed tools (per project safety rules) to read files, run commands, and iterate.

## Architecture (mental model)

1. **CLI** — you describe intent, approve or steer plans, and inspect logs.
2. **Core agent** — routes work to specialists and merges their outputs.
3. **Planner / Coder / Debugger** — narrow prompts and responsibilities reduce confusion and help the local model stay on task.
4. **Memory** — Supabase for durable session or project state; Chroma for embeddings-backed retrieval over notes, prior outputs, or indexed fragments.
5. **Ollama** — inference for all LLM turns; swap models by changing your Ollama tag.

## Why it’s interesting

Shipping a **multi-agent** system on a **local** stack forces clear boundaries between planning, coding, and verification—and makes **memory + retrieval** first-class instead of an afterthought. This repo is a solid base for experiments in **agentic workflows**, **RAG over dev artifacts**, and **tool-grounded code generation** without cloud lock-in.`,
      technologies: [
        "Python",
        "Ollama · DeepSeek Coder",
        "Multi-agent architecture",
        "Supabase (memory)",
        "Chroma · vector memory",
        "Flask API",
        "CLI",
        "Automatic tool execution",
        "GitHub & repo analysis",
        "Web / link analysis",
      ],
      links: [
        {
          type: "Source code",
          href: "https://github.com/Milanirosefrancis/ai-coding-agent",
          icon: <Icons.github className="size-3" />,
        },
      ] as ProjectLink[],
      image: "",
      video: "",
      architectureMermaid: `flowchart TB
  subgraph USER["You"]
    CLI["CLI interface"]
  end
  subgraph AGENTS["Agents"]
    CORE["Core agent"]
    PLAN["Planner agent"]
    CODE["Coder agent"]
    DBG["Debugger agent"]
    CORE --> PLAN
    PLAN --> CODE
    CODE --> DBG
    DBG --> CORE
  end
  subgraph MEM["Memory"]
    SUPA[("Supabase")]
    CHROMA[("Chroma vectors")]
  end
  subgraph RUN["Execution"]
    TOOLS["Tools layer"]
    OLLAMA["Ollama · local LLM"]
  end
  CLI --> CORE
  CORE --> TOOLS
  TOOLS --> OLLAMA
  CORE --> SUPA
  CORE --> CHROMA`,
    } satisfies PortfolioProject,
    {
      title: "Hand Gesture Controlled Motor System",
      href: "https://github.com/Milanirosefrancis/HandGesture-Motor-Control",
      dates: "May 26, 2025",
      active: false,
      description:
        "Uses a webcam, CVZone (MediaPipe), and OpenCV to read hand poses in real time; a Python client maps finger counts to motor commands and streams them over serial (PySerial) to an Arduino, which drives the motor—stop, forward, turn, and reverse from gestures alone.",
      technologies: [
        "Python",
        "OpenCV",
        "CVZone",
        "PySerial",
        "Arduino",
        "C++ / Arduino IDE",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Milanirosefrancis/HandGesture-Motor-Control",
          icon: <Icons.github className="size-3" />,
        },
      ] as ProjectLink[],
      image: "",
      video: "",
    },
    {
      title: "Leaf Disease Detection",
      href: "",
      dates: "May 26, 2025",
      active: false,
      description:
        "Computer vision pipeline for agriculture: preprocess leaf images, extract informative features, and classify common disease patterns so growers get early, low-cost screening before lab tests. Combines classical image processing with ML for robustness across lighting and background noise.",
      technologies: [
        "Computer Vision",
        "Machine Learning",
        "Image Processing",
        "Agriculture",
      ],
      links: [] as ProjectLink[],
      image: "",
      video: "",
    },
    {
      title: "llm.report",
      href: "https://llm.report",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Open-source observability for OpenAI workloads: log ChatGPT API calls, trace spend and latency, and iterate on prompts with clearer feedback loops.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Cloudflare Workers",
      ],
      links: [] as ProjectLink[],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
  ],
  hackathons: [
    {
      title: "Finalist — Smart India Hackathon 2025",
      dates: "2025",
      location: "India · AI & IoT track",
      description:
        "National finalist with an elephant-detection solution for forest corridors and conflict-prone edges: edge cameras or IoT sensors feed frames into a lightweight vision model to spot elephants near farms or roads, trigger timely alerts for rangers and communities, and log sightings for pattern review—reducing surprise encounters and crop damage while keeping hardware viable for remote deployment.",
      image: "/smt.webp",
      links: [] as HackathonLink[],
    },
    {
      title: "Winner — E-Hack Hackathon (E-Summit'25, SRM IST)",
      dates: "2025",
      location: "SRM Institute of Science and Technology",
      description:
        "Winner with the AI Powered Inventory Management System—forecasting, anomaly cues, and operational dashboards pitched end-to-end.",
      image: "/srm.jpg",
      links: [] as HackathonLink[],
    },
  ],
};
