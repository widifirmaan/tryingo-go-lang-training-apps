import { curriculum } from '/data/curriculum.js'
import { getLessonContent } from '/data/lessons.js'
import { renderExercises, initExercises } from '/components/exercises.js'

export default async function lessonPage(params) {
  const main = document.getElementById('main-content')
  const { language, module: moduleId, lesson: lessonId } = params

  if (!language || !moduleId || !lessonId) {
    import('/pages/learn.js').then(m => m.default(params))
    return
  }

  const langData = curriculum[language]
  if (!langData) {
    main.innerHTML = `<div class="error-state"><h2>Language not found</h2></div>`
    return
  }

  let foundLesson = null
  let foundModule = null
  let foundLevel = null

  for (const level of langData.levels) {
    for (const mod of level.modules) {
      if (mod.id === moduleId) {
        foundModule = mod
        foundLevel = level
        foundLesson = mod.lessons.find(l => l.id === lessonId)
        break
      }
    }
    if (foundLesson) break
  }

  if (!foundLesson) {
    main.innerHTML = `<div class="error-state"><h2>Lesson not found</h2><a href="#/learn/${language}" class="btn btn-primary">Back to Course</a></div>`
    return
  }

  const [content, exercisesHtml] = await Promise.all([
    getLessonContent(language, moduleId, lessonId),
    renderExercises(language, moduleId, lessonId)
  ])

  const playgroundLink = language === 'golang' ? '#/playground/go' : '#/playground/html'

  const prevNextNav = getPrevNextNav(langData, moduleId, lessonId, language)

  main.innerHTML = `
    <div class="dashboard">
      <aside class="dashboard-sidebar" id="dashboardSidebar">
        <button class="sidebar-toggle-mobile" id="sidebarClose" style="display:none;margin-bottom:var(--spacing-md)">
          &#x2715; Close Menu
        </button>
        <div class="sidebar-section">
          <div class="sidebar-section-title">${langData.name}</div>
        </div>
        ${(() => {
          return langData.levels.map(level => `
            <div class="sidebar-section">
              <div class="sidebar-section-title">${level.name}</div>
              <div class="sidebar-list">
                ${level.modules.map(mod => `
                  <a href="#/learn/${language}/${mod.id}" class="sidebar-item ${mod.id === moduleId ? 'active' : ''}">
                    <span>${mod.title}</span>
                    <span class="week-badge">${mod.lessons.length}</span>
                  </a>
                `).join('')}
              </div>
            </div>
          `).join('')
        })()}
      </aside>
      <div class="dashboard-content">
        <button class="sidebar-toggle-mobile" id="sidebarToggle">
          &#x2630; Menu
        </button>
        <div class="lesson-header">
          <div class="lesson-breadcrumb">
            <a href="#/learn/${language}">${foundLevel.name}</a>
            <span>›</span>
            <a href="#/learn/${language}/${moduleId}">${foundModule.title}</a>
            <span>›</span>
            <span>${foundLesson.title}</span>
          </div>
          <h1 class="lesson-title">${foundLesson.title}</h1>
          <div class="lesson-meta">
            <span>Module: ${foundModule.title}</span>
            <span>Level: ${foundLevel.name}</span>
          </div>
        </div>
        <div class="lesson-body">
          ${content}
        </div>
        ${exercisesHtml}
        <!-- Playground CTA -->
        <div style="margin-top:var(--spacing-2xl);padding:var(--spacing-lg);background:var(--color-primary-light);border-radius:var(--radius-lg);border:1px solid var(--color-primary)">
          <h3>Practice in Playground</h3>
          <p>Open the interactive playground to write and test your code:</p>
          <a href="${playgroundLink}" class="try-it-button">
            &#x1F3AD; Open Playground
          </a>
        </div>
        <!-- Prev/Next Navigation -->
        ${prevNextNav}
      </div>
    </div>
    <div class="sidebar-overlay" id="sidebarOverlay"></div>`

  initExercises(language, moduleId, lessonId)

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
}

function getPrevNextNav(langData, currentModuleId, currentLessonId, language) {
  let allLessons = []

  for (const level of langData.levels) {
    for (const mod of level.modules) {
      for (const lesson of mod.lessons) {
        allLessons.push({
          ...lesson,
          moduleId: mod.id,
          levelId: level.id
        })
      }
    }
  }

  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId && l.moduleId === currentModuleId)
  if (currentIndex === -1) return ''

  const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  return `
    <div style="display:flex;justify-content:space-between;margin-top:var(--spacing-2xl);gap:var(--spacing-md);flex-wrap:wrap">
      ${prev ? `<a href="#/learn/${language}/${prev.moduleId}/${prev.id}" style="display:flex;align-items:center;gap:var(--spacing-sm);padding:var(--spacing-md) var(--spacing-lg);background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;color:var(--color-text);transition:all var(--transition-fast)">
        <span style="font-size:var(--font-size-lg)">&#x2190;</span>
        <div>
          <div style="font-size:var(--font-size-xs);color:var(--color-text-muted)">Previous</div>
          <div style="font-size:var(--font-size-sm);font-weight:500">${prev.title}</div>
        </div>
      </a>` : '<div></div>'}
      ${next ? `<a href="#/learn/${language}/${next.moduleId}/${next.id}" style="display:flex;align-items:center;gap:var(--spacing-sm);padding:var(--spacing-md) var(--spacing-lg);background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--radius-md);text-decoration:none;color:var(--color-text);text-align:right;transition:all var(--transition-fast)">
        <div>
          <div style="font-size:var(--font-size-xs);color:var(--color-text-muted)">Next</div>
          <div style="font-size:var(--font-size-sm);font-weight:500">${next.title}</div>
        </div>
        <span style="font-size:var(--font-size-lg)">&#x2192;</span>
      </a>` : '<div></div>'}
    </div>`
}
