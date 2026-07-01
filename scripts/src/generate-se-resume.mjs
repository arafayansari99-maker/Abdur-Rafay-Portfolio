import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, "../../artifacts/portfolio/public/resume-software-engineer.pdf");

const doc = new PDFDocument({ size: "A4", margins: { top: 40, bottom: 40, left: 50, right: 50 } });
doc.pipe(fs.createWriteStream(outPath));

const W = doc.page.width - 100;
const CYAN = "#0e7490";
const DARK = "#1e293b";
const MID = "#334155";
const MUTED = "#64748b";

function sectionTitle(text) {
  doc.moveDown(0.4);
  doc.fontSize(9).fillColor(CYAN).font("Helvetica-Bold")
    .text(text.toUpperCase(), { characterSpacing: 1.5 });
  doc.moveTo(50, doc.y + 2).lineTo(50 + W, doc.y + 2).strokeColor("#e2e8f0").lineWidth(0.5).stroke();
  doc.moveDown(0.4);
}

function bullet(text) {
  const x = doc.x;
  doc.fontSize(10).fillColor(MID).font("Helvetica")
    .text(`\u2022  ${text}`, { indent: 8, lineGap: 2 });
}

// ── HEADER ────────────────────────────────────────────────────────────────────
doc.fontSize(22).fillColor(CYAN).font("Helvetica-Bold")
  .text("ABDUR RAFAY", { align: "center" });
doc.fontSize(11).fillColor(DARK).font("Helvetica")
  .text("SOFTWARE ENGINEER", { align: "center", characterSpacing: 2 });
doc.moveDown(0.3);
doc.fontSize(9).fillColor(MUTED).font("Helvetica")
  .text(
    "Karachi, Pakistan  •  a.rafayansari99@gmail.com  •  +92 312 2053670  •  linkedin.com/in/abdur-rafay-1x  •  github.com/arafayansari99-maker",
    { align: "center", lineGap: 2 }
  );
doc.moveTo(50, doc.y + 6).lineTo(50 + W, doc.y + 6).strokeColor(CYAN).lineWidth(1.5).stroke();
doc.moveDown(0.8);

// ── SUMMARY ───────────────────────────────────────────────────────────────────
sectionTitle("Summary");
doc.fontSize(10).fillColor(MID).font("Helvetica")
  .text(
    "Fresh Software Engineering graduate from Karachi University with a strong foundation in Python, OOP, Data Structures & Algorithms, Machine Learning, and Deep Learning. Built production-grade projects including an LLM-powered cybersecurity chatbot (FastAPI + OCR), a cancer risk ML pipeline, and multiple data dashboards. Internship experience as a Business Analyst at CODUP, working across eCommerce platforms and agile teams. Eager to contribute to engineering teams as a backend, full-stack, or ML-integrated software engineer.",
    { lineGap: 3 }
  );

// ── EXPERIENCE ────────────────────────────────────────────────────────────────
sectionTitle("Professional Experience");
doc.fontSize(10.5).fillColor(DARK).font("Helvetica-Bold").text("CODUP", { continued: true });
doc.fillColor(MUTED).font("Helvetica").text("  —  Karachi (On-site)");
doc.fontSize(10).fillColor(MID).font("Helvetica-Oblique").text("Intern Business Analyst", { continued: true });
doc.font("Helvetica").fillColor(MUTED).text("    Aug 2025 – Nov 2025", { align: "right" });
doc.moveDown(0.2);
bullet("Gathered and documented business requirements; prepared Jira tickets, Top-level approach docs, and Requirement Analysis Documents.");
bullet("Configured and evaluated eCommerce solutions on WordPress (WooCommerce), Shopify (Plus sandbox), and BigCommerce platforms.");
bullet("Collaborated with cross-functional teams to translate business needs into clear technical specifications.");
bullet("Developed working knowledge of B2B/B2C eCommerce processes, Klaviyo marketing automation, and HubSpot CRM workflows.");

// ── SKILLS ────────────────────────────────────────────────────────────────────
sectionTitle("Technical Skills");
const skills = [
  ["Languages", "Python, SQL, JavaScript, PHP, HTML, CSS"],
  ["Backend", "FastAPI, Laravel, REST APIs"],
  ["ML / Data", "Pandas, NumPy, Scikit-learn, EDA, Feature Engineering"],
  ["AI / NLP", "LLM Applications, OCR Integration, Deep Learning Fundamentals"],
  ["Concepts", "OOP, DSA, Machine Learning, Software Design Patterns"],
  ["Tools", "Git/GitHub, Power BI, Excel, Jira, Postman, VS Code, Jupyter"],
];
const colW = W / 2;
let skillY = doc.y;
skills.forEach((row, i) => {
  const col = i % 2;
  const x = 50 + col * (colW + 8);
  if (col === 0 && i > 0) skillY = doc.y;
  doc.fontSize(10).fillColor(DARK).font("Helvetica-Bold")
    .text(`${row[0]}: `, x, col === 0 ? doc.y : skillY, { continued: true, width: colW });
  doc.fillColor(MID).font("Helvetica").text(row[1], { width: colW, lineGap: 2 });
});
doc.moveDown(0.2);

