import { Icons } from "@/components/icons";
import { HomeIcon, Layers } from "lucide-react";
import { Python } from "@/components/ui/svgs/python";
import { Fastapi } from "@/components/ui/svgs/fastapi";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { Docker } from "@/components/ui/svgs/docker";
import { Supabase } from "@/components/ui/svgs/supabase";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Git } from "@/components/ui/svgs/git";
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
  animationComponent?: string;
};

export const DATA = {
  name: "Deepak Roshan",
  initials: "DR",
  url: "https://deepakroshan.is-a.dev",
  location: "Coimbatore, Tamil Nadu",
  locationLink: "https://www.google.com/maps/place/Coimbatore",
  description:
    "AI Engineer. I build intelligent systems — from model to cloud — and ship them live.",
  summary: `I'm an **AI Engineer** and final-year B.E. student in **Artificial Intelligence & Machine Learning** at Sri Krishna College of Technology, Coimbatore.

I build and deploy end-to-end AI systems — real-time computer vision pipelines, zero-shot voice cloning, multimodal lost-and-found platforms, and self-healing AWS cloud infrastructure. Every project I ship is **live and production-ready**.

My stack: **Python · FastAPI · TensorFlow · AWS · Docker · React**. I care about understanding every layer — no black-box frameworks, no shortcuts.`,
  avatarUrl: "/me.jpeg?v=2",
  skills: [
    { name: "Python", icon: Python },
    { name: "FastAPI", icon: Fastapi },
    { name: "TensorFlow", icon: Python },
    { name: "OpenCV", icon: Python },
    { name: "React", icon: ReactLight },
    { name: "Docker", icon: Docker },
    { name: "AWS (EC2 · Lambda · SNS)", icon: Icons.globe },
    { name: "Supabase", icon: Supabase },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Cloudinary", icon: Icons.globe },
    { name: "Hugging Face Spaces", icon: Icons.globe },
    { name: "GitHub Actions (CI/CD)", icon: Icons.github },
    { name: "Linux / Shell", icon: Git },
    { name: "Git", icon: Git },
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
    email: "deepakroshan380@gmail.com",
    tel: "+919361940512",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/deepakroshan11",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/deepakroshan-adr/",
        icon: Icons.linkedin,
        navbar: true,
      },
      YouTube: {
        name: "YouTube",
        url: "https://www.youtube.com/@deepakroshan6929",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:deepakroshan380@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Appin Technology",
      href: "",
      badges: [],
      location: "Coimbatore, Tamil Nadu",
      title: "Cloud Operations Intern",
      logoUrl: "/appin-logo.jpeg",
      start: "Apr 2025",
      end: "Jun 2025",
      description:
        "Deployed applications on AWS (EC2, S3, Lambda) using Linux. Automated deployment and system tasks with shell scripts. Monitored systems and logs using cron and htop. Optimized cloud resources for better performance.",
    },
  ],

  education: [
    {
      school: "Sri Krishna College of Technology",
      href: "https://skct.edu.in/",
      degree: "B.E. in Artificial Intelligence and Machine Learning",
      description: `CGPA: 7.0 / 10  ·  2022 – 2026`,
      logoUrl: "/skct-Logo.png",
      start: "2022",
      end: "2026",
    },
    {
      school: "John Dewey Matric. Higher Secondary School",
      href: "http://panruti.johndeweyschools.com/",
      degree: "Higher Secondary Education (Science)",
      logoUrl: "/school-logo.png",
      start: "2017",
      end: "2022",
    },
  ],

  projects: [
    {
      title: "Findora – AI-Powered Lost and Found",
      href: "https://findora-ai-lost-found.vercel.app/",
      dates: "2024",
      active: true,
      description: `## Overview

**Findora** is a full-stack lost-and-found platform that uses **image, text, and location data** to match lost items with found reports automatically — no manual search required.

## How it works

- **MobileNetV3** extracts visual feature embeddings from item photos.
- **MiniLM** encodes text descriptions into semantic vectors.
- A **fusion scoring system** combines vision + text similarity to rank matches and trigger email alerts for high-confidence results.
- Items are stored in **Supabase** (PostgreSQL) with **Cloudinary** for image hosting.

## What makes it interesting

Built without a pre-packaged matching framework — the multimodal fusion scoring logic is hand-rolled, which means the ranking behavior is fully explainable and tunable. Deployed with a **React + Vite** frontend on Vercel and a **FastAPI** backend on Render, with UptimeRobot pinging to prevent cold starts.`,
      technologies: [
        "React",
        "Vite",
        "FastAPI",
        "Python",
        "MobileNetV3",
        "MiniLM",
        "Supabase",
        "PostgreSQL",
        "Cloudinary",
        "Vercel",
        "Render",
      ],
      links: [
        {
          type: "Live Demo",
          href: "https://findora-ai-lost-found.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/deepakroshan11/findora-ai-lost-found",
          icon: <Icons.github className="size-3" />,
        },
      ] as ProjectLink[],
      image: "",
      video: "",
      animationComponent: "FindoraAnimation",
    } satisfies PortfolioProject,

    {
      title: "VoxAI – Neural Voice Clone Studio",
      href: "https://huggingface.co/spaces/deepakroshan/voxai",
      dates: "2025",
      active: true,
      description: `## Overview

**VoxAI** is a zero-shot voice cloning studio — give it a short audio sample and it generates speech in that voice, preserving accent and tone.

## How it works

- **ChatterboxTTS** handles zero-shot voice synthesis — no fine-tuning required.
- A **7-stage professional DSP audio chain** post-processes the output: bass restoration → de-noising → harmonic extension → multiband dynamics → room tone removal → LUFS normalization → true-peak limiting.
- The frontend features a **vinyl disc recorder animation** for a polished UX.
- Deployed as a **FastAPI** app on **Hugging Face Spaces** via Docker.

## What makes it interesting

The DSP pipeline transforms raw TTS output into broadcast-quality audio — a layer most voice cloning demos skip entirely. Every stage is individually tunable, making the quality uplift measurable and explainable.`,
      technologies: [
        "Python",
        "FastAPI",
        "ChatterboxTTS",
        "DSP Audio Pipeline",
        "Docker",
        "Hugging Face Spaces",
        "HTML / CSS / JS",
      ],
      links: [
        {
          type: "Live Demo",
          href: "https://huggingface.co/spaces/deepakroshan/voxai",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/deepakroshan11/voxai-voice-clone",
          icon: <Icons.github className="size-3" />,
        },
      ] as ProjectLink[],
      image: "",
      video: "",
      animationComponent: "VoxAIAnimation",
    } satisfies PortfolioProject,

    {
      title: "ISL Translator – Sign Language AI",
      href: "https://huggingface.co/spaces/deepakroshan/isl-detection",
      dates: "2025",
      active: true,
      description: `## Overview

A real-time **Indian Sign Language (ISL) translation system** with emotion awareness — built without relying on pre-packaged gesture recognition libraries for the core model.

## How it works

- **MediaPipe** extracts hand and facial landmark keypoints from live webcam video.
- A **TensorFlow CNN** trained on the raw keypoint data achieves **~95% accuracy** on ISL gestures.
- **Emotion detection** uses facial landmarks with temporal smoothing to prevent jitter.
- A **speech-to-sign avatar** renders signs from spoken input using **Three.js** and the Web Speech API.
- Deployed on **Hugging Face Spaces** with a Flask + Socket.IO backend running as a single-process daemon thread (fixed shared-memory IPC failure from the original two-process supervisord architecture).

## What makes it interesting

The finger curl values for gesture recognition are derived directly from MediaPipe landmark geometry — no hard-coded thresholds, fully data-driven. The hand tracking overlay shows live skeleton + hold-progress arc for a clear visual feedback loop.`,
      technologies: [
        "TensorFlow",
        "MediaPipe",
        "Flask",
        "Socket.IO",
        "Three.js",
        "Web Speech API",
        "Python",
        "OpenCV",
        "Hugging Face Spaces",
        "Docker",
      ],
      links: [
        {
          type: "Live Demo",
          href: "https://huggingface.co/spaces/deepakroshan/isl-detection",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/deepakroshan11/ISL-Mobile-Cloud-Version",
          icon: <Icons.github className="size-3" />,
        },
      ] as ProjectLink[],
      image: "",
      video: "",
      animationComponent: "ISLAnimation",
    } satisfies PortfolioProject,

    {
      title: "CloudGuard AI – Self-Healing Cloud Monitor",
      href: "http://13.201.191.91:8501/",
      dates: "2025",
      active: true,
      description: `## Overview

**CloudGuard AI** is an intelligent AWS infrastructure monitor that detects anomalies in real time and **automatically heals itself** — without manual intervention.

## How it works

- **CloudWatch** streams real-time EC2 metrics (CPU, memory, network) into the pipeline.
- **Isolation Forest** (unsupervised ML) detects anomalies in system behavior without needing labeled failure data.
- When an anomaly is confirmed, **AWS Lambda** triggers automated remediation — restart, scale, or alert.
- **SNS** sends instant notifications to operators.
- A **Streamlit dashboard** visualizes live metrics, detected anomalies, and recovery actions in one place.

## What makes it interesting

The entire self-healing loop — detect → decide → remediate → notify — runs serverlessly on AWS with no human in the loop. The Isolation Forest model requires zero labeled training data, making it immediately deployable on any EC2 workload.`,
      technologies: [
        "Python",
        "AWS EC2",
        "AWS Lambda",
        "AWS CloudWatch",
        "AWS SNS",
        "AWS S3",
        "Isolation Forest",
        "Streamlit",
        "Boto3",
      ],
      links: [
        {
          type: "Live Demo",
          href: "http://13.201.191.91:8501/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "GitHub",
          href: "https://github.com/deepakroshan11/cloudguard-ai",
          icon: <Icons.github className="size-3" />,
        },
      ] as ProjectLink[],
      image: "",
      video: "",
      animationComponent: "CloudGuardAnimation",
    } satisfies PortfolioProject,
  ],

  hackathons: [],
};