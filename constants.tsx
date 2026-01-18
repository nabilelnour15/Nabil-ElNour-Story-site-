
import React from 'react';
import { Layout, Cpu, Activity, Code, Palette, Zap } from 'lucide-react';
import { Project, Experience, Pillar } from './types';

export const HERO_HEADLINE = "Turning visual ideas into fast, user-focused web applications.";
export const HERO_SUBHEADLINE = "A creative, designer-minded fullstack developer building dashboards and web apps with clean logic, strong performance, and polished user experience.";

export const PILLARS: Pillar[] = [
  {
    title: "Visual → Code",
    description: "From design to interface, every detail matters. I bridge the gap between Figma and the DOM.",
    icon: "Palette"
  },
  {
    title: "Logic & State",
    description: "Clean logic keeps complex apps predictable and scalable. I build architectures that last.",
    icon: "Code"
  },
  {
    title: "Performance & UX",
    description: "Fast, smooth experiences users enjoy using. Latency is the enemy of a great product.",
    icon: "Zap"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Sphinx Publishing Dashboards",
    problem: "Coordinating logistics for 80,000+ students across multiple countries was a manual nightmare.",
    outcome: "Automated project tracking and UI performance optimization reduced manual workload by 40%.",
    focus: ["Logic", "Performance"],
    tech: ["React", "TypeScript", "VBA", "Node.js"],
    image: "https://picsum.photos/seed/sphinx/800/600"
  },
  {
    id: "02",
    title: "Blacktent Motion Strategy",
    problem: "Brands needed to stand out on social media with cohesive visual identities.",
    outcome: "Increased client engagement by 60% through custom motion graphics and storytelling.",
    focus: ["UX", "Visual"],
    tech: ["After Effects", "Illustrator", "Photoshop"],
    image: "https://picsum.photos/seed/blacktent/800/600"
  },
  {
    id: "03",
    title: "UN ESCWA Digital Assets",
    problem: "Development initiatives in Western Asia lacked modern, accessible visual communication.",
    outcome: "Created standardized international branding assets that improved message clarity.",
    focus: ["Branding", "Accessibility"],
    tech: ["Graphic Design", "Project Management"],
    image: "https://picsum.photos/seed/unescwa/800/600"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Sphinx Publishing Company",
    role: "Frontend Developer & Coordinator",
    period: "2022 - Present",
    highlights: [
      "Designed and implemented responsive user interfaces using HTML5, CSS3, and JavaScript",
      "Optimized UI performance for large-scale logistics platforms",
      "Automated workflows using Excel and VBA scripting"
    ]
  },
  {
    company: "Blacktent Agency",
    role: "Motion Graphic Designer",
    period: "2021 - 2022",
    highlights: [
      "Produced motion graphics for restaurants and resorts",
      "Boosted client engagement through animated storytelling",
      "Managed projects from concept to delivery"
    ]
  }
];
