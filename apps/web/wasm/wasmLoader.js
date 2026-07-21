// Tryngo Go WASM Interpreter Loader
// Falls back to proxy server if WASM is unavailable

const WASM_URL = '/wasm/tryngo.wasm'
const WASM_EXEC_URL = '/wasm/wasm_exec.js'

let wasmReady = false
let wasmLoading = false
let wasmCallbacks = []

export function isWasmAvailable() {
  return wasmReady
}

export async function initGoWasm() {
  if (wasmReady || wasmLoading) return
  wasmLoading = true

  try {
    const res = await fetch(WASM_URL, { method: 'HEAD' })
    if (!res.ok) throw new Error('WASM binary not found')
  } catch {
    console.warn('[Tryngo] Go WASM not available, using proxy fallback')
    wasmLoading = false
    return false
  }

  try {
    await loadScript(WASM_EXEC_URL)

    const go = new Go()
    const result = await WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject)
    go.run(result.instance)

    wasmReady = true
    wasmLoading = false

    console.log('[Tryngo] Go WASM interpreter ready')
    wasmCallbacks.forEach(cb => cb(true))
    wasmCallbacks = []
    return true
  } catch (err) {
    console.warn('[Tryngo] Go WASM load failed:', err.message)
    wasmLoading = false
    wasmCallbacks.forEach(cb => cb(false))
    wasmCallbacks = []
    return false
  }
}

export async function executeGoWasm(code) {
  if (!wasmReady) {
    throw new Error('WASM not ready')
  }

  const result = await new Promise((resolve, reject) => {
    try {
      const output = globalThis.__tryngo_execute_go__(code)
      resolve(output)
    } catch (err) {
      reject(err)
    }
  })

  return result
}

export function onWasmReady(callback) {
  if (wasmReady) {
    callback(true)
  } else if (!wasmLoading) {
    initGoWasm().then(callback)
  } else {
    wasmCallbacks.push(callback)
  }
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = () => reject(new Error(`Failed to load ${url}`))
    document.head.appendChild(script)
  })
}
