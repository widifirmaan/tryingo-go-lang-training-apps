import { curriculum } from '/data/curriculum.js'
import { languages } from '/data/languages.js'

function renderSidebar(langData, currentModule, currentLesson) {
  const lang = langData.name
  const levels = langData.levels

  return levels.map(level => `
    <div class="sidebar-section">
      <div class="sidebar-section-title">${level.name}</div>
      <div class="sidebar-list">
        ${level.modules.map(mod => {
          const isActive = mod.id === currentModule
          const modulePath = `/learn/${lang === 'Go (Golang)' ? 'golang' : 'html'}/${mod.id}`
          return `
            <a href="${modulePath}" class="sidebar-item ${isActive ? 'active' : ''}">
              <span>${mod.title}</span>
              <span class="week-badge">${mod.lessons.length}</span>
            </a>`
        }).join('')}
      </div>
    </div>
  `).join('')
}

function renderModuleContent(langSlug, level, mod) {
  if (!mod) {
    return `
      <div class="lesson-header">
        <h1 class="lesson-title">Select a Module</h1>
        <p class="lesson-body">Choose a module from the sidebar to start learning.</p>
      </div>`
  }

  return `
    <div class="lesson-header">
      <div class="lesson-breadcrumb">
        <a href="/learn/${langSlug}">${level.name}</a>
        <span>›</span>
        <span>${mod.title}</span>
      </div>
      <h1 class="lesson-title">${mod.title}</h1>
      <p style="color:var(--color-text-secondary);margin-bottom:var(--spacing-lg)">${mod.subtitle}</p>
      <div class="lesson-meta">
        <span>${mod.lessons.length} lessons</span>
      </div>
    </div>
    <div class="lesson-body">
      <h2>Lessons</h2>
      <ul style="list-style:none;padding:0">
        ${mod.lessons.map((lesson, idx) => `
          <li style="margin-bottom:var(--spacing-sm);padding:var(--spacing-md);background:var(--color-bg-alt);border-radius:var(--radius-md);border:1px solid var(--color-border-light);display:flex;align-items:center;gap:var(--spacing-md)">
            <span style="width:2rem;height:2rem;display:flex;align-items:center;justify-content:center;background:var(--color-primary);color:white;border-radius:50%;font-size:var(--font-size-sm);font-weight:600;flex-shrink:0">${idx + 1}</span>
            <a href="/learn/${langSlug}/${mod.id}/${lesson.id}" style="flex:1;font-weight:500;text-decoration:none;color:var(--color-text)">
              ${lesson.title}
            </a>
            <span style="font-size:var(--font-size-sm);color:var(--color-text-muted)">&#x2192;</span>
          </li>
        `).join('')}
      </ul>
      <div style="margin-top:var(--spacing-xl);padding:var(--spacing-lg);background:var(--color-primary-light);border-radius:var(--radius-lg);border:1px solid var(--color-primary)">
        <h3 style="margin-top:0">Try It Now</h3>
        <p>Open the playground to practice what you've learned:</p>
        <a href="/playground/${langSlug === 'golang' ? 'go' : 'html'}" class="try-it-button">
          Open Playground
        </a>
      </div>
    </div>`
}

export default async function learnPage(params) {
  const main = document.getElementById('main-content')
  const langSlug = params.language || 'golang'
  const currentModule = params.module || null
  const currentLesson = params.lesson || null

  const langData = curriculum[langSlug]
  const langInfo = languages.find(l => l.id === langSlug)

  if (!langData) {
    main.innerHTML = `<div class="error-state"><h2>Language not found</h2><p>We don't have materials for "${langSlug}" yet.</p><a href="/" class="btn btn-primary">Go Home</a></div>`
    return
  }

  let currentMod = null
  let currentLevel = null

  if (currentModule) {
    for (const level of langData.levels) {
      const mod = level.modules.find(m => m.id === currentModule)
      if (mod) {
        currentMod = mod
        currentLevel = level
        break
      }
    }
  }

  main.innerHTML = `
    <div class="dashboard">
      <aside class="dashboard-sidebar" id="dashboardSidebar">
        <button class="sidebar-toggle-mobile" id="sidebarClose" style="display:none;margin-bottom:var(--spacing-md)">
          &#x2715; Close Menu
        </button>
        <div class="sidebar-section">
          <div class="sidebar-section-title">${langData.name}</div>
        </div>
        ${renderSidebar(langData, currentModule, currentLesson)}
      </aside>
      <div class="dashboard-content">
        <button class="sidebar-toggle-mobile" id="sidebarToggle">
          &#x2630; Menu
        </button>
        ${renderModuleContent(langSlug, currentLevel || langData.levels[0], currentMod)}
      </div>
    </div>
    <div class="sidebar-overlay" id="sidebarOverlay"></div>`

  const sidebar = document.getElementById('dashboardSidebar')
  const overlay = document.getElementById('sidebarOverlay')
  const toggleBtn = document.getElementById('sidebarToggle')
  const closeBtn = document.getElementById('sidebarClose')

  if (toggleBtn && sidebar && overlay) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.add('open')
      overlay.classList.add('open')
      document.body.style.overflow = 'hidden'
    })

    const closeSidebar = () => {
      sidebar.classList.remove('open')
      overlay.classList.remove('open')
      document.body.style.overflow = ''
    }

    overlay.addEventListener('click', closeSidebar)
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar)
  }

  if (currentLesson) {
    import('/pages/lesson.js').then(m => m.default(params))
  }
}
