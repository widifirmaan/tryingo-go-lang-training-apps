import Fuse from 'fuse.js';

export interface SearchEntry {
  slug: string;
  trackName: string;
  level: string;
  levelName: string;
  lang: string;
  week: number;
  weekTopic: string;
  category: string;
  file: string;
  title: string;
  excerpt: string;
  body: string;
}

let fuseInstance: Fuse<SearchEntry> | null = null;
let loadPromise: Promise<void> | null = null;

async function loadIndex(): Promise<void> {
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      const res = await fetch('/search-index.json');
      const data = await res.json();
      const entries: SearchEntry[] = data.entries || [];

      fuseInstance = new Fuse(entries, {
        keys: [
          { name: 'title', weight: 0.4 },
          { name: 'trackName', weight: 0.25 },
          { name: 'body', weight: 0.2 },
          { name: 'category', weight: 0.1 },
          { name: 'weekTopic', weight: 0.05 },
        ],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 2,
      });
    } catch (err) {
      console.error('Search index load failed:', err);
      fuseInstance = null;
    }
  })();

  return loadPromise;
}

export async function searchCourseContent(
  query: string,
  options?: { lang?: string; limit?: number }
): Promise<SearchEntry[]> {
  await loadIndex();

  if (!fuseInstance || !query.trim()) return [];

  const { lang, limit = 20 } = options || {};
  const results = fuseInstance.search(query.trim());

  let filtered = results.map((r) => r.item);

  if (lang) {
    filtered = filtered.filter((e) => e.lang === lang);
  }

  return filtered.slice(0, limit);
}

export function getSearchStatus(): { loaded: boolean; totalEntries: number } {
  return {
    loaded: fuseInstance !== null,
    totalEntries: fuseInstance?.getIndex()?.size() || 0,
  };
}
