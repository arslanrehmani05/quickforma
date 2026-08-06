import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://www.quickforma.com';
const TODAY = new Date().toISOString().split('T')[0];

// Static site routes
const STATIC_ROUTES = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/privacy', priority: '0.3', changefreq: 'monthly' },
  { path: '/terms', priority: '0.3', changefreq: 'monthly' },
  { path: '/about', priority: '0.4', changefreq: 'monthly' },
  { path: '/contact', priority: '0.4', changefreq: 'monthly' },
];

function generateSitemap() {
  console.log('🚀 Starting QuickForma sitemap.xml generation...');

  // Read tools catalog to extract tool IDs
  const catalogPath = path.join(__dirname, '../src/data/toolsCatalog.ts');
  const catalogContent = fs.readFileSync(catalogPath, 'utf-8');

  // Extract all tool IDs via regex pattern: id: 'tool-id'
  const idRegex = /id:\s*['"]([a-z0-9-]+)['"]/g;
  const toolIds = new Set();
  let match;

  while ((match = idRegex.exec(catalogContent)) !== null) {
    // Exclude category IDs like 'all', 'finance', 'business', 'converters', 'developer', 'content', 'productivity'
    const categoryIds = ['all', 'finance', 'business', 'converters', 'developer', 'content', 'productivity'];
    if (!categoryIds.includes(match[1])) {
      toolIds.add(match[1]);
    }
  }

  const toolList = Array.from(toolIds);
  console.log(`📦 Found ${toolList.length} unique tools in toolsCatalog.ts`);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n`;

  // 1. Add static pages
  STATIC_ROUTES.forEach((route) => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${route.path}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // 2. Add dynamic tool pages
  toolList.forEach((toolId) => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/tools/${toolId}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');

  console.log(`✅ Successfully generated sitemap.xml with ${STATIC_ROUTES.length + toolList.length} total URLs!`);
  console.log(`📍 Saved to: ${outputPath}`);
}

generateSitemap();
