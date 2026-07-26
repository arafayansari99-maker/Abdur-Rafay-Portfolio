export interface WorkExperience {
  title: string;
  type: string;
  company: string;
  location: string;
  locationType: string;
  period: string;
  duration: string;
  bullets: string[];
  tags: string[];
}

export const EXPERIENCE: WorkExperience[] = [
  {
    title: "Intern Business Analyst",
    type: "INTERNSHIP",
    company: "CODUP",
    location: "Karachi, Pakistan",
    locationType: "On-site",
    period: "Aug 2025 – Nov 2025",
    duration: "4 months",
    bullets: [
      "Gathered and analyzed business requirements; prepared Jira tickets, Top-level approach docs, and Requirement Analysis Documents for new-lead projects.",
      "Configured and evaluated eCommerce solutions across WordPress (WooCommerce), Shopify Plus sandbox, and BigCommerce platforms.",
      "Collaborated with cross-functional teams to translate business needs into clear technical specifications for engineering teams.",
      "Developed understanding of B2B and B2C eCommerce processes, Klaviyo marketing automation, and HubSpot CRM workflows.",
      "Built multiple WordPress stores (Blog, WooCommerce, Brochure) and explored Shopify/BigCommerce feature sets end-to-end.",
      "Gained hands-on Agile/Scrum experience working on live client projects with stakeholder communication.",
    ],
    tags: [
      "WordPress", "Shopify", "BigCommerce", "Jira", "HubSpot",
      "Klaviyo", "Figma", "Agile/Scrum", "Requirements Analysis",
    ],
  },
];
