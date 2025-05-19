import type {
  SimulationData,
  EducationalMaterial,
  BlogPostData,
  Category,
  SimulationsData,
  MaterialsData,
  BlogData,
  BlogCategory,
  MaterialCategory,
} from "./types";

// Import JSON data
import simulations from "./simulations.json";
import materials from "./materials.json";
import blog from "./blogs.json";

// Type assertions
const simulationsData = simulations as unknown as SimulationsData;
const materialsData = materials as unknown as MaterialsData;
const postsData = blog as unknown as BlogData;

// Export data directly
export const simulationsList = simulationsData.simulations;

// Simulation utilities
export function getSimulations(): SimulationData[] {
  return simulationsData.simulations;
}

export function getSimulationsByCategory(category: Category): SimulationData[] {
  return simulationsData.simulations.filter((sim) => sim.category === category);
}

export function getSimulationBySlug(slug: string): SimulationData | undefined {
  return simulationsData.simulations.find((sim) => sim.slug === slug);
}

export function searchSimulations(
  query: string,
  selectedKeywords: string[]
): SimulationData[] {
  const searchTerm = query.toLowerCase();
  return simulationsData.simulations.filter((sim) => {
    const matchesSearch =
      sim.title.toLowerCase().includes(searchTerm) ||
      sim.description.toLowerCase().includes(searchTerm);

    const matchesKeywords =
      selectedKeywords.length === 0 ||
      selectedKeywords.some((keyword) => sim.keywords.includes(keyword));

    return matchesSearch && matchesKeywords;
  });
}

// Material utilities
export function getMaterials(): EducationalMaterial[] {
  return materialsData.materials;
}

export function getMaterialsByCategory(
  category: MaterialCategory
): EducationalMaterial[] {
  return materialsData.materials.filter(
    (material) => material.category === category
  );
}

export function getMaterialBySlug(
  slug: string
): EducationalMaterial | undefined {
  return materialsData.materials.find((material) => material.slug === slug);
}

export function searchMaterials(
  query: string,
  selectedKeywords: string[]
): EducationalMaterial[] {
  const searchTerm = query.toLowerCase();
  return materialsData.materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm) ||
      material.description.toLowerCase().includes(searchTerm);

    const matchesKeywords =
      selectedKeywords.length === 0 ||
      selectedKeywords.some((keyword) => material.keywords.includes(keyword));

    return matchesSearch && matchesKeywords;
  });
}

// Blog utilities
export function getBlogPosts(): BlogPostData[] {
  return postsData.posts;
}

export function getBlogCategories(): BlogCategory[] {
  return [
    {
      id: "egitim",
      name: "Eğitim",
      description: "Fizik eğitimi ve öğretim yöntemleri",
    },
    {
      id: "teknoloji",
      name: "Teknoloji",
      description: "Eğitim teknolojileri ve yenilikler",
    },
    {
      id: "arastirma",
      name: "Araştırma",
      description: "Bilimsel araştırmalar ve sonuçlar",
    },
  ];
}

export function getBlogPostBySlug(slug: string): BlogPostData | undefined {
  return postsData.posts.find((post) => post.slug === slug);
}

export function getBlogsByCategory(categoryId: string): BlogPostData[] {
  return postsData.posts.filter((blog) => blog.category === categoryId);
}

export function getRelatedBlogPosts(post: BlogPostData): BlogPostData[] {
  return postsData.posts
    .filter(
      (p) =>
        p.id !== post.id &&
        (p.category === post.category ||
          p.keywords.some((keyword) => post.keywords.includes(keyword)))
    )
    .slice(0, 3);
}

export function searchBlogPosts(query: string): BlogPostData[] {
  const searchTerm = query.toLowerCase();
  return postsData.posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm)
  );
}

// Utility functions
export const getUniqueCategories = (): string[] => {
  const categories = new Set<string>();
  simulationsData.simulations.forEach((sim) => categories.add(sim.category));
  materialsData.materials.forEach((mat) => categories.add(mat.category));
  return Array.from(categories);
};

export const getUniqueKeywords = (): string[] => {
  const keywords = new Set<string>();
  materialsData.materials.forEach((mat) =>
    mat.keywords.forEach((k) => keywords.add(k))
  );
  return Array.from(keywords);
};
