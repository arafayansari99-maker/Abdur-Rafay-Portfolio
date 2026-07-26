import { Code2, BrainCircuit, Server, Cpu } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Project {
  title: string;
  desc: string;
  stack: string[];
  badge: string;
  badgeColor: string;
  github: string;
  demo: string | null;
  icon: LucideIcon;
}

export const PROJECTS: Project[] = [
  {
    title: "Resume Buildr",
    desc: "An AI-powered resume builder and screener built with TypeScript. Helps users create, edit, and screen resumes — with a live deployed app on Vercel.",
    stack: ["TypeScript", "React", "AI", "Vercel"],
    badge: "Live App",
    badgeColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    github: "https://github.com/arafayansari99-maker/Resume-Buildr",
    demo: "https://resume-buildr--arafayansari99.replit.app/dashboard",
    icon: Code2,
  },
  {
    title: "Email Threat Analyzer",
    desc: "A JavaScript application that analyzes emails for cybersecurity threats, phishing patterns, and malicious content — deployed live on Vercel.",
    stack: ["JavaScript", "NLP", "Security", "Vercel"],
    badge: "Live App",
    badgeColor: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    github: "https://github.com/arafayansari99-maker/Email-Threat-Analyzer",
    demo: "https://email-threat-analyzer-beryl.vercel.app",
    icon: BrainCircuit,
  },
  {
    title: "FYP — CyberSecurity Virtual Assistant",
    desc: "Final Year Project: an LLM-powered cybersecurity assistant with OCR screenshot analysis. Includes a FastAPI chatbot backend API for scalable inference. Secured 5th place at IEEE YESIST12.",
    stack: ["Python", "LLM", "FastAPI", "OCR", "Scikit-learn", "Jupyter"],
    badge: "IEEE Award",
    badgeColor: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    github: "https://github.com/arafayansari99-maker/-FYP-CyberSecurity-Virtual-Assistant",
    demo: null,
    icon: Server,
  },
  {
    title: "Cat vs Dog Image Classifier",
    desc: "A Convolutional Neural Network (CNN) trained to classify images of cats and dogs. Demonstrates hands-on deep learning with image preprocessing, model training, and evaluation.",
    stack: ["Python", "CNN", "Deep Learning", "Jupyter", "TensorFlow"],
    badge: "Deep Learning",
    badgeColor: "text-violet-400 border-violet-400/30 bg-violet-400/10",
    github: "https://github.com/arafayansari99-maker/-Cat-Dog-Image-Classification-with-CNN",
    demo: null,
    icon: Cpu,
  },
];
