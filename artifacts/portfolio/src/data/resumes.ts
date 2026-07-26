export interface Resume {
  role: string;
  desc: string;
  tags: string[];
  file: string;
  color: string;
  border: string;
  iconColor: string;
}

export const RESUMES: Resume[] = [
  {
    role: "ML / AI Engineer",
    desc: "Focused on machine learning pipelines, LLM applications, FastAPI backends, and deep learning fundamentals.",
    tags: ["Python", "Scikit-learn", "FastAPI", "LLMs", "OCR"],
    file: "/resume-ml-ai-engineer.pdf",
    color: "from-violet-500/20 to-primary/10",
    border: "border-violet-500/30 hover:border-violet-500/60",
    iconColor: "text-violet-400",
  },
  {
    role: "Data Analyst",
    desc: "Covers EDA, data preprocessing, ETL, ML fundamentals, Power BI dashboards, SQL, and NLP — built for analytics-first and data science teams.",
    tags: ["Python", "SQL", "Pandas", "Power BI", "EDA", "Scikit-learn", "NLP"],
    file: "/resume-data-analyst.pdf",
    color: "from-primary/20 to-cyan-500/10",
    border: "border-primary/30 hover:border-primary/60",
    iconColor: "text-primary",
  },
  {
    role: "Business Analyst",
    desc: "Showcases eCommerce platform experience, requirements gathering, Jira, and stakeholder collaboration.",
    tags: ["Jira", "HubSpot", "Figma", "Agile", "Klaviyo"],
    file: "/resume-business-analyst.pdf",
    color: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30 hover:border-emerald-500/60",
    iconColor: "text-emerald-400",
  },
  {
    role: "Software Engineer",
    desc: "Covers OOP, DSA, ML/DL fundamentals, FastAPI backends, Python, and full-stack foundations — built for software engineering and dev roles.",
    tags: ["Python", "FastAPI", "OOP", "DSA", "ML", "TensorFlow", "HTML/CSS"],
    file: "/resume-software-engineer.pdf",
    color: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/30 hover:border-amber-500/60",
    iconColor: "text-amber-400",
  },
];
