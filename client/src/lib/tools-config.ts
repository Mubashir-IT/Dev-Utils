import { 
  Calculator, 
  KeyRound, 
  FileJson, 
  Type, 
  Scale, 
  Palette,
  LucideIcon
} from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: LucideIcon;
  category: "Development" | "Productivity" | "Health" | "Design";
  color: string;
}

export const tools: Tool[] = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and minify JSON data instantly.",
    path: "/tools/json-formatter",
    icon: FileJson,
    category: "Development",
    color: "text-blue-500",
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Create secure, random passwords with custom settings.",
    path: "/tools/password-generator",
    icon: KeyRound,
    category: "Productivity",
    color: "text-green-500",
  },
  {
    id: "color-generator",
    name: "Palette Generator",
    description: "Generate beautiful color combinations for your projects.",
    path: "/tools/color-generator",
    icon: Palette,
    category: "Design",
    color: "text-purple-500",
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, and reading time in real-time.",
    path: "/tools/word-counter",
    icon: Type,
    category: "Productivity",
    color: "text-orange-500",
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate exact age in years, months, and days.",
    path: "/tools/age-calculator",
    icon: Calculator,
    category: "Health",
    color: "text-pink-500",
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate Body Mass Index and check health category.",
    path: "/tools/bmi-calculator",
    icon: Scale,
    category: "Health",
    color: "text-red-500",
  }
];

export const getToolById = (id: string) => tools.find(t => t.id === id);
