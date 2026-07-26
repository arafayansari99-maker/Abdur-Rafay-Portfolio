import { Code2, BrainCircuit, LineChart, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
}

export const STATS: Stat[] = [
  { label: "Lines of Code",    value: 150, suffix: "K+", icon: Code2 },
  { label: "Models Trained",   value: 42,  suffix: "",   icon: BrainCircuit },
  { label: "Dashboards Built", value: 18,  suffix: "",   icon: LineChart },
  { label: "Coffee Consumed",  value: 999, suffix: "+",  icon: Database },
];