// ── PROJECTS ──────────────────────────────────────────────────────────────────
sectionTitle("Projects");

doc.fontSize(10.5).fillColor(DARK).font("Helvetica-Bold")
  .text("FYP — Cybersecurity Virtual Assistant", { continued: true });
doc.fillColor(MUTED).font("Helvetica").fontSize(9)
  .text("   (Python, FastAPI, LLM, OCR, Scikit-learn)");
doc.moveDown(0.15);
bullet("Built an LLM-powered chatbot answering cybersecurity threat queries via natural language prompts.");
bullet("Integrated OCR to extract and analyze text from cybersecurity-related screenshots.");
bullet("Developed scalable FastAPI backend to serve inference workflows and support concurrent users.");
bullet("Secured 5th position at IEEE YESIST12 Final Year Project Ideas Submission Competition.");

doc.moveDown(0.3);
doc.fontSize(10.5).fillColor(DARK).font("Helvetica-Bold")
  .text("Cancer Risk Analysis", { continued: true });
doc.fillColor(MUTED).font("Helvetica").fontSize(9).text("   (Python, Pandas, Scikit-learn)");
doc.moveDown(0.15);
bullet("Performed end-to-end data preprocessing, EDA, and feature engineering on healthcare datasets.");
bullet("Built and evaluated classification models for cancer risk prediction with performance benchmarking.");

doc.moveDown(0.3);
doc.fontSize(10.5).fillColor(DARK).font("Helvetica-Bold")
  .text("Coffee Shop Performance Dashboard", { continued: true });
doc.fillColor(MUTED).font("Helvetica").fontSize(9).text("   (Power BI, Excel)");
doc.moveDown(0.15);
bullet("Developed an interactive Power BI dashboard tracking sales KPIs, customer behavior, and operational trends.");

doc.moveDown(0.3);
doc.fontSize(10.5).fillColor(DARK).font("Helvetica-Bold")
  .text("Cookie Company Sales Analysis", { continued: true });
doc.fillColor(MUTED).font("Helvetica").fontSize(9).text("   (Excel)");
doc.moveDown(0.15);
bullet("Analyzed sales data using pivot tables and charts to surface actionable business insights.");

// ── EDUCATION ─────────────────────────────────────────────────────────────────
sectionTitle("Education");
doc.fontSize(10.5).fillColor(DARK).font("Helvetica-Bold")
  .text("Karachi University (UBIT)", { continued: true });
doc.fillColor(MUTED).font("Helvetica").fontSize(10)
  .text("    2021 – 2025", { align: "right" });
doc.fontSize(10).fillColor(MID).font("Helvetica")
  .text("Bachelor of Science — Software Engineering (BS SE)", { lineGap: 2 });
doc.fontSize(9).fillColor(MUTED)
  .text("Key Areas: OOP, DSA, Machine Learning, Deep Learning, Calculus, Linear Algebra, Database Systems");

doc.moveDown(0.4);
doc.fontSize(10.5).fillColor(DARK).font("Helvetica-Bold")
  .text("Intermediate — Pre-Engineering", { continued: true });
doc.fillColor(MUTED).font("Helvetica").fontSize(10).text("    2020", { align: "right" });
doc.fontSize(10).fillColor(MID).font("Helvetica")
  .text("Maths, Physics, Computer Science");

// ── CERTIFICATIONS ────────────────────────────────────────────────────────────
sectionTitle("Certifications");
const certs = [
  ["AI, Machine Learning, Deep Learning & Communication — NAVTTC Program", "Feb–May 2026"],
  ["SQL for Data Analytics — SimpliLearn", "May 2025"],
  ["Business Analytics using Excel — SimpliLearn", "Jan 2024"],
  ["Web Development using PHP & Laravel — Aptech", "Feb 2022"],
  ["Responsive Web Development — Aptech", "Feb 2022"],
  ["Python In-depth Course for Beginners — Udemy", "May 2021"],
];
certs.forEach(([name, date]) => {
  doc.fontSize(10).fillColor(MID).font("Helvetica")
    .text(name, { continued: true, lineGap: 2 });
  doc.fillColor(MUTED).text(`  ${date}`, { align: "right" });
});

// ── ACHIEVEMENTS ──────────────────────────────────────────────────────────────
sectionTitle("Achievements");
doc.fontSize(10.5).fillColor(DARK).font("Helvetica-Bold")
  .text("5th Position — IEEE YESIST12 International Competition");
doc.moveDown(0.15);
bullet('Secured 5th position in the IEEE YESIST12 Final Year Project Ideas Submission Competition for "CyberSecurity Virtual Assistant" and received a participation certificate.');

doc.end();
console.log("PDF generated:", outPath);
