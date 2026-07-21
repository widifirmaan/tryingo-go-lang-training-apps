import { initGoWasm, executeGoWasm, isWasmAvailable, onWasmReady } from '/wasm/wasmLoader.js'

let goWasmAttempted = false

export default async function playgroundPage(params) {
  const main = document.getElementById('main-content')
  const lang = params.language || 'go'

  const tabs = [
    { id: 'go', label: 'Go', icon: '\u2699\ufe0f' },
    { id: 'html', label: 'HTML / CSS / JS', icon: '\ud83c\udf10' }
  ]

  const defaultCode = {
    go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, Tryngo!")
}
`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tryngo Playground</title>
    <style>
        body {
            font-family: system-ui, sans-serif;
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            text-align: center;
        }
        h1 { color: #00ADD8; }
        .btn {
            background: #00ADD8;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
        }
        .btn:hover { opacity: 0.9; }
    </style>
</head>
<body>
    <h1>Hello, Tryngo!</h1>
    <p>Welcome to the HTML playground!</p>
    <button class="btn" onclick="alert('Tryngo is awesome!')">Click Me</button>
</body>
</html>
`
  }

  const isHtmlMode = lang === 'html'

  main.innerHTML = `
    <div class="playground-page">
      <div class="playground-header">
        <h1>&#x1F3AD; Interactive Playground</h1>
        <p style="color:var(--color-text-secondary);margin-top:var(--spacing-xs)">Write, run, and test code in your browser</p>
      </div>
      <div class="playground-tabs" role="tablist">
        ${tabs.map(t => `
          <button class="playground-tab ${t.id === lang ? 'active' : ''}"
                  data-lang="${t.id}"
                  role="tab"
                  aria-selected="${t.id === lang}">
            ${t.icon} ${t.label}
          </button>
        `).join('')}
      </div>
      <div style="margin-bottom:var(--spacing-md);padding:var(--spacing-sm) var(--spacing-md);background:#f0fdf4;border:1px solid #86efac;border-radius:var(--radius-md);font-size:var(--font-size-sm);color:#166534;display:${isHtmlMode ? 'block' : 'none'}" id="htmlNotice">
        &#x2705; HTML playground berjalan 100% di browser-mu — tanpa server!
      </div>
      <div style="margin-bottom:var(--spacing-md);padding:var(--spacing-sm) var(--spacing-md);background:#fef3c7;border:1px solid #fde68a;border-radius:var(--radius-md);font-size:var(--font-size-sm);color:#92400e;display:${isHtmlMode ? 'none' : 'block'}" id="goNotice">
        &#x26A0;&#xFE0F; Go: otomatis pake WASM interpreter (client-side). Fallback ke proxy play.golang.org kalo WASM gak tersedia.
      </div>
      <div class="playground-layout">
        <div class="playground-editor-panel">
          <div class="playground-editor-header">
            <span>Code Editor</span>
            <button class="btn-run" id="runCode">
              &#x25B6; Run Code
            </button>
          </div>
          <textarea class="playground-editor"
                    id="codeEditor"
                    spellcheck="false"
                    placeholder="Write your code here...">${defaultCode[lang] || defaultCode.go}</textarea>
        </div>
        <div class="playground-output-panel">
          <div class="playground-output-header">
            <span>Output</span>
            <button class="btn-run" id="clearOutput" style="background:var(--color-text-muted)">Clear</button>
          </div>
          <div class="playground-output" id="output">
            <span style="color:var(--color-text-muted)">Click "Run Code" to see the output.</span>
          </div>
          <iframe id="previewFrame" style="width:100%;flex:1;border:none;border-radius:0 0 var(--radius-lg) var(--radius-lg);background:white;display:none" sandbox="allow-scripts" title="Preview"></iframe>
        </div>
      </div>
    </div>`

  const editor = document.getElementById('codeEditor')
  const runBtn = document.getElementById('runCode')
  const clearBtn = document.getElementById('clearOutput')
  const output = document.getElementById('output')
  const preview = document.getElementById('previewFrame')
  const htmlNotice = document.getElementById('htmlNotice')
  const goNotice = document.getElementById('goNotice')
  const tabsContainer = document.querySelector('.playground-tabs')

  function switchTab(tabId) {
    document.querySelectorAll('.playground-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.lang === tabId)
      t.setAttribute('aria-selected', t.dataset.lang === tabId)
    })

    const isHtml = tabId === 'html'
    editor.value = defaultCode[tabId] || ''
    output.innerHTML = '<span style="color:var(--color-text-muted)">Click "Run Code" to see the output.</span>'
    preview.style.display = 'none'
    htmlNotice.style.display = isHtml ? 'block' : 'none'
    goNotice.style.display = isHtml ? 'none' : 'block'
    window.location.hash = `#/playground/${tabId}`
  }

  tabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.playground-tab')
    if (tab) switchTab(tab.dataset.lang)
  })

  if (runBtn) {
    runBtn.addEventListener('click', async () => {
      const code = editor.value
      const currentLang = document.querySelector('.playground-tab.active')?.dataset.lang || 'go'

      if (currentLang === 'html') {
        runHtmlClientSide(code, output, preview, runBtn)
      } else {
        await runGoCode(code, output, runBtn)
      }
    })
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      output.innerHTML = '<span style="color:var(--color-text-muted)">Output cleared.</span>'
      preview.style.display = 'none'
      preview.srcdoc = ''
    })
  }

  if (editor) {
    editor.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault()
        const start = editor.selectionStart
        const end = editor.selectionEnd
        editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end)
        editor.selectionStart = editor.selectionEnd = start + 2
      }
    })
  }
}

