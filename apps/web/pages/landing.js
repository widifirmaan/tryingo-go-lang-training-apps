import { translate, applyTranslations } from '/utils/i18n.js'

export default async function landingPage() {
  const main = document.getElementById('main-content')
  const footer = document.getElementById('footer')
  document.body.classList.add('landing-active')
  document.body.style.overflow = 'hidden'
  if (footer) footer.style.display = 'none'

  main.innerHTML = `
    <div class="flpcart-fullscreen">
      <div class="flpcart-grid">
        <!-- MAIN HERO -->
        <div class="flpcart-main-hero">
          <div class="flpcart-hero-nav">
            <div class="flpcart-nav-left"></div>
            <div class="flpcart-nav-center">
              <a href="/learn/golang" class="flpcart-pill-btn" data-i18n="landing.startLearning">📖 Start Learning</a>
              <a href="/playground/go" class="flpcart-pill-btn" data-i18n="landing.playground">🎮 Playground</a>
            </div>
          </div>

          <div class="flpcart-dots-top">
            ${Array.from({ length: 18 }, () => '<div class="flpcart-dot"></div>').join('')}
          </div>

          <div class="flpcart-hero-center">
            <div class="flpcart-sale-tag" data-i18n="landing.badge">&#x26A1; Interactive Learning Platform</div>
            <div class="flpcart-main-title" data-i18n="landing.title">Tryngo</div>
            <div class="flpcart-hero-sub" data-i18n="landing.subtitle">From Zero to Professional &mdash; Interactive coding tutorials with built-in playground. Start with Go and HTML5.</div>
          </div>

          <div class="flpcart-inset-card-wrapper">
            <div class="flpcart-inset-card">
              <button type="button" class="flpcart-collection-pill" data-i18n="landing.explore">&#x1F30D; Explore Courses &rarr;</button>
            </div>
          </div>
        </div>

        <!-- RIGHT SIDEBAR -->
        <div class="flpcart-sidebar">
          <div class="flpcart-product-card tryngo-card-go">
            <div class="flpcart-card-top">
              <div class="flpcart-icon-actions">
                <button type="button" class="flpcart-icon-btn tryngo-like-btn" data-i18n-aria="landing.like" aria-label="Like">&#x2661;</button>
                <button type="button" class="flpcart-icon-btn" data-i18n-aria="landing.share" aria-label="Share">&#x2197;</button>
              </div>
              <div class="flpcart-size-box">
                <span class="flpcart-size-label" data-i18n="landing.level">LEVEL</span>
                <div class="flpcart-size-chips tryngo-level-chips">
                  <button type="button" class="flpcart-size-chip active" data-i18n="landing.beginner">B</button>
                  <button type="button" class="flpcart-size-chip" data-i18n="landing.intermediate">I</button>
                  <button type="button" class="flpcart-size-chip" data-i18n="landing.advanced">A</button>
                </div>
              </div>
            </div>

            <div class="flpcart-card-body">
              <div class="flpcart-card-character tryngo-go-character">
                <div class="tryngo-lang-icon">&#x1F40E;</div>
              </div>
              <div class="flpcart-card-info">
                <h3 style="font-size:1.2rem;font-weight:800;color:#2b1d19;" data-i18n="landing.goTitle">Go (Golang)</h3>
                <div class="flpcart-color-swatches">
                  <span class="flpcart-swatch active" style="background:#00ADD8;"></span>
                  <span class="flpcart-swatch" style="background:#00b894;"></span>
                  <span class="flpcart-swatch" style="background:#6c5ce7;"></span>
                </div>
                <p class="flpcart-card-desc" data-i18n="landing.goDesc">52 weeks of Go from beginner to professional. Build CLI tools, APIs, microservices, and more.</p>
              </div>
            </div>

            <div class="flpcart-card-bottom">
              <a href="/learn/golang" class="flpcart-arrow-btn">&#x2192;</a>
              <div class="flpcart-stocks-badge">
                <span class="flpcart-stocks-number">52</span>
                <span class="flpcart-stocks-text" data-i18n="landing.weeks">WEEKS</span>
              </div>
            </div>
          </div>

          <div class="flpcart-product-card tryngo-card-html">
            <div class="flpcart-card-top">
              <div class="flpcart-icon-actions">
                <button type="button" class="flpcart-icon-btn tryngo-like-btn" data-i18n-aria="landing.like" aria-label="Like">&#x2661;</button>
                <button type="button" class="flpcart-icon-btn" data-i18n-aria="landing.share" aria-label="Share">&#x2197;</button>
              </div>
              <div class="flpcart-size-box">
                <span class="flpcart-size-label" data-i18n="landing.level">LEVEL</span>
                <div class="flpcart-size-chips tryngo-level-chips">
                  <button type="button" class="flpcart-size-chip active" data-i18n="landing.beginner">B</button>
                  <button type="button" class="flpcart-size-chip" data-i18n="landing.advanced">A</button>
                </div>
              </div>
            </div>

            <div class="flpcart-card-body">
              <div class="flpcart-card-character tryngo-html-character">
                <div class="tryngo-lang-icon" style="font-size:3rem;">&#x1F310;</div>
              </div>
              <div class="flpcart-card-info">
                <h3 style="font-size:1.2rem;font-weight:800;color:#2b1d19;" data-i18n="landing.htmlTitle">HTML5</h3>
                <div class="flpcart-color-swatches">
                  <span class="flpcart-swatch active" style="background:#E44D26;"></span>
                  <span class="flpcart-swatch" style="background:#fdcb6e;"></span>
                </div>
                <p class="flpcart-card-desc" data-i18n="landing.htmlDesc">24 weeks of HTML5 from basics to advanced. Master semantic markup, forms, multimedia, and APIs.</p>
              </div>
            </div>

            <div class="flpcart-card-bottom">
              <a href="/learn/html" class="flpcart-arrow-btn">&#x2192;</a>
              <div class="flpcart-stocks-badge">
                <span class="flpcart-stocks-number">24</span>
                <span class="flpcart-stocks-text" data-i18n="landing.weeks">WEEKS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`

  const style = document.createElement('style')
  style.id = 'tryngo-landing-style'
  style.textContent = `
    .flpcart-fullscreen {
      height: 100vh;
      display: flex;
      align-items: stretch;
      background: #ffffff;
      padding: 24px;
      gap: 24px;
    }
    .flpcart-fullscreen .flpcart-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 390px;
      gap: 24px;
      overflow: hidden;
    }
    .tryngo-card-go {
      background: linear-gradient(145deg, #e6f7fc 0%, #d0eff9 100%) !important;
    }
    .tryngo-card-html {
      background: linear-gradient(145deg, #fef3e7 0%, #fde8d8 100%) !important;
    }
    .tryngo-go-character, .tryngo-html-character {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .tryngo-lang-icon {
      font-size: 3.5rem;
      line-height: 1;
      filter: drop-shadow(0 8px 12px rgba(0,0,0,0.1));
    }
    .flpcart-main-hero {
      background: linear-gradient(135deg, #00ADD8 0%, #0096b8 100%) !important;
      border-radius: 24px !important;
      min-height: 0 !important;
      box-shadow: 0 20px 45px rgba(0, 173, 216, 0.25) !important;
    }
    .flpcart-inset-card-wrapper {
      background: #ffffff;
    }
    .flpcart-inset-card {
      background: linear-gradient(135deg, #e6f7fc 0%, #d0eff9 100%) !important;
    }
    .flpcart-hero-center {
      padding-left: 0 !important;
    }
    .flpcart-card-character {
      display: flex !important;
      align-items: center;
      justify-content: center;
      left: 5px !important;
      width: 100px !important;
    }
    .flpcart-card-info {
      margin-left: 100px !important;
    }
    .flpcart-sidebar {
      gap: 24px;
    }
    .flpcart-sidebar .flpcart-product-card {
      flex: 1;
      min-height: 0;
    }
    .flpcart-sidebar .flpcart-card-body {
      height: auto;
      flex: 1;
    }
    .flpcart-nav-left {
      width: 0;
    }
    @media (max-width: 1120px) {
      .flpcart-fullscreen .flpcart-grid {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto;
      }
      .flpcart-main-hero {
        min-height: 50vh !important;
      }
    }
  `
  document.head.appendChild(style)

  applyTranslations(main)

  main.querySelectorAll('.tryngo-like-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('liked')
      btn.innerHTML = btn.classList.contains('liked') ? '&#x2764;' : '&#x2661;'
    })
  })

  main.querySelectorAll('.tryngo-level-chips').forEach(container => {
    container.querySelectorAll('.flpcart-size-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        container.querySelectorAll('.flpcart-size-chip').forEach(c => c.classList.remove('active'))
        chip.classList.add('active')
      })
    })
  })
}
