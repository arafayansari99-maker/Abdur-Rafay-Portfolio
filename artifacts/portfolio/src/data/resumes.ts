export interface Resume {
  role: string;
  desc: string;
  tags: string[];
  highlights: { heading: string; details: string[] }[];
  file: string;
  color: string;
  border: string;
  iconColor: string;
}

export const RESUMES: Resume[] = [
  {
    role: "AI/ML Engineer · Data Analyst · Software Engineer",
    desc: "Software Engineering graduate from the University of Karachi, building end-to-end AI/ML, NLP, and data applications. Experienced in Python, FastAPI, React, and PostgreSQL, with a background in business analysis and e-commerce platforms.",
    tags: [
      "Python",
      "Machine Learning",
      "NLP / LLMs / RAG",
      "Data Analytics",
      "FastAPI",
      "React",
      "SQL / PostgreSQL",
      "Power BI",
    ],
    highlights: [
      {
        heading: "Selected projects",
        details: [
          "RAG University Assistant — document Q&A with streamed responses, citations, and confidence scores.",
          "Email Threat Analyzer — multi-model phishing detection with threat visualizations and PDF reports.",
          "Signal-Sentry — competitor monitoring with change detection, alerts, and a live dashboard.",
          "AI Resume Screener — ATS-style scoring and candidate ranking using semantic similarity.",
        ],
      },
      {
        heading: "Experience & education",
        details: [
          "Business Analyst Intern at CODUP (Aug–Nov 2025): requirements gathering, Jira documentation, and e-commerce platform configuration.",
          "B.S. in Software Engineering, University of Karachi (UBIT), 2021–2025.",
        ],
      },
      {
        heading: "Recognition & certifications",
        details: [
          "5th place, IEEE YESIST12 Final Year Project Ideas Competition for a Cybersecurity Virtual Assistant.",
          "Certifications in AI/ML/DL, SQL for Data Analytics, Business Analytics with Excel, and Python.",
        ],
      },
    ],
    file: "/Abdur-Rafay-CV.pdf",
    color: "from-primary/20 to-cyan-500/10",
    border: "border-primary/30 hover:border-primary/60",
    iconColor: "text-primary",
  },
];
