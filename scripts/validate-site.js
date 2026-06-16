const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const indexPath = path.join(publicDir, "index.html");

const requiredFiles = [
  indexPath,
  path.join(publicDir, "assets", "img", "profile", "profile-new.jpg"),
  path.join(publicDir, "assets", "doc", "CV Jhon Laurens.pdf"),
  path.join(publicDir, "assets", "js", "main.js"),
  path.join(publicDir, "assets", "js", "contact-simple.js"),
];

const missing = requiredFiles.filter((file) => !fs.existsSync(file));

if (!fs.existsSync(indexPath)) {
  console.error("public/index.html is required.");
  process.exit(1);
}

const html = fs.readFileSync(indexPath, "utf8");
const brokenReferences = [
  "assets/img/profile-img.jpg",
  "assets/documents/CV_Jhon_Laurens_2024.pdf",
  "contact@example.com",
  "www.example.com",
  "Cras fermentum",
  "Aenean vel augue",
  "Necessitatibus eius consequatur",
];

const foundBrokenReferences = brokenReferences.filter((text) =>
  html.includes(text)
);

if (missing.length || foundBrokenReferences.length) {
  if (missing.length) {
    console.error("Missing required files:");
    missing.forEach((file) => console.error(`- ${path.relative(root, file)}`));
  }

  if (foundBrokenReferences.length) {
    console.error("Found stale or broken references:");
    foundBrokenReferences.forEach((text) => console.error(`- ${text}`));
  }

  process.exit(1);
}

console.log("Site validation passed.");
