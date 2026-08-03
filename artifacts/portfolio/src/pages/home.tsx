import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  Terminal, GraduationCap, Trophy, ChevronRight,
  Mail, Github, Linkedin, ExternalLink, Activity,
  Download, FileText, Menu, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { STATS } from "@/data/stats";
import { EXPERIENCE } from "@/data/experience";
import { SKILL_GROUPS } from "@/data/skills";
import { TARGET_VECTORS } from "@/data/targetVectors";
import { PROJECTS } from "@/data/projects";
import { DEGREES, CERTIFICATIONS } from "@/data/education";
import { RESUMES } from "@/data/resumes";

// --- ContactForm ---

type FormState = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMsg("");

    try {
      const apiBaseUrl = (
        import.meta.env.VITE_API_URL ||
        (import.meta.env.DEV ? "http://localhost:5000" : window.location.origin)
      ).replace(/\/$/, "");

      const res = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Failed to send.");
      }

      setFormState("success");
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (formState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
          <Terminal className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold font-mono text-white">TRANSMISSION_SENT</h3>
        <p className="text-muted-foreground text-sm">Message received. Will respond shortly.</p>
        <Button
          variant="outline"
          className="font-mono text-xs border-primary/30 hover:bg-primary/10 mt-2"
          onClick={() => setFormState("idle")}
        >
          SEND_ANOTHER
        </Button>
      </motion.div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-mono text-muted-foreground uppercase">Sender_Name</label>
          <Input
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={formState === "sending"}
            className="bg-background/50 border-white/10 focus-visible:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-mono text-muted-foreground uppercase">Reply_Address</label>
          <Input
            placeholder="john@company.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={formState === "sending"}
            className="bg-background/50 border-white/10 focus-visible:ring-primary"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs font-mono text-muted-foreground uppercase">Payload</label>
        <Textarea
          placeholder="How can I help you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={formState === "sending"}
          className="min-h-[120px] bg-background/50 border-white/10 focus-visible:ring-primary"
        />
      </div>
      {formState === "error" && (
        <p className="text-red-400 text-xs font-mono bg-red-400/10 border border-red-400/20 rounded px-3 py-2">
          ERROR: {errorMsg}
        </p>
      )}
      <Button
        type="submit"
        disabled={formState === "sending"}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm py-6 disabled:opacity-50"
      >
        {formState === "sending" ? "TRANSMITTING..." : "TRANSMIT_MESSAGE"}
      </Button>
    </form>
  );
}

// --- Subcomponents ---

