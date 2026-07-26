import { BarChart3, Briefcase, FlaskConical, Cpu, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface TargetVector {
  role: string;
  icon: LucideIcon;
  color: string;
  iconColor: string;
  skills: string[];
}

export const TARGET_VECTORS: TargetVector[] = [
  {
    role: "Data Analyst",
    icon: BarChart3,
    color: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
    iconColor: "text-cyan-400",
    skills: ["SQL", "Python", "Tableau", "Power BI", "Excel", "Data Wrangling"],
  },
  {
    role: "Business Analyst",
    icon: Briefcase,
    color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
    iconColor: "text-emerald-400",
    skills: [
      "Requirements Analysis", "Process Mapping", "KPI Reporting",
      "Stakeholder Mgmt", "Agile", "Documentation",
    ],
  },
  {
    role: "Data Scientist",
    icon: FlaskConical,
    color: "from-violet-500/20 to-violet-500/5 border-violet-500/30",
    iconColor: "text-violet-400",
    skills: ["Statistics", "Python", "Scikit-learn", "Pandas", "NumPy", "Jupyter"],
  },
  {
    role: "ML Engineer",
    icon: Cpu,
    color: "from-orange-500/20 to-orange-500/5 border-orange-500/30",
    iconColor: "text-orange-400",
    skills: ["TensorFlow", "PyTorch", "Model Training", "CNN", "NLP", "MLOps"],
  },
  {
    role: "AI Engineer",
    icon: Bot,
    color: "from-primary/20 to-primary/5 border-primary/30",
    iconColor: "text-primary",
    skills: ["LLMs", "LangChain", "Prompt Engineering", "RAG", "FastAPI", "AI Pipelines"],
  },
];
