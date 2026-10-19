import { Code2, Trophy, GraduationCap, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
}

export const STATS: Stat[] = [
  { label: "Featured Projects", value: "05", icon: Code2 },
  { label: "Certifications", value: "05", icon: Trophy },
  { label: "Degree", value: "B.S.E.", icon: GraduationCap },
  { label: "IEEE YESIST12", value: "5th Place", icon: Award },
];
