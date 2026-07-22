import { translations, t } from '/data/translations.js'

const STORAGE_KEY = 'tryngo-lang'

let currentLang = localStorage.getItem(STORAGE_KEY) || 'en'
let listeners = []

export function getLang() {
  return currentLang
}

export function setLang(lang) {
  if (lang === currentLang) return
  currentLang = lang
  localStorage.setItem(STORAGE_KEY, lang)
  listeners.forEach(fn => fn(lang))
}

export function onLangChange(fn) {
  listeners.push(fn)
  return () => {
    listeners = listeners.filter(f => f !== fn)
  }
}

export function translate(key) {
  return t(key, currentLang)
}

export function translateEl(el) {
  const key = el.getAttribute('data-i18n')
  if (key) {
    el.textContent = translate(key)
  }
  const placeholder = el.getAttribute('data-i18n-placeholder')
  if (placeholder) {
    el.placeholder = translate(placeholder)
  }
  const ariaLabel = el.getAttribute('data-i18n-aria')
  if (ariaLabel) {
    el.setAttribute('aria-label', translate(ariaLabel))
  }
}

export function applyTranslations(root) {
  root.querySelectorAll('[data-i18n]').forEach(translateEl)
  root.querySelectorAll('[data-i18n-placeholder]').forEach(translateEl)
  root.querySelectorAll('[data-i18n-aria]').forEach(translateEl)
}
