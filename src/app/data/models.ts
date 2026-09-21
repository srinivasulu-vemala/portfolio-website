export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface Profile {
  name: string;
  role: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  links: SocialLink[];
  summary: string[];
  positioningLine: string;
}

export interface Experience {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string | 'Present';
  responsibilities: string[];
}

export interface DiagramNode {
  id: string;
  label: string;
  kind: 'external' | 'service' | 'store' | 'client';
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  direction?: 'forward' | 'return';
}

export interface DiagramSpec {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  caption: string;
  altText: string;
}

export interface ContributionGroup {
  title: string;
  points: string[];
}

export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  domain: string;
  deployments?: string[];
  organisation: string;
  roleLine: string;
  period?: string;
  stack: string[];
  summary: string;
  systemDescription: string[];
  contributionGroups: ContributionGroup[];
  engineeringNotes: string[];
  diagram?: DiagramSpec;
  liveUrl?: string;
  isSolo: boolean;
  order: number;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Education {
  institution: string;
  qualification: string;
  score: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  url?: string;
}
