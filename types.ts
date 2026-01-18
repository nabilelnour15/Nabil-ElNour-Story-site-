
export interface Project {
  id: string;
  title: string;
  problem: string;
  outcome: string;
  focus: string[];
  tech: string[];
  image: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Pillar {
  title: string;
  description: string;
  icon: string;
}
