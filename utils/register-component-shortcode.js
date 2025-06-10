const fs = require("fs");
const path = require("path");
const nunjucks = require("nunjucks");

const COMPONENTS_DIR = path.join(__dirname, "../src/_includes/templates");

// Recursively scan for .njk files in the directory and build a component map
function buildComponentMap(dir, base = dir, map = {}) {
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      buildComponentMap(fullPath, base, map);
    } else if (item.endsWith(".njk")) {
      const name = path.basename(item, ".njk");
      if (map[name]) throw new Error(`Duplicate component name: ${name}`);
      map[name] = path.relative(base, fullPath);
    }
  }
  return map;
}

// Build once
const componentMap = buildComponentMap(COMPONENTS_DIR);

// Read all templates once and cache them
const componentTemplates = {};
for (const [name, relativePath] of Object.entries(componentMap)) {
  const absPath = path.join(COMPONENTS_DIR, relativePath);
  componentTemplates[name] = fs.readFileSync(absPath, "utf8");
}

// Export factory to register shortcode
function registerComponentShortcode(eleventyConfig) {
  eleventyConfig.addNunjucksShortcode("component", function (name, props = {}) {
    const template = componentTemplates[name];
    if (!template) {
      throw new Error(`Component "${name}" not found in _includes/templates`);
    }

    const env = this?.env ?? new nunjucks.Environment();
    return new nunjucks.runtime.SafeString(env.renderString(template, props));
  });
}

module.exports = registerComponentShortcode;
