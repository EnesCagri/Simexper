// Common types
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Category =
  | "mechanics"
  | "energy"
  | "waves"
  | "thermodynamics"
  | "electromagnetism"
  | "modern-physics";

// Author type
export interface Author {
  name: string;
  avatar: string;
  title?: string;
}

// Simulation types
export type SimulationCategory =
  | "Mechanics"
  | "Energy"
  | "Waves"
  | "Thermodynamics"
  | "Electromagnetism"
  | "Modern Physics";
export type MaterialCategory =
  | "mekanik"
  | "elektrik"
  | "optik"
  | "termodinamik"
  | "modern-fizik";
export type BlogCategory = {
  id: string;
  name: string;
  description?: string;
};

export interface ExampleQuestion {
  question: string;
  type: "multiple-choice" | "open-ended";
  options: string[];
  correctAnswer?: number;
  explanation: string;
}

export interface EducationalMaterial {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: MaterialType;
  difficulty: MaterialDifficulty;
  duration?: string;
  author: string;
  coverImage: string;
  downloadUrl?: string;
  link?: string;
  keywords: string[];
  category: MaterialCategory;
  exampleQuestions?: ExampleQuestion[];
}

export interface SimulationData {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  completionTime: string;
  points: number;
  gradient: string;
  unit: string;
  unitOrder: number;
  image: string;
  coverImage: string;
  previewGif: string;
  keywords: string[];
  exampleQuestions?: ExampleQuestion[];
  howItWorksVideo?: string;
  relatedMaterials?: RelatedMaterials;
  detailedDescription: string;
  learningObjectives: string[];
  reviews: Review[];
}

// Educational Material types
export type MaterialType = "video" | "article" | "interactive";
export type MaterialDifficulty = "beginner" | "intermediate" | "advanced";

export type MaterialLevel = "Başlangıç" | "Orta" | "İleri";

export interface MaterialData {
  slug: string;
  title: string;
  description: string;
  type: MaterialType;
  duration: string;
  level: MaterialLevel;
  image: string;
  link: string;
  keywords: string[];
  category: MaterialCategory;
}

// Blog types
export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    title?: string;
  };
  date: string;
  readingTime: string;
  keywords: string[];
  relatedMaterials: string[];
  relatedSimulations: string[];
  metaDescription: string;
  metaKeywords: string[];
  status: "draft" | "published" | "archived";
  coverImage: string;
  views?: number;
  likes?: number;
  comments?: number;
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PhysicsExplanation {
  formulas: string[];
  concepts: string[];
}

export interface ExamQuestion {
  year: string;
  examType: string;
  question: string;
  correctAnswer: string;
  explanation: string;
  image?: string;
}

export interface ExamStats {
  totalQuestions: number;
  lastAskedYear: string;
  frequencyPercentage: number;
  averageDifficulty: number;
}

export interface RelatedMaterials {
  examQuestions: ExamQuestion[];
  examStats: ExamStats;
  blogPosts: BlogPostData[];
}

// Database types
export interface SimulationsData {
  simulations: SimulationData[];
}

export interface MaterialsData {
  materials: EducationalMaterial[];
}

export interface BlogData {
  posts: BlogPostData[];
  categories?: BlogCategory[];
}
