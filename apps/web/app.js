import { Router } from '/utils/router.js'

const router = new Router()

router.addRoute('/', () => import('/pages/landing.js').then(m => m.default()))
router.addRoute('learn/:language', (params) => import('/pages/learn.js').then(m => m.default(params)))
router.addRoute('learn/:language/:module', (params) => import('/pages/learn.js').then(m => m.default(params)))
router.addRoute('learn/:language/:module/:lesson', (params) => import('/pages/lesson.js').then(m => m.default(params)))
router.addRoute('playground/:language', (params) => import('/pages/playground.js').then(m => m.default(params)))
router.addRoute('playground', () => import('/pages/playground.js').then(m => m.default({ language: 'go' })))

router.addFallback(() => import('/pages/landing.js').then(m => m.default()))

function initNavbar() {
  const toggle = document.getElementById('navbarToggle')
  const links = document.getElementById('navbarLinks')
  if (!toggle || !links) return

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open')
    toggle.setAttribute('aria-expanded', isOpen)
  })

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      links.classList.remove('open')
      toggle.setAttribute('aria-expanded', 'false')
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'))
      link.classList.add('active')
      router.navigate(link.getAttribute('href'))
      e.preventDefault()
    })
  })
}

function updateActiveNavLink(path) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'))

  const link = document.querySelector(`.nav-link[href="/${path}"]`)
    || document.querySelector(`.nav-link[href^="/${path.split('/')[0]}"]`)
    || document.querySelector('.nav-link[href="/"]')
  if (link) link.classList.add('active')
}

function cleanupPage() {
  document.body.classList.remove('landing-active')
  document.body.style.overflow = ''
  const footer = document.getElementById('footer')
  if (footer) footer.style.display = ''
  const navbar = document.getElementById('navbar')
  if (navbar) navbar.style.display = ''
  const style = document.getElementById('tryngo-landing-style')
  if (style) style.remove()
}

function handleNavigation(path) {
  cleanupPage()
  router.resolve(path)
  updateActiveNavLink(path)
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar()
  handleNavigation(window.location.pathname)
})

window.addEventListener('popstate', () => {
  handleNavigation(window.location.pathname)
})

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="/"]')
  if (!link || link.hasAttribute('target') || link.getAttribute('href').startsWith('//')) return
  e.preventDefault()
  const href = link.getAttribute('href')
  router.navigate(href)
})
