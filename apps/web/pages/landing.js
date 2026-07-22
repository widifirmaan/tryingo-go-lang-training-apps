import { translate, applyTranslations, setLang, getLang } from '/utils/i18n.js'

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
            <div class="flpcart-nav-left">
              <div class="flpcart-lang-switcher">
                <button type="button" class="flpcart-lang-btn landing-lang-btn" data-lang="en">EN</button>
                <button type="button" class="flpcart-lang-btn landing-lang-btn" data-lang="id">ID</button>
              </div>
            </div>
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
          <button type="button" class="flpcart-circle-btn-hero" data-i18n="landing.explore">GO &rarr;</button>
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
      min-height: 580px !important;
      box-shadow: 0 20px 45px rgba(0, 173, 216, 0.25) !important;
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
      min-height: 200px;
    }
    .flpcart-sidebar .flpcart-card-body {
      height: auto;
      flex: 1;
    }
    .flpcart-lang-switcher {
      display: flex;
      align-items: center;
      background: rgba(255,255,255,0.2);
      border-radius: 50px;
      padding: 3px;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.3);
    }
    .flpcart-lang-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      color: rgba(255,255,255,0.7);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: pointer;
      background: transparent;
      border: none;
      font-family: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
    .flpcart-lang-btn.active {
      background: #ffffff;
      color: #0096b8;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .flpcart-lang-btn:hover:not(.active) {
      color: rgba(255,255,255,0.95);
    }
    .flpcart-circle-btn-hero {
      position: absolute;
      right: 36px;
      bottom: 40px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #ffffff;
      color: #0096b8;
      border: none;
      font-size: 0.85rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      font-family: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      letter-spacing: 0.5px;
      z-index: 10;
    }
    .flpcart-circle-btn-hero:hover {
      transform: scale(1.1);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    }
    @media (max-width: 1120px) {
      .flpcart-fullscreen {
        padding: 16px !important;
        gap: 16px !important;
      }
      .flpcart-fullscreen .flpcart-grid {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto;
        gap: 16px !important;
      }
      .flpcart-main-hero {
        min-height: 400px !important;
        padding: 20px !important;
      }
      .flpcart-sidebar {
        flex-direction: row !important;
        gap: 16px !important;
      }
      .flpcart-sidebar .flpcart-product-card {
        flex: 1;
        min-height: 180px;
      }
      .flpcart-hero-nav {
        flex-wrap: wrap;
        gap: 10px;
      }
      .flpcart-dots-top {
        display: none !important;
      }
      .flpcart-circle-btn-hero {
        width: 70px !important;
        height: 70px !important;
        font-size: 0.75rem !important;
        flex-shrink: 0 !important;
        align-self: center !important;
      }
    }
    @media (max-width: 768px) {
      .flpcart-fullscreen {
        padding: 12px !important;
        gap: 12px !important;
      }
      .flpcart-fullscreen .flpcart-grid {
        gap: 12px !important;
      }
      .flpcart-main-hero {
        min-height: 420px !important;
        padding: 16px !important;
        border-radius: 16px !important;
      }
      .flpcart-hero-center {
        margin-top: 10px;
      }
      .flpcart-main-title {
        font-size: clamp(2.5rem, 10vw, 4rem) !important;
      }
      .flpcart-hero-sub {
        font-size: 0.75rem !important;
      }
      .flpcart-sidebar {
        flex-direction: column !important;
      }
      .flpcart-sidebar .flpcart-product-card {
        min-height: 180px;
      }
      .flpcart-sale-tag {
        font-size: 0.75rem !important;
      }
      .flpcart-nav-center {
        gap: 6px !important;
      }
      .flpcart-pill-btn {
        height: 36px !important;
        padding: 0 12px !important;
        font-size: 0.8rem !important;
      }
      .flpcart-circle-btn-hero {
        position: static !important;
        width: 60px !important;
        height: 60px !important;
        font-size: 0.7rem !important;
        flex-shrink: 0 !important;
        align-self: center !important;
      }
    }
    @media (max-width: 480px) {
      .flpcart-fullscreen {
        padding: 8px !important;
        gap: 8px !important;
      }
      .flpcart-fullscreen .flpcart-grid {
        gap: 8px !important;
      }
      .flpcart-main-hero {
        padding: 12px !important;
        min-height: 360px !important;
      }
      .flpcart-main-title {
        font-size: clamp(2rem, 12vw, 2.5rem) !important;
      }
      .flpcart-hero-nav {
        justify-content: center !important;
      }
      .flpcart-pill-btn {
        height: 30px !important;
        padding: 0 8px !important;
        font-size: 0.7rem !important;
      }
      .flpcart-lang-btn {
        width: 28px !important;
        height: 28px !important;
        font-size: 0.6rem !important;
      }
      .flpcart-lang-switcher {
        padding: 2px !important;
      }
    }
  `
  document.head.appendChild(style)

  applyTranslations(main)

  const currentLang = getLang()
  main.querySelectorAll('.landing-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang)
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang)
      main.querySelectorAll('.landing-lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === btn.dataset.lang))
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === btn.dataset.lang))
    })
  })

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