function runHtmlClientSide(code, output, preview, runBtn) {
  runBtn.disabled = true
  runBtn.textContent = 'Running...'

  try {
    const html = wrapHtmlCode(code)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)

    if (preview) {
      preview.style.display = 'block'
      preview.srcdoc = html
      preview.onload = () => URL.revokeObjectURL(url)
    }

    output.innerHTML = `
      <div style="color:var(--color-success)">
        &#x2705; HTML berjalan di iframe sandbox — 100% client-side, tanpa server!
      </div>
      <div style="margin-top:8px;font-size:12px;color:var(--color-text-muted)">
        Tip: Interaksi dengan elemen di preview di atas &#x2191;
      </div>`
  } catch (err) {
    output.innerHTML = `<span style="color:var(--color-error)">Error: ${err.message}</span>`
  } finally {
    runBtn.disabled = false
    runBtn.textContent = '\u25B6 Run Code'
  }
}

async function runGoCode(code, output, runBtn) {
  runBtn.disabled = true
  runBtn.textContent = 'Running...'

  if (!goWasmAttempted) {
    goWasmAttempted = true
    output.innerHTML = '<span style="color:var(--color-text-muted)">Loading Go WASM interpreter...</span>'
    const ok = await initGoWasm()
    if (ok) {
      output.innerHTML = '<span style="color:var(--color-text-muted)">Go WASM loaded, running...</span>'
    }
  }

  if (isWasmAvailable()) {
    try {
      const result = executeGoWasm(code)
      if (result.ok) {
        output.textContent = result.output || 'No output'
      } else {
        output.innerHTML = `<span style="color:var(--color-error)">${escapeHtml(result.error || result.output)}</span>`
      }
    } catch (err) {
      output.innerHTML = `<span style="color:var(--color-error)">WASM error: ${escapeHtml(err.message)}</span>`
    } finally {
      runBtn.disabled = false
      runBtn.textContent = '\u25B6 Run Code'
    }
    return
  }

  output.innerHTML = '<span style="color:var(--color-text-muted)">Running via play.golang.org...</span>'

  try {
    const res = await fetch('/api/playground', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: 'go', code })
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

    const data = await res.json()

    if (data.Errors) {
      output.innerHTML = `<span style="color:var(--color-error)">${escapeHtml(data.Errors)}</span>`
    } else if (data.Events) {
      output.innerHTML = data.Events.map(e =>
        e.Kind === 'stdout'
          ? escapeHtml(e.Message)
          : `<span style="color:var(--color-error)">${escapeHtml(e.Message)}</span>`
      ).join('') || '<span style="color:var(--color-text-muted)">No output</span>'
    } else {
      output.innerHTML = '<span style="color:var(--color-text-muted)">No output</span>'
    }
  } catch (err) {
    output.innerHTML = `<span style="color:var(--color-error)">Error: ${escapeHtml(err.message)}</span>`
  } finally {
    runBtn.disabled = false
    runBtn.textContent = '\u25B6 Run Code'
  }
}

function wrapHtmlCode(code) {
  if (code.includes('<html') || code.includes('<!DOCTYPE')) return code
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
${code}
</body>
</html>`
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
