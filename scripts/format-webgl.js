const fs = require("fs");
const path = require("path");

// Get the WebGL folder path from command line arguments
const webglFolderName = process.argv[2];

if (!webglFolderName) {
  console.error("Usage: node format-webgl.js <webgl-folder-name>");
  console.error("Example: node format-webgl.js kaldirma-kuvveti");
  process.exit(1);
}

const publicDir = path.join(process.cwd(), "public");
const webglAppDir = path.join(publicDir, "webgl-app");
const targetWebglDir = path.join(webglAppDir, webglFolderName);
const basicWebglDir = path.join(webglAppDir, "Basic");

// Check if target directory exists
if (!fs.existsSync(targetWebglDir)) {
  console.error(`Error: WebGL folder "${webglFolderName}" does not exist in public/webgl-app/`);
  process.exit(1);
}

// Check if Basic directory exists (for reference)
if (!fs.existsSync(basicWebglDir)) {
  console.error(`Error: Reference Basic folder does not exist in public/webgl-app/`);
  process.exit(1);
}

console.log(`Formatting WebGL files in: ${targetWebglDir}`);

// Read Basic index.html as template
const basicIndexHtml = fs.readFileSync(
  path.join(basicWebglDir, "index.html"),
  "utf-8"
);

// Read Basic style.css as template
const basicStyleCss = fs.readFileSync(
  path.join(basicWebglDir, "TemplateData", "style.css"),
  "utf-8"
);

// Find the loader.js file in Build directory
const buildDir = path.join(targetWebglDir, "Build");
let loaderFileName = null;

if (fs.existsSync(buildDir)) {
  const buildFiles = fs.readdirSync(buildDir);
  const loaderFile = buildFiles.find((file) => file.endsWith(".loader.js"));
  
  if (loaderFile) {
    loaderFileName = loaderFile.replace(".loader.js", "");
    console.log(`Found loader file: ${loaderFile}`);
  } else {
    console.warn("Warning: No .loader.js file found in Build directory");
  }
} else {
  console.warn("Warning: Build directory does not exist");
}

// Format index.html
const targetIndexHtmlPath = path.join(targetWebglDir, "index.html");
let formattedIndexHtml = basicIndexHtml;

// Update loader file name if found
if (loaderFileName) {
  // Replace Basic.loader.js with the actual loader file name
  formattedIndexHtml = formattedIndexHtml.replace(
    /Basic\.loader\.js/g,
    `${loaderFileName}.loader.js`
  );
  // Replace Basic.data.unityweb, Basic.framework.js.unityweb, Basic.wasm.unityweb
  formattedIndexHtml = formattedIndexHtml.replace(
    /Basic\.(data|framework\.js|wasm)\.unityweb/g,
    `${loaderFileName}.$1.unityweb`
  );
}

// Write formatted index.html
fs.writeFileSync(targetIndexHtmlPath, formattedIndexHtml, "utf-8");
console.log("✓ Formatted index.html");

// Ensure TemplateData directory exists
const templateDataDir = path.join(targetWebglDir, "TemplateData");
if (!fs.existsSync(templateDataDir)) {
  fs.mkdirSync(templateDataDir, { recursive: true });
  console.log("✓ Created TemplateData directory");
}

// Copy style.css to TemplateData
const targetStyleCssPath = path.join(templateDataDir, "style.css");
fs.writeFileSync(targetStyleCssPath, basicStyleCss, "utf-8");
console.log("✓ Formatted style.css");

// Check if TemplateData assets exist, if not, copy from Basic
const basicTemplateDataDir = path.join(basicWebglDir, "TemplateData");
const templateAssets = [
  "favicon.ico",
  "fullscreen-button.png",
  "unity-logo-dark.png",
  "unity-logo-light.png",
  "webgl-logo.png",
];

templateAssets.forEach((asset) => {
  const basicAssetPath = path.join(basicTemplateDataDir, asset);
  const targetAssetPath = path.join(templateDataDir, asset);
  
  if (fs.existsSync(basicAssetPath) && !fs.existsSync(targetAssetPath)) {
    fs.copyFileSync(basicAssetPath, targetAssetPath);
    console.log(`✓ Copied ${asset}`);
  }
});

console.log("\n✅ WebGL files formatted successfully!");
console.log(`\n📋 Next steps:`);
console.log(`1. Verify the files in: ${targetWebglDir}`);
console.log(`2. If not already done, add simulation to simulations.json:`);
console.log(`   Run: node scripts/add-simulation.js "<title>" "${webglFolderName}"`);
console.log(`3. Update simulation content in simulations.json:`);
console.log(`   - learningObjectives (kazanımlar)`);
console.log(`   - physicsExplanation (formüller ve kavramlar)`);
console.log(`   - relatedMaterials.examQuestions (çıkmış sorular)`);

