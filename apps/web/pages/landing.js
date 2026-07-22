import { languages } from '/data/languages.js'

function renderStars() {
  return Array.from({ length: 8 }, (_, i) =>
    `<div class="ghibli-star" style="animation-delay:${i * 0.4}s"></div>`
  ).join('')
}

function renderClouds() {
  return `
    <div class="ghibli-cloud ghibli-cloud-1"></div>
    <div class="ghibli-cloud ghibli-cloud-2"></div>
    <div class="ghibli-cloud ghibli-cloud-3"></div>`
}

function renderSparkles() {
  const emojis = ['✨', '🌟', '⭐', '💫', '🌸']
  return emojis.map((e, i) =>
    `<span class="ghibli-sparkle" style="animation-delay:${i * 0.5}s">${e}</span>`
  ).join('')
}

function renderTrees() {
  return `
    <div class="ghibli-tree ghibli-tree-1">
      <div class="ghibli-tree-top"></div>
      <div class="ghibli-tree-trunk"></div>
    </div>
    <div class="ghibli-tree ghibli-tree-2">
      <div class="ghibli-tree-top"></div>
      <div class="ghibli-tree-trunk"></div>
    </div>`
}

function renderTotoro() {
  return `
    <div class="ghibli-totoro">
      <div class="ghibli-totoro-ear-left"></div>
      <div class="ghibli-totoro-ear-right"></div>
      <div class="ghibli-totoro-leaf"></div>
      <div class="ghibli-totoro-body">
        <div class="ghibli-totoro-belly"></div>
        <div class="ghibli-totoro-eye-left"></div>
        <div class="ghibli-totoro-eye-right"></div>
        <div class="ghibli-totoro-nose"></div>
        <div class="ghibli-totoro-whisker-left"></div>
        <div class="ghibli-totoro-whisker-right"></div>
      </div>
      <div class="ghibli-totoro-arm-left"></div>
      <div class="ghibli-totoro-arm-right"></div>
    </div>`
}

function renderHero() {
  return `
    <section class="ghibli-hero">
      <div class="ghibli-stars">${renderStars()}</div>
      ${renderClouds()}
      ${renderSparkles()}
      <div class="ghibli-hills"></div>
      ${renderTrees()}
      ${renderTotoro()}
      <div class="ghibli-content">
        <div class="ghibli-badge">&#x1F680; Interactive Learning Platform</div>
        <h1 class="ghibli-title">
          Learn to Code<br/>
          <span class="highlight">From Zero to Professional</span>
        </h1>
        <p class="ghibli-subtitle">
          Interactive coding tutorials with built-in playground. Start with Go and HTML5,
          master the fundamentals, and build real-world projects at your own pace.
        </p>
        <div class="ghibli-actions">
          <a href="#languages" class="btn-ghibli-primary">Start Learning</a>
          <a href="/playground/go" class="btn-ghibli-secondary">Try Playground</a>
        </div>
      </div>
    </section>`
}

function renderCard(lang) {
  const badge = lang.comingSoon
    ? '<span class="ghibli-card-badge coming-soon">Coming Soon</span>'
    : `<span class="ghibli-card-badge">${lang.modules} modules · ${lang.lessons} lessons</span>`

  return `
    <a href="${lang.comingSoon ? '#' : `/learn/${lang.id}`}" class="ghibli-card" ${lang.comingSoon ? 'style="opacity:0.7;cursor:default;"' : ''}>
      <span class="ghibli-card-icon">${lang.icon}</span>
      <h3 class="ghibli-card-name">${lang.name}</h3>
      <p class="ghibli-card-desc">${lang.description}</p>
      ${badge}
    </a>`
}

function renderLanguages() {
  return `
    <section class="ghibli-languages" id="languages">
      <div class="ghibli-section-header">
        <div class="ghibli-section-icon">&#x1F31F;</div>
        <h2 class="ghibli-section-title">Choose Your Language</h2>
        <p class="ghibli-section-subtitle">Start your programming journey with one of our available courses</p>
        <div class="ghibli-search">
          <span class="ghibli-search-icon">&#x1F50D;</span>
          <input type="search" class="ghibli-search-input" id="languageSearch" placeholder="Search languages..." aria-label="Search languages" />
        </div>
      </div>
      <div class="ghibli-cards" id="languageCards">
        ${languages.map(renderCard).join('')}
      </div>
    </section>`
}

function renderFeatures() {
  return `
    <section class="ghibli-features">
      <div class="ghibli-section-header">
        <h2 class="ghibli-section-title">Why Learn With Us?</h2>
        <p class="ghibli-section-subtitle">Everything you need to go from beginner to professional</p>
      </div>
      <div class="ghibli-features-grid">
        <div class="ghibli-feature-card">
          <div class="ghibli-feature-icon">&#x1F4DA;</div>
          <h3 class="ghibli-feature-title">Structured Curriculum</h3>
          <p class="ghibli-feature-desc">Bootcamp-quality content organized from beginner to professional. 52 weeks of Go, 24 weeks of HTML5.</p>
        </div>
        <div class="ghibli-feature-card">
          <div class="ghibli-feature-icon">&#x1F3AD;</div>
          <h3 class="ghibli-feature-title">Interactive Playground</h3>
          <p class="ghibli-feature-desc">Write, run, and test code directly in your browser. No setup required.</p>
        </div>
        <div class="ghibli-feature-card">
          <div class="ghibli-feature-icon">&#x1F4BB;</div>
          <h3 class="ghibli-feature-title">Project-Based Learning</h3>
          <p class="ghibli-feature-desc">Build real projects at every level. From CLI tools to microservices, portfolio to production.</p>
        </div>
        <div class="ghibli-feature-card">
          <div class="ghibli-feature-icon">&#x1F30D;</div>
          <h3 class="ghibli-feature-title">Multi-Language Support</h3>
          <p class="ghibli-feature-desc">Start with Go and HTML5. Python, JavaScript, TypeScript, and Rust coming soon.</p>
        </div>
        <div class="ghibli-feature-card">
          <div class="ghibli-feature-icon">&#x1F512;</div>
          <h3 class="ghibli-feature-title">Progress Tracking</h3>
          <p class="ghibli-feature-desc">Track your learning journey, bookmark lessons, and earn achievements. (Coming soon)</p>
        </div>
        <div class="ghibli-feature-card">
          <div class="ghibli-feature-icon">&#x1F310;</div>
          <h3 class="ghibli-feature-title">Fully Responsive</h3>
          <p class="ghibli-feature-desc">Learn on any device — desktop, tablet, or mobile. Optimized for all screen sizes.</p>
        </div>
      </div>
    </section>`
}

function scrollToHash() {
  const hash = window.location.hash
  if (!hash) return
  const el = document.getElementById(hash.slice(1))
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default async function landingPage() {
  const main = document.getElementById('main-content')
  document.body.style.overflow = ''
  main.innerHTML = `
    ${renderHero()}
    ${renderLanguages()}
    ${renderFeatures()}`

  scrollToHash()
  window.addEventListener('hashchange', scrollToHash)

  const searchInput = document.getElementById('languageSearch')
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase()
      document.querySelectorAll('.ghibli-card').forEach((card, index) => {
        const name = languages[index].name.toLowerCase()
        const desc = languages[index].description.toLowerCase()
        card.style.display = name.includes(query) || desc.includes(query) ? 'flex' : 'none'
      })
    })
  }
}
