import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://tryngo.widifirmaan.web.id';
const COURSE_DIR = path.join(__dirname, '../public/data/course');
const OUTPUT_SITEMAP = path.join(__dirname, '../public/sitemap.xml');

// Current date in YYYY-MM-DD
const TODAY = new Date().toISOString().split('T')[0];

const tracks = fs.readdirSync(COURSE_DIR).filter(item => {
  return fs.statSync(path.join(COURSE_DIR, item)).isDirectory();
});

let urls = [];

// 1. Homepage
urls.push(`  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`);

// 2. Tracks and their modules
for (const slug of tracks) {
  // Track page
  urls.push(`  <url>
    <loc>${BASE_URL}/#/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);

  // Quiz page
  urls.push(`  <url>
    <loc>${BASE_URL}/#/quiz/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);

  // IDE page
  urls.push(`  <url>
    <loc>${BASE_URL}/#/ide/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);

  const slugDir = path.join(COURSE_DIR, slug);
  const levels = fs.readdirSync(slugDir).filter(l => fs.statSync(path.join(slugDir, l)).isDirectory());

  for (const level of levels) {
    const idDir = path.join(slugDir, level, 'id');
    if (fs.existsSync(idDir)) {
      const files = fs.readdirSync(idDir).filter(f => f.endsWith('.md'));
      for (const file of files) {
        const weekMatch = file.match(/^week(\d+)-/);
        if (weekMatch) {
          const week = weekMatch[1];
          urls.push(`  <url>
    <loc>${BASE_URL}/#/${slug}/${level}/${week}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
        }
      }
    }
  }
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

fs.writeFileSync(OUTPUT_SITEMAP, sitemapXml, 'utf-8');
console.log(`Generated sitemap with ${urls.length} URLs to: ${OUTPUT_SITEMAP}`);
