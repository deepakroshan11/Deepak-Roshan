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

// ============================================
// TYPE DEFINITIONS
// ============================================

type ProjectLink = { type: string; href: string; icon: ReactNode };
type HackathonLink = { title: string; href: string; icon: ReactNode };

type Certification = {
  name: string;
  issuer: string;
  year: string;
  url?: string;
};

// SIMPLIFIED: Only the fields you want
type Hackathon = {
  id: string;
  title: string;
  achievement: string;
  dates: string;
  location: string;
  team: string;
  teamLead?: string;
  department?: string;
  problemStatement?: {
    id: string;
    title: string;
  };
  theme?: string;
  links?: HackathonLink[];
};

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

// ============================================
// DATA EXPORT
// ============================================

export const DATA = {
  name: "Deepak Roshan",
  initials: "DR",
  url: "https://deepakroshan.is-a.dev",
  location: "Coimbatore, Tamil Nadu",
  locationLink: "https://www.google.com/maps/place/Coimbatore",
  description:
    "AI Engineer. I build intelligent systems from model to cloud — and ship them live.",
  summary: `I'm an **AI Engineer** specializing in **Artificial Intelligence, Machine Learning, and Cloud Computing**.

I build and deploy end-to-end intelligent systems across computer vision, voice AI, and cloud-native applications, transforming ideas into scalable solutions designed for real-world use.

My expertise spans **Python, FastAPI, TensorFlow, AWS, and React**, with a strong focus on building reliable, production-ready systems that bridge the gap between research and real-world impact.`,
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
        "- Deployed applications on AWS (EC2, S3, Lambda) using Linux.\n- Automated deployment and system tasks with shell scripts.\n- Monitored systems and logs using cron and htop.\n- Optimized cloud resources for better performance.",
    },
    {
      company: "Freelance",
      href: "",
      badges: [],
      location: "Remote",
      title: "Frontend Developer (Part-Time)",
      logoUrl: "",
      start: "2022",
      end: "2024",
      description:
        "- Built scalable and responsive web interfaces across multiple client projects.\n- Designed user-friendly, modern UI/UX with a focus on visual clarity and usability.\n- Developed UI components for real-world product applications from scratch.\n- Improved performance and load efficiency through code optimisation and asset management.",
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

  // ============================================
  // CERTIFICATIONS
  // ============================================

  certifications: [
    {
      name: "Claude Code in Action",
      issuer: "Anthropic Academy",
      year: "2026",
      url: "https://www.anthropic.com",
    },
    {
      name: "AWS Educate – Cloud Computing Foundations",
      issuer: "Amazon Web Services",
      year: "2025",
      url: "https://aws.amazon.com/education/awseducate/",
    },
    {
      name: "Introduction to Computer Vision with OpenCV",
      issuer: "Coursera / OpenCV.org",
      year: "2024",
      url: "https://www.coursera.org",
    },
  ] as Certification[],

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
- Items are stored in **Supabase** (PostgreSQL) with **Cloudinary** for image hosting.`,
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
- Deployed as a **FastAPI** app on **Hugging Face Spaces** via Docker.`,
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

A real-time **Indian Sign Language (ISL) translation system** designed to bridge the communication gap between deaf or non-verbal individuals and the hearing world. By turning hand gestures and facial expressions into readable text and speech in real time, it removes one of the most fundamental barriers to everyday interaction — enabling more inclusive and accessible conversations.

## How it works

- **MediaPipe** extracts hand and facial landmark keypoints from live webcam video.
- A **TensorFlow CNN** trained on the raw keypoint data achieves **~95% accuracy** on ISL gestures.
- **Emotion detection** uses facial landmarks with temporal smoothing to prevent jitter.
- A **speech-to-sign avatar** renders signs from spoken input using **Three.js** and the Web Speech API.
- Deployed on **Hugging Face Spaces** with a Flask + Socket.IO backend running as a single-process daemon thread (fixed shared-memory IPC failure from the original two-process supervisord architecture).`,
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
- A **Streamlit dashboard** visualizes live metrics, detected anomalies, and recovery actions in one place.`,
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

  // ============================================
  // HACKATHONS - SIMPLIFIED VERSION
  // ============================================

  hackathons: [
    {
      id: "sih-2024-palladian",
      title: "Smart India Hackathon 2024",
      achievement: "Top 5 Finalist",
      dates: "2024",
      location: "Sri Krishna College of Technology, Coimbatore",
      team: "PALLADIAN",
      department: "CSE-AI&ML",
      problemStatement: {
        id: "1732",
        title:
          "Enhancement of Permanently Shadowed Regions (PSR) of Lunar Craters Captured by OHRC of Chandrayaan-2",
      },
      theme: "Space Technology",
      links: [],
    },
  ] as Hackathon[],
};