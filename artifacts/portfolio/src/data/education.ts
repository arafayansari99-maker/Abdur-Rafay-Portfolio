export interface Degree {
  title: string;
  period: string;
  periodColor: "primary" | "secondary";
  description: string;
}

export interface Certification {
  title: string;
  provider: string;
  date: string;
  img: string;
}

export const DEGREES: Degree[] = [
  {
    title: "Bachelor of Software Engineering",
    period: "2021 — 2025",
    periodColor: "primary",
    description:
      "Four-year program with deep focus on software fundamentals and modern AI. Covered Python, OOP, Data Structures & Algorithms, Machine Learning, Deep Learning, Calculus, and Linear Algebra — building the mathematical and engineering foundation needed for data-intensive roles.",
  },
  {
    title: "Intermediate — Pre-Engineering",
    period: "2020",
    periodColor: "secondary",
    description:
      "Pre-Engineering stream with core subjects: Mathematics, Physics, and Computer Science — laying a rigorous quantitative base for engineering studies.",
  },
];

export const CERTIFICATIONS: Certification[] = [
  { title: "SQL for Data Analysis",          provider: "Simplilearn SkillUp",       date: "May 2025", img: "/cert-sql.jpg" },
  { title: "Business Analytics with Excel",  provider: "Simplilearn SkillUp",       date: "Jan 2024", img: "/cert-business-analytics.jpg" },
  { title: "Python For Beginners In-Depth",  provider: "Udemy",                     date: "May 2021", img: "/cert-python.jpg" },
  { title: "Responsive Web Development",     provider: "Aptech Computer Education", date: "Feb 2022", img: "/cert-web-dev.jpeg" },
  { title: "Web Dev with PHP & Laravel",     provider: "Aptech Computer Education", date: "Feb 2022", img: "/cert-php-laravel.jpeg" },
];