const AnimatedText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [texts]);

  return (
    <div className="h-[40px] md:h-[60px] overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold text-3xl md:text-5xl"
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const AnimatedNumber = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const totalFrames = Math.round(duration * 60);
    const increment = end / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

// --- Main Page ---

const NAV_LINKS = [
  { href: "#experience", label: "/work" },
  { href: "#skills",     label: "/skills" },
  { href: "#projects",   label: "/projects" },
  { href: "#education",  label: "/edu" },
  { href: "#resumes",    label: "/resumes" },
];

const ANIMATED_ROLES = ["Data Analyst", "Business Analyst", "Data Scientist", "ML Engineer", "AI Engineer"];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-grid-pattern opacity-[0.15]" />
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b-0 border-white/5 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <div className="font-mono font-bold text-lg tracking-tighter text-white flex items-center gap-2">
          <Activity className="text-primary w-5 h-5" />
          ABDUR_RAFAY<span className="text-primary animate-pulse">_</span>
        </div>
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-mono text-muted-foreground">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">{l.label}</a>
          ))}
          <Button variant="outline" size="sm" className="font-mono text-xs border-primary/30 hover:border-primary hover:bg-primary/10" asChild>
            <a href="#contact">INITIALIZE_CONTACT</a>
          </Button>
        </div>
        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[64px] left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-b border-white/10 md:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 font-mono text-sm text-muted-foreground hover:text-primary border-b border-white/5 last:border-0 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 py-3 text-center font-mono text-xs rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
              >
                INITIALIZE_CONTACT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 px-6 z-10 overflow-hidden">
        <motion.div style={{ y: yBg, opacity: opacityHero }} className="absolute inset-0 z-0">
          <img src="/hero-bg.png" alt="Data Visualization Background" className="w-full h-full object-cover opacity-30 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </motion.div>

        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
          {/* Mobile profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex lg:hidden justify-center"
          >
            <div className="relative w-36 h-36">
              <div className="absolute inset-0 border border-primary/30 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-3 border border-secondary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-primary/50 shadow-[0_0_30px_rgba(0,200,200,0.2)]">
                  <img src="/profile.png" alt="Abdur Rafay" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="col-span-1 lg:col-span-8 flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-xs w-fit mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              SYSTEM_ONLINE // OPEN FOR OPPORTUNITIES
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
            >
              Abdur Rafay
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatedText texts={ANIMATED_ROLES} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl leading-relaxed font-light"
            >
              Recent CS grad who turns messy data into decisions. I build models that ship and dashboards that stick. Bridging analytical rigor with modern AI tools.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8" asChild>
                <a href="#projects">
                  View Projects <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 hover:bg-white/5 font-mono" asChild>
                <a href="#resumes">
                  <FileText className="mr-2 h-4 w-4" /> View Resumes
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="col-span-1 lg:col-span-4 hidden lg:flex items-center justify-center relative"
          >
            <div className="relative w-full aspect-square max-w-[280px]">
              <div className="absolute inset-0 border border-primary/30 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 border border-secondary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-8 border border-white/10 rounded-full border-dashed animate-[spin_25s_linear_infinite]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-44 h-44 rounded-full overflow-hidden border-2 border-primary/50 shadow-[0_0_40px_rgba(0,200,200,0.25)]">
                  <img src="/profile.png" alt="Abdur Rafay" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="relative z-20 py-12 border-y border-white/5 bg-background/50 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-white/5">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center justify-center text-center px-4"
            >
              <stat.icon className="w-6 h-6 text-secondary mb-3 opacity-70" />
              <div className="text-3xl md:text-4xl font-bold font-mono text-white flex items-center">
                <AnimatedNumber value={stat.value} />{stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground mt-1 uppercase tracking-wider font-mono text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WORK EXPERIENCE SECTION */}
      <section id="experience" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">// Field_Operations</h2>
            <h3 className="text-3xl md:text-5xl font-bold">Work Experience</h3>
          </motion.div>

          <div className="space-y-8">
            {EXPERIENCE.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent hidden md:block" style={{ left: "11px" }} />

                <div className="md:pl-12">
                  {/* Dot */}
                  <div className="hidden md:flex absolute w-6 h-6 rounded-full bg-background border-2 border-primary items-center justify-center" style={{ left: 0, top: "4px" }}>
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>

                  <div className="glass-panel rounded-2xl p-5 md:p-8 border border-white/10 hover:border-primary/30 transition-colors relative overflow-hidden group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-xl font-bold text-white">{job.title}</h4>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-primary/10 border border-primary/20 text-primary">{job.type}</span>
                          </div>
                          <div className="text-primary font-semibold text-base">{job.company}</div>
                          <div className="text-muted-foreground font-mono text-sm mt-0.5">{job.location} &mdash; {job.locationType}</div>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-1 flex-shrink-0">
                          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70">
                            {job.period}
                          </div>
                          <div className="text-xs font-mono text-muted-foreground">{job.duration}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {job.bullets.map((point, i) => (
                          <div key={i} className="flex gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground leading-relaxed">{point}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {job.tags.map((tag, i) => (
                          <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary/80">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">// Technical_Arsenal</h2>
            <h3 className="text-3xl md:text-5xl font-bold">Tools of the Trade</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SKILL_GROUPS.map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 rounded-xl relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-primary">
                    <block.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-lg">{block.category}</h4>
                </div>
                <div className="space-y-4">
                  {block.items.map((item, j) => (
                    <div key={j}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground font-mono">{item.n}</span>
                        <span className="text-white/50 font-mono text-xs">{item.v}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.v}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + (j * 0.1) }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET ROLES - Visual Segment */}
      <section className="py-20 relative z-10 overflow-hidden bg-primary/5 border-y border-primary/20">
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold font-mono text-primary mb-2">TARGET_VECTORS</h2>
            <p className="text-muted-foreground text-sm">Configured and optimized for high-impact analytical & engineering roles.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TARGET_VECTORS.map(({ role, icon: Icon, color, iconColor, skills }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group relative rounded-xl border bg-gradient-to-br ${color} p-5 hover:scale-[1.02] transition-transform duration-300`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-background/40 ${iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold font-mono text-white text-sm">{role}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, j) => (
                    <span key={j} className="text-xs font-mono px-2 py-0.5 rounded bg-background/50 text-muted-foreground border border-white/10">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <h2 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">// Executed_Protocols</h2>
              <h3 className="text-3xl md:text-5xl font-bold">Featured Projects</h3>
            </div>
            <Button variant="link" className="text-primary hover:text-primary/80 font-mono p-0 h-auto flex" asChild>
              <a href="https://github.com/arafayansari99-maker" target="_blank" rel="noopener noreferrer">
                View All Repositories <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
                <Card className="relative h-full bg-background border-white/10 overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                    <project.icon className="w-24 h-24 text-primary" />
                  </div>
                  <CardContent className="p-5 md:p-8 flex flex-col h-full relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors pr-3">{project.title}</h4>
                      <div className={`px-3 py-1 rounded text-xs font-mono border whitespace-nowrap flex-shrink-0 ${project.badgeColor}`}>
                        {project.badge}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">{project.desc}</p>
                    <div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map((tech, j) => (
                          <span key={j} className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-white/70">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="w-full bg-transparent border-white/20 hover:bg-white/5 text-white" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> Source
                          </a>
                        </Button>
                        {project.demo ? (
                          <Button variant="outline" size="sm" className="w-full bg-transparent border-primary/30 text-primary hover:bg-primary hover:text-background" asChild>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                            </a>
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="w-full bg-transparent border-white/10 text-white/30 cursor-not-allowed" disabled>
                            <ExternalLink className="mr-2 h-4 w-4" /> No Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION & CERTS */}
      <section id="education" className="py-24 relative z-10 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="text-primary w-6 h-6" />
              <h3 className="text-2xl font-bold">Academic Base</h3>
            </div>
            <div className="relative pl-6 border-l border-white/10 space-y-8">
              {DEGREES.map((deg, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-background border-2 border-${deg.periodColor}`} />
                  <h4 className="text-lg font-bold text-white">{deg.title}</h4>
                  <div className={`text-${deg.periodColor} font-mono text-sm mb-2`}>{deg.period}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{deg.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certs & Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Trophy className="text-secondary w-6 h-6" />
              <h3 className="text-2xl font-bold">Credentials & Certificates</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.a
                  key={i}
                  href={cert.img}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-background border border-white/5 hover:border-primary/40 transition-all group"
                >
                  <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-primary/30 transition-colors">
                    <img src={cert.img} alt={cert.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-white text-sm group-hover:text-primary transition-colors truncate">{cert.title}</h5>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">{cert.provider}</p>
                    <p className="text-xs font-mono text-white/30 mt-0.5">{cert.date}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors flex-shrink-0" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* RESUMES SECTION */}
      <section id="resumes" className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-sm font-mono text-primary mb-2 uppercase tracking-widest">// Role_Specific_Builds</h2>
            <h3 className="text-3xl md:text-5xl font-bold">Download Resume</h3>
            <p className="text-muted-foreground mt-3 text-base font-light max-w-xl">Each resume is tailored for a specific role — pick the one that matches the opportunity.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESUMES.map((resume, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${resume.color} blur opacity-0 group-hover:opacity-100 transition duration-500`} />
                <div className={`relative h-full bg-background border ${resume.border} rounded-2xl p-6 flex flex-col transition-colors`}>
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 w-fit mb-4 ${resume.iconColor}`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2 group-hover:text-primary transition-colors">{resume.role}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">{resume.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {resume.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">{tag}</span>
                    ))}
                  </div>
                  <a
                    href={resume.file}
                    download
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border ${resume.border} text-sm font-mono text-white/80 hover:text-white bg-white/5 hover:bg-white/10 transition-all`}
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FOOTER */}
      <section id="contact" className="py-24 relative z-10 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Deploy?</span></h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto font-light">
              Whether you have a messy dataset that needs taming, a dashboard that needs building, or a model that needs shipping — let's talk.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 md:p-12 rounded-2xl max-w-2xl mx-auto border-white/10 text-left mb-16"
          >
            <ContactForm />
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 md:gap-16 pt-8 border-t border-white/5">
            <a href="mailto:a.rafayansari99@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group min-w-0">
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-colors flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs sm:text-sm truncate">a.rafayansari99@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/abdur-rafay-1x/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group">
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#0A66C2]/20 group-hover:text-[#0A66C2] transition-colors flex-shrink-0">
                <Linkedin className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs sm:text-sm">/in/abdur-rafay-1x</span>
            </a>
            <a href="https://github.com/arafayansari99-maker" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group">
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/20 transition-colors">
                <Github className="w-5 h-5" />
              </div>
              <span className="font-mono text-sm">arafayansari99-maker</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="py-6 text-center text-xs font-mono text-muted-foreground/50 border-t border-white/5 relative z-10 bg-background">
        <p>SYSTEM.HALT // DESIGNED & ENGINEERED BY ABDUR RAFAY © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
