import {
  Terminal, Database, LineChart, BrainCircuit, Server, Activity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SkillItem {
  n: string;
}

export interface SkillGroup {
  category: string;
  icon: LucideIcon;
  items: SkillItem[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Language & ML",
    icon: Terminal,
    items: [
      { n: "Python" },
      { n: "TensorFlow / PyTorch" },
      { n: "Scikit-Learn" },
    ],
  },
  {
    category: "Data Engineering",
    icon: Database,
    items: [
      { n: "SQL (Postgres/BQ)" },
      { n: "Pandas/NumPy" },
      { n: "Docker Basics" },
    ],
  },
  {
    category: "Visualization",
    icon: LineChart,
    items: [
      { n: "Tableau" },
      { n: "Power BI" },
      { n: "Plotly/Matplotlib" },
    ],
  },
  {
    category: "AI & NLP",
    icon: BrainCircuit,
    items: [
      { n: "LLMs / Prompting" },
      { n: "HuggingFace" },
      { n: "LangChain" },
    ],
  },
  {
    category: "Cloud & Ops",
    icon: Server,
    items: [
      { n: "AWS Basics" },
      { n: "Git / CI/CD" },
      { n: "FastAPI" },
    ],
  },
  {
    category: "Business Tools",
    icon: Activity,
    items: [
      { n: "Excel / Sheets API" },
      { n: "Jira / Agile" },
      { n: "Notion" },
    ],
  },
];
