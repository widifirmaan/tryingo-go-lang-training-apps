import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'public', 'data', 'course');
const OUTPUT_DIR = join(__dirname, '..', 'public');
const OUTPUT_FILE = join(OUTPUT_DIR, 'search-index.json');

const SLUG_NAME_MAP = {
  angular: 'Angular',
  codeigniter: 'CodeIgniter',
  csharp: 'C#',
  css3: 'CSS3',
  django: 'Django',
  docker: 'Docker',
  golang: 'Go',
  graphql: 'GraphQL',
  html5: 'HTML5',
  javascript: 'JavaScript',
  laravel: 'Laravel',
  mongodb: 'MongoDB',
  mysql: 'MySQL',
  nestjs: 'NestJS',
  nextjs: 'Next.js',
  nodejs: 'Node.js',
  php: 'PHP',
  postgresql: 'PostgreSQL',
  python: 'Python',
  rails: 'Ruby on Rails',
  react: 'React',
  redis: 'Redis',
  rust: 'Rust',
  spring: 'Spring Boot',
  svelte: 'Svelte',
  typescript: 'TypeScript',
  vue: 'Vue.js',
};

const LEVEL_MAP = {
  beginer: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  pro: 'Professional',
};

function extractTitle(content, slug) {
  const titleMatch = content.match(/^#\s+(.+)/m);
  return titleMatch ? titleMatch[1].trim() : SLUG_NAME_MAP[slug] || slug;
}

function extractMeta(content) {
  const category = content.match(/\*\*Kategori:\*\*\s*(.+)/i);
  const level = content.match(/\*\*Level:\*\*\s*(.+)/i);
  const week = content.match(/\*\*Minggu\s*\d+:\*\*\s*(.+)/i);
  return {
    category: category ? category[1].trim() : '',
    level: level ? level[1].trim() : '',
    week: week ? week[1].trim() : '',
  };
}

function stripMarkdown(text) {
  return text
    .replace(/^#+\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/`{1,3}.+?`{1,3}/g, '')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/^>\s+/gm, '')
    .replace(/[-*+]\s+/gm, '')
    .replace(/\d+\.\s+/gm, '')
    .replace(/\|.+\|/g, '')
    .replace(/---+/g, '')
    .replace(/\n{3,}/g, '\n')
    .trim();
}

async function buildIndex() {
  console.log('Building search index from:', DATA_DIR);

  if (!existsSync(DATA_DIR)) {
    console.error('Data directory not found:', DATA_DIR);
    process.exit(1);
  }

  const entries = [];
  const slugs = readdirSync(DATA_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const slug of slugs) {
    const trackDir = join(DATA_DIR, slug);
    const levels = readdirSync(trackDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const level of levels) {
      const levelDir = join(trackDir, level);
      const langs = readdirSync(levelDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);

      for (const lang of langs) {
        const langDir = join(levelDir, lang);
        let files;
        try {
          files = readdirSync(langDir).filter((f) => f.endsWith('.md'));
        } catch {
          continue;
        }

        for (const file of files) {
          const filePath = join(langDir, file);
          const content = readFileSync(filePath, 'utf-8');
          const title = extractTitle(content, slug);
          const meta = extractMeta(content);
          const plainText = stripMarkdown(content);

          const weekMatch = file.match(/week-?(\d+)/i);
          const weekNum = weekMatch ? parseInt(weekMatch[1]) : 0;

          entries.push({
            slug,
            trackName: SLUG_NAME_MAP[slug] || slug,
            level,
            levelName: LEVEL_MAP[level] || level,
            lang,
            week: weekNum,
            weekTopic: meta.week,
            category: meta.category || '',
            file,
            title,
            excerpt: plainText.slice(0, 300),
            body: plainText.slice(0, 2000),
          });
        }
      }
    }
  }

  const index = {
    generated: new Date().toISOString(),
    totalFiles: entries.length,
    entries,
  };

  writeFileSync(OUTPUT_FILE, JSON.stringify(index));
  console.log(`Wrote ${entries.length} entries to ${OUTPUT_FILE}`);
}

buildIndex().catch(console.error);
