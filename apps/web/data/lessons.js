import { mdToHtml } from '/utils/markdown.js'
import { curriculum } from '/data/curriculum.js'

const lessonCache = new Map()

export async function getLessonContent(language, moduleId, lessonId) {
  const cacheKey = `${language}/${moduleId}/${lessonId}`
  if (lessonCache.has(cacheKey)) {
    return lessonCache.get(cacheKey)
  }

  const moduleInfo = findModule(language, moduleId)
  if (!moduleInfo) {
    const fallback = getDefaultContent(lessonId)
    lessonCache.set(cacheKey, fallback)
    return fallback
  }

  const dirName = moduleIdToDir(moduleId, moduleInfo.title)
  const path = `/materials/${language}/${moduleInfo.level}/${dirName}/${lessonId}.md`

  try {
    const res = await fetch(path)
    if (res.ok) {
      const text = await res.text()
      if (!text.startsWith('<!')) {
        const html = mdToHtml(text)
        lessonCache.set(cacheKey, html)
        return html
      }
    }
  } catch {}

  const fallback = getDefaultContent(lessonId)
  lessonCache.set(cacheKey, fallback)
  return fallback
}

function findModule(language, moduleId) {
  const lang = curriculum[language]
  if (!lang) return null

  for (const level of lang.levels) {
    for (const mod of level.modules) {
      if (mod.id === moduleId) {
        return { ...mod, level: level.id }
      }
    }
  }
  return null
}

function moduleIdToDir(moduleId, title) {
  const slug = title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return `${moduleId}-${slug}`
}

function getLevelFromModuleId(language, moduleId) {
  const weekNum = parseInt(moduleId.replace('week-', ''))
  if (language === 'golang') {
    if (weekNum <= 6) return 'beginner'
    if (weekNum <= 16) return 'intermediate'
    if (weekNum <= 26) return 'advanced'
    return 'professional'
  }
  if (language === 'html') {
    if (weekNum <= 8) return 'beginner'
    return 'advanced'
  }
  return 'beginner'
}

function getDefaultContent(lessonId) {
  const title = lessonId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  return `
<h2>${title}</h2>
<p>This lesson content is being loaded from our curriculum materials.</p>
<p>If you're seeing this message, the markdown file may not be available yet.</p>
<div style="background:var(--color-primary-light);padding:var(--spacing-md);border-radius:var(--radius-md);margin-top:var(--spacing-lg)">
  <p><strong>Tip:</strong> Open the Playground to practice what you've learned so far!</p>
  <a href="/playground/go" class="try-it-button">Open Playground</a>
</div>`
}
