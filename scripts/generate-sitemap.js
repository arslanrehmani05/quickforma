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
  { path: '/business', priority: '0.9', changefreq: 'daily' },
  { path: '/students', priority: '0.9', changefreq: 'daily' },
  { path: '/privacy', priority: '0.3', changefreq: 'monthly' },
  { path: '/terms', priority: '0.3', changefreq: 'monthly' },
  { path: '/about', priority: '0.4', changefreq: 'monthly' },
  { path: '/contact', priority: '0.4', changefreq: 'monthly' },
];

async function fetchSanityArticles() {
  const envPath = path.join(__dirname, '../.env');
  let envVars = {};
  if (fs.existsSync(envPath)) {
    const envLines = fs.readFileSync(envPath, 'utf-8').split('\n');
    envLines.forEach(line => {
      const match = line.match(/^\s*([\w]+)\s*=\s*(.*)\s*$/);
      if (match) {
        envVars[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
      }
    });
  }

  const projectId = process.env.VITE_SANITY_PROJECT_ID || envVars.VITE_SANITY_PROJECT_ID || '60xo4tvv';
  const dataset = process.env.VITE_SANITY_DATASET || envVars.VITE_SANITY_DATASET || 'production';
  const apiVersion = process.env.VITE_SANITY_API_VERSION || envVars.VITE_SANITY_API_VERSION || '2026-01-01';
  const token = process.env.VITE_SANITY_TOKEN || envVars.VITE_SANITY_TOKEN || '';

  const groq = `*[_type in ["article", "playbook"] && defined(slug.current)]{_type, "slug": slug.current, _updatedAt, publishedAt}`;
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(groq)}`;

  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, { headers });
    const data = await res.json();
    return Array.isArray(data.result) ? data.result : [];
  } catch (err) {
    console.warn('⚠️ Could not fetch Sanity documents for sitemap:', err.message);
    return [];
  }
}

async function generateSitemap() {
  console.log('🚀 Starting QuickForma sitemap.xml generation...');

  // Read tools catalog to extract tool IDs
  const catalogPath = path.join(__dirname, '../src/data/toolsCatalog.ts');
  const catalogContent = fs.readFileSync(catalogPath, 'utf-8');

  // Extract all tool IDs via regex pattern: id: 'tool-id' or "id": "tool-id"
  const idRegex = /["']?id["']?:\s*['"]([a-z0-9-]+)['"]/g;
  const toolIds = new Set();
  let match;

  while ((match = idRegex.exec(catalogContent)) !== null) {
    // Exclude category IDs like 'all', 'finance', 'business', 'ecommerce', etc.
    const categoryIds = ['all', 'finance', 'business', 'ecommerce', 'operations', 'hr', 'marketing', 'healthcare', 'converters', 'developer', 'content', 'productivity'];
    if (!categoryIds.includes(match[1])) {
      toolIds.add(match[1]);
    }
  }

  const toolList = Array.from(toolIds);
  console.log(`📦 Found ${toolList.length} unique tools in toolsCatalog.ts`);

  // Fetch Sanity articles and playbooks
  const sanityDocs = await fetchSanityArticles();
  console.log(`📰 Found ${sanityDocs.length} published Sanity articles & playbooks`);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

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

  // 3. Add dynamic Sanity articles & playbooks
  sanityDocs.forEach((doc) => {
    const routePrefix = doc._type === 'playbook' ? '/playbooks/' : '/blog/';
    const lastModDate = doc.publishedAt
      ? doc.publishedAt.split('T')[0]
      : doc._updatedAt
      ? doc._updatedAt.split('T')[0]
      : TODAY;

    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${routePrefix}${doc.slug}</loc>\n`;
    xml += `    <lastmod>${lastModDate}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');

  console.log(`✅ Successfully generated sitemap.xml with ${STATIC_ROUTES.length + toolList.length + sanityDocs.length} total URLs!`);
  console.log(`📍 Saved to: ${outputPath}`);
}

generateSitemap();
