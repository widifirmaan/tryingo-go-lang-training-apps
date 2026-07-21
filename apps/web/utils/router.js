export class Router {
  constructor() {
    this.routes = []
    this.fallback = null
    this.onChange = null
  }

  addRoute(pattern, handler) {
    const segments = pattern.split('/').filter(Boolean)
    const paramNames = []

    const regexStr = segments.map(seg => {
      if (seg.startsWith(':')) {
        paramNames.push(seg.slice(1))
        return '([^/]+)'
      }
      return seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }).join('\\/')

    this.routes.push({
      pattern: new RegExp(`^${regexStr}$`),
      paramNames,
      handler
    })
  }

  addFallback(handler) {
    this.fallback = handler
  }

  async resolve(path) {
    const pathname = path.replace(/^\//, '').replace(/\/$/, '')
    const main = document.getElementById('main-content')
    if (!main) return

    main.innerHTML = '<div class="loading"><div class="spinner"></div><span>Loading...</span></div>'

    for (const route of this.routes) {
      const match = pathname.match(route.pattern)
      if (match) {
        const params = {}
        route.paramNames.forEach((name, i) => {
          params[name] = decodeURIComponent(match[i + 1])
        })
        try {
          if (this.onChange) this.onChange(pathname)
          await route.handler(params)
        } catch (err) {
          console.error('Route handler error:', err)
          main.innerHTML = `<div class="error-state"><h2>Something went wrong</h2><p>${err.message}</p></div>`
        }
        return
      }
    }

    if (this.fallback) {
      if (this.onChange) this.onChange('/')
      await this.fallback()
    }
  }

  navigate(path) {
    history.pushState(null, '', path)
    this.resolve(path)
  }
}
