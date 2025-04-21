const fs = require("fs");
const path = require("path");

const simulationImages = [
  "harmonic-motion",
  "projectile-motion",
  "circular-motion",
  "newtons-laws",
  "momentum",
  "energy",
  "electric-field",
  "magnetic-induction",
  "lenses",
  "heat-transfer",
];

const publicDir = path.join(process.cwd(), "public");
const simulationsDir = path.join(publicDir, "images", "simulations");

// Create directories if they don't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
if (!fs.existsSync(path.join(publicDir, "images"))) {
  fs.mkdirSync(path.join(publicDir, "images"));
}
if (!fs.existsSync(simulationsDir)) {
  fs.mkdirSync(simulationsDir);
}

// Create placeholder SVG for each simulation
simulationImages.forEach((name) => {
  const filePath = path.join(simulationsDir, `${name}.jpg`);

  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`Skipping ${name}.jpg - already exists`);
    return;
  }

  // Create a simple SVG placeholder
  const svg = `
    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="600" fill="#1f2937"/>
      <text x="400" y="300" font-family="Arial" font-size="24" fill="white" text-anchor="middle">
        ${name
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </text>
    </svg>
  `;

  // Write the SVG file
  fs.writeFileSync(filePath.replace(".jpg", ".svg"), svg.trim());
  console.log(`Created placeholder for ${name}`);
});

console.log("Placeholder images created successfully!");
