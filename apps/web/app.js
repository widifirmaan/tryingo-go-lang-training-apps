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
    link.addEventListener('click', () => {
      links.classList.remove('open')
      toggle.setAttribute('aria-expanded', 'false')
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'))
      link.classList.add('active')
    })
  })
}

function updateActiveNavLink(path) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'))
  const segment = path.split('/')[0]
  let selector = '[href="#/"]'
  if (segment === 'learn') selector = `[href="#/learn/${path.split('/')[1] || 'golang'}"]`
  else if (segment === 'playground') selector = '[href*="playground"]'
  const activeLink = document.querySelector(`.nav-link${selector === '[href="#/"]' ? '' : ''}`)
  const link = document.querySelector(selector) || document.querySelector('[href="#/"]')
  if (link) link.classList.add('active')
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar()

  const main = document.getElementById('main-content')

  router.onChange = (path) => {
    updateActiveNavLink(path)
  }

  router.resolve(window.location.hash.slice(1) || '/')

  window.addEventListener('hashchange', () => {
    router.resolve(window.location.hash.slice(1) || '/')
  })
})
