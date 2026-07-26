import {
  Terminal, Database, LineChart, BrainCircuit, Server, Activity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SkillItem {
  n: string;
  v: number;
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
      { n: "Python",              v: 95 },
      { n: "TensorFlow / PyTorch", v: 80 },
      { n: "Scikit-Learn",        v: 90 },
    ],
  },
  {
    category: "Data Engineering",
    icon: Database,
    items: [
      { n: "SQL (Postgres/BQ)", v: 92 },
      { n: "Pandas/NumPy",      v: 95 },
      { n: "Docker Basics",     v: 70 },
    ],
  },
  {
    category: "Visualization",
    icon: LineChart,
    items: [
      { n: "Tableau",           v: 88 },
      { n: "Power BI",          v: 85 },
      { n: "Plotly/Matplotlib", v: 90 },
    ],
  },
  {
    category: "AI & NLP",
    icon: BrainCircuit,
    items: [
      { n: "LLMs / Prompting", v: 85 },
      { n: "HuggingFace",      v: 80 },
      { n: "LangChain",        v: 75 },
    ],
  },
  {
    category: "Cloud & Ops",
    icon: Server,
    items: [
      { n: "AWS Basics", v: 65 },
      { n: "Git / CI/CD", v: 85 },
      { n: "FastAPI",     v: 80 },
    ],
  },
  {
    category: "Business Tools",
    icon: Activity,
    items: [
      { n: "Excel / Sheets API", v: 90 },
      { n: "Jira / Agile",       v: 80 },
      { n: "Notion",             v: 95 },
    ],
  },
];
