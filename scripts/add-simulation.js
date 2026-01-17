const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Helper function to create slug from Turkish text
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Helper function to get category gradient
function getCategoryGradient(category) {
  const gradients = {
    mekanik: "from-blue-500 to-cyan-500",
    elektromanyetizma: "from-purple-500 to-pink-500",
    optik: "from-green-500 to-emerald-500",
    termodinamik: "from-yellow-500 to-amber-500",
    "modern-fizik": "from-red-500 to-orange-500",
    kimya: "from-cyan-500 to-blue-500",
    dalgalar: "from-purple-500 to-indigo-500",
    enerji: "from-green-500 to-emerald-500",
    genel: "from-gray-500 to-slate-500",
  };
  return gradients[category] || "from-blue-500 to-cyan-500";
}

// Read simulations.json
const simulationsPath = path.join(process.cwd(), "src", "db", "simulations.json");
const simulationsData = JSON.parse(fs.readFileSync(simulationsPath, "utf-8"));

// Get command line arguments
const args = process.argv.slice(2);
const simulationTitle = args[0];
const webglFolderName = args[1]; // Unity build klasör adı

if (!simulationTitle) {
  console.error("Usage: node add-simulation.js <simulation-title> <webgl-folder-name>");
  console.error("Example: node add-simulation.js 'Kaldırma Kuvveti' 'Buouncy'");
  process.exit(1);
}

if (!webglFolderName) {
  console.error("Error: WebGL folder name is required");
  console.error("Example: node add-simulation.js 'Kaldırma Kuvveti' 'Buouncy'");
  process.exit(1);
}

const slug = createSlug(simulationTitle);
const webglPath = `/webgl-app/${slug}`;

// Check if simulation already exists
const existingSim = simulationsData.simulations.find((s) => s.slug === slug);
if (existingSim) {
  console.error(`Error: Simulation with slug "${slug}" already exists!`);
  process.exit(1);
}

// Check if WebGL folder exists
const webglDir = path.join(process.cwd(), "public", "webgl-app", webglFolderName);
if (!fs.existsSync(webglDir)) {
  console.error(`Error: WebGL folder "${webglFolderName}" does not exist in public/webgl-app/`);
  console.error("Please add the WebGL files first, then run this script.");
  process.exit(1);
}

// Create simulation object template
const simulation = {
  id: slug,
  title: simulationTitle,
  slug: slug,
  description: `${simulationTitle} simülasyonunu interaktif olarak inceleyin`,
  category: "mekanik", // Default, can be updated
  difficulty: "Orta",
  completionTime: "20 dk",
  points: 100,
  gradient: getCategoryGradient("mekanik"),
  unit: "Fizik",
  unitOrder: 1,
  image: "/images/simulation/Resim1.png",
  coverImage: "/images/simulation/Resim1.png",
  previewGif: "/gifs/simulation/blackhole.gif",
  classLevel: "8",
  keywords: [simulationTitle.toLowerCase()],
  physicsExplanation: {
    formulas: [],
    concepts: [],
  },
  learningObjectives: [
    `${simulationTitle} kavramını anlama`,
    "İlgili fiziksel prensipleri öğrenme",
    "Simülasyon ile pratik yapma",
  ],
  reviews: [],
  detailedDescription: `${simulationTitle} simülasyonu ile ilgili kavramları interaktif olarak öğrenin.`,
  webglPath: webglPath,
  relatedMaterials: {
    blogPosts: [],
    examQuestions: [],
    examStats: {
      totalQuestions: 0,
      lastAskedYear: "",
      frequencyPercentage: 0,
      averageDifficulty: 0,
    },
  },
};

// Add to simulations array
simulationsData.simulations.push(simulation);

// Write back to file
fs.writeFileSync(simulationsPath, JSON.stringify(simulationsData, null, 2), "utf-8");

console.log("\n✅ Simulation added to simulations.json!");
console.log(`\nSimulation Details:`);
console.log(`  Title: ${simulationTitle}`);
console.log(`  Slug: ${slug}`);
console.log(`  WebGL Path: ${webglPath}`);
console.log(`  WebGL Folder: ${webglFolderName}`);

// Rename WebGL folder to match slug
const newWebglDir = path.join(process.cwd(), "public", "webgl-app", slug);
if (webglFolderName !== slug && !fs.existsSync(newWebglDir)) {
  console.log(`\n📁 Renaming WebGL folder from "${webglFolderName}" to "${slug}"...`);
  fs.renameSync(webglDir, newWebglDir);
  console.log(`✓ Folder renamed successfully`);
} else if (webglFolderName === slug) {
  console.log(`\n✓ WebGL folder name already matches slug`);
} else {
  console.log(`\n⚠️  Warning: Folder "${slug}" already exists, keeping "${webglFolderName}"`);
  // Update webglPath to use the actual folder name
  simulation.webglPath = `/webgl-app/${webglFolderName}`;
  fs.writeFileSync(simulationsPath, JSON.stringify(simulationsData, null, 2), "utf-8");
}

// Run format script
console.log(`\n📝 Formatting WebGL files...`);
const formatScript = path.join(process.cwd(), "scripts", "format-webgl.js");
const actualFolderName = fs.existsSync(newWebglDir) ? slug : webglFolderName;

const { execSync } = require("child_process");
try {
  execSync(`node ${formatScript} ${actualFolderName}`, { stdio: "inherit" });
} catch (error) {
  console.error("Error running format script:", error.message);
}

console.log(`\n✅ Simulation setup complete!`);
console.log(`\n📋 Next steps:`);
console.log(`1. Update simulation details in src/db/simulations.json:`);
console.log(`   - category (mekanik, optik, termodinamik, etc.)`);
console.log(`   - difficulty (Kolay, Orta, Zor)`);
console.log(`   - classLevel (sınıf seviyesi)`);
console.log(`   - keywords (ilgili anahtar kelimeler)`);
console.log(`   - physicsExplanation (formüller ve kavramlar)`);
console.log(`   - learningObjectives (kazanımlar)`);
console.log(`   - detailedDescription (detaylı açıklama)`);
console.log(`   - relatedMaterials.examQuestions (çıkmış sorular)`);
console.log(`2. Add simulation image to /public/images/simulation/`);
console.log(`3. Test the simulation at: /simulations/${slug}`);

