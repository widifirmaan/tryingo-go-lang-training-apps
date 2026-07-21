import { languages } from '/data/languages.js'

function renderHero() {
  return `
    <section class="hero">
      <div class="hero-decoration"></div>
      <div class="hero-decoration-2"></div>
      <div class="hero-content">
        <div class="hero-badge">&#x1F680; Interactive Learning Platform</div>
        <h1 class="hero-title">
          Learn to Code<br/>
          <span class="highlight">From Zero to Professional</span>
        </h1>
        <p class="hero-subtitle">
          Interactive coding tutorials with built-in playground. Start with Go and HTML5,
          master the fundamentals, and build real-world projects at your own pace.
        </p>
        <div class="hero-actions">
          <a href="/learn/golang" class="btn btn-primary">Start Learning Go</a>
          <a href="/learn/html" class="btn btn-secondary">Learn HTML5</a>
          <a href="/playground/go" class="btn btn-secondary">Try Playground</a>
        </div>
      </div>
    </section>`
}

function renderFeatures() {
  return `
    <section class="features-section">
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">&#x1F4DA;</div>
          <h3 class="feature-title">Structured Curriculum</h3>
          <p class="feature-desc">Bootcamp-quality content organized from beginner to professional. 52 weeks of Go, 24 weeks of HTML5.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">&#x1F3AD;</div>
          <h3 class="feature-title">Interactive Playground</h3>
          <p class="feature-desc">Write, run, and test code directly in your browser. No setup required. Like W3Schools, but more powerful.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">&#x1F4BB;</div>
          <h3 class="feature-title">Project-Based Learning</h3>
          <p class="feature-desc">Build real projects at every level. From CLI tools to microservices, portfolio to production.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">&#x1F30D;</div>
          <h3 class="feature-title">Multi-Language Support</h3>
          <p class="feature-desc">Start with Go and HTML5. Python, JavaScript, TypeScript, and Rust coming soon.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">&#x1F512;</div>
          <h3 class="feature-title">Progress Tracking</h3>
          <p class="feature-desc">Track your learning journey, bookmark lessons, and earn achievements. (Coming soon)</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">&#x1F310;</div>
          <h3 class="feature-title">Fully Responsive</h3>
          <p class="feature-desc">Learn on any device - desktop, tablet, or mobile. Optimized for all screen sizes.</p>
        </div>
      </div>
    </section>`
}

function renderCard(lang) {
  const badge = lang.comingSoon
    ? '<span style="background:#f59e0b;color:white;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600">Coming Soon</span>'
    : `<span>${lang.modules} modules</span><span>${lang.lessons} lessons</span>`

  return `
    <a href="${lang.comingSoon ? '#' : `/learn/${lang.id}`}" class="language-card" data-level="${lang.level}" style="${lang.comingSoon ? 'opacity:0.6;cursor:default;' : ''}">
      <div class="language-card-icon">${lang.icon}</div>
      <h3 class="language-card-name">${lang.name}</h3>
      <p class="language-card-desc">${lang.description}</p>
      <div class="language-card-meta">
        ${badge}
      </div>
    </a>`
}

function renderLanguages() {
  return `
    <section class="languages-section">
      <div class="section-header">
        <h2 class="section-title">Choose Your Language</h2>
        <p class="section-subtitle">Start your programming journey with one of our available courses</p>
        <div class="search-container">
          <span class="search-icon">&#x1F50D;</span>
          <input type="search" class="search-input" id="languageSearch" placeholder="Search languages..." aria-label="Search languages" />
        </div>
      </div>
      <div class="language-cards-grid" id="languageCards">
        ${languages.map(renderCard).join('')}
      </div>
    </section>`
}

export default async function landingPage() {
  const main = document.getElementById('main-content')
  main.innerHTML = `
    ${renderHero()}
    ${renderLanguages()}
    ${renderFeatures()}`

  const searchInput = document.getElementById('languageSearch')
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase()
      document.querySelectorAll('.language-card').forEach((card, index) => {
        const name = languages[index].name.toLowerCase()
        const desc = languages[index].description.toLowerCase()
        card.style.display = name.includes(query) || desc.includes(query) ? 'flex' : 'none'
      })
    })
  }
}
