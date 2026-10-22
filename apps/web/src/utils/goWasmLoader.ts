let wasmReady = false;
let tinyWasmReady = false;

let tinyPromise: Promise<boolean> | null = null;
let yaegiPromise: Promise<boolean> | null = null;

type InitResult = { yaegi: boolean; tinygo: boolean };

const WASM_URLS = {
  yaegi: '/wasm/go-exec.wasm',
  yaegiExec: '/wasm/wasm_exec.js',
  tiny: '/wasm/tinygo-runner.wasm',
  tinyExec: '/wasm/tiny-wasm_exec.js',
};

export function isWasmReady(): boolean {
  return wasmReady;
}

export function isTinyGoReady(): boolean {
  return tinyWasmReady;
}

// Runtime scripts are serialized because both wasm_exec runtimes define window.Go.
let scriptQueue: Promise<unknown> = Promise.resolve();

async function loadRuntimeScript(url: string): Promise<boolean> {
  const task = scriptQueue.then(async () => {
    const resp = await fetch(url, { cache: 'force-cache' });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const contentType = (resp.headers.get('content-type') || '').toLowerCase();
    if (contentType.includes('text/html')) {
      throw new Error('asset missing (server returned the SPA HTML fallback)');
    }

    const source = await resp.text();
    if (!source.trim()) throw new Error('empty script');

    // Inject from a blob so strict MIME checking never blocks the runtime.
    const blobUrl = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
    try {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = blobUrl;
        script.onload = () => {
          script.remove();
          resolve();
        };
        script.onerror = () => {
          script.remove();
          reject(new Error('script execution failed'));
        };
        document.head.appendChild(script);
      });
      return true;
    } finally {
      URL.revokeObjectURL(blobUrl);
    }
  });

  scriptQueue = task.catch(() => false);

  try {
    return await task;
  } catch (err) {
    console.warn(`[Go WASM] Could not load ${url}:`, err);
    return false;
  }
}

async function instantiateWasm(url: string, imports: WebAssembly.Imports): Promise<WebAssembly.Instance> {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

  const contentType = (resp.headers.get('content-type') || '').toLowerCase();
  if (contentType.includes('text/html')) {
    throw new Error('asset missing (server returned the SPA HTML fallback)');
  }

  if (contentType.includes('application/wasm')) {
    try {
      const { instance } = await WebAssembly.instantiateStreaming(resp.clone(), imports);
      return instance;
    } catch {
      // Some hosts mislabel or truncate the stream; compile from the buffer instead.
    }
  }

  const buffer = await resp.arrayBuffer();
  const magic = new Uint8Array(buffer, 0, 4);
  if (magic[0] !== 0x00 || magic[1] !== 0x61 || magic[2] !== 0x73 || magic[3] !== 0x6d) {
    throw new Error('asset is not a valid WebAssembly binary');
  }

  const { instance } = await WebAssembly.instantiate(buffer, imports);
  return instance;
}

export function ensureTinyGo(): Promise<boolean> {
  if (!tinyPromise) {
    tinyPromise = (async () => {
      try {
        if (!(await loadRuntimeScript(WASM_URLS.tinyExec))) return false;

        const Go = (window as unknown as { Go?: new () => { importObject: WebAssembly.Imports; run: (instance: WebAssembly.Instance) => void } }).Go;
        if (typeof Go !== 'function') throw new Error('Go runtime missing');

        const go = new Go();
        const instance = await instantiateWasm(WASM_URLS.tiny, go.importObject);
        go.run(instance);
        tinyWasmReady = true;
        return true;
      } catch (err) {
        console.warn('[Go WASM] TinyGo runtime unavailable:', err);
        return false;
      }
    })();
  }
  return tinyPromise;
}

export function ensureYaegi(): Promise<boolean> {
  if (!yaegiPromise) {
    yaegiPromise = (async () => {
      try {
        if (!(await loadRuntimeScript(WASM_URLS.yaegiExec))) return false;

        const Go = (window as unknown as { Go?: new () => { importObject: WebAssembly.Imports; run: (instance: WebAssembly.Instance) => void } }).Go;
        if (typeof Go !== 'function') throw new Error('Go runtime missing');

        const go = new Go();
        const instance = await instantiateWasm(WASM_URLS.yaegi, go.importObject);
        go.run(instance);
        wasmReady = true;
        return true;
      } catch (err) {
        console.warn('[Go WASM] Yaegi interpreter unavailable:', err);
        return false;
      }
    })();
  }
  return yaegiPromise;
}

export function initGoWasm(): Promise<InitResult> {
  return Promise.all([ensureTinyGo(), ensureYaegi()]).then(([tinygo, yaegi]) => ({ tinygo, yaegi }));
}

export type GoExecResult = {
  success: boolean;
  output: string;
  error: string;
};

export function runGoCode(code: string): GoExecResult {
  if (!wasmReady || typeof (window as unknown as { runGoCode?: unknown }).runGoCode !== 'function') {
    return {
      success: false,
      output: '',
      error: 'Go WASM interpreter not loaded yet.',
    };
  }

  try {
    const raw = (window as unknown as { runGoCode: (code: string) => string }).runGoCode(code);
    const errorIdx = raw.indexOf('\n--- ERROR ---\n');
    const stderrIdx = raw.indexOf('\n--- STDERR ---\n');

    if (errorIdx !== -1) {
      const output = raw.substring(0, errorIdx);
      const error = raw.substring(errorIdx + '\n--- ERROR ---\n'.length);
      return { success: false, output, error };
    }

    if (stderrIdx !== -1) {
      const output = raw.substring(0, stderrIdx);
      const stderr = raw.substring(stderrIdx + '\n--- STDERR ---\n'.length);
      return { success: true, output, error: stderr };
    }

    return { success: true, output: raw, error: '' };
  } catch (err) {
    return {
      success: false,
      output: '',
      error: err instanceof Error ? err.message : 'Unknown error during Go execution',
    };
  }
}

export function runTinyGoWeek(week: number): GoExecResult {
  if (!tinyWasmReady || typeof (window as unknown as { runTinyGoWeek?: unknown }).runTinyGoWeek !== 'function') {
    return {
      success: false,
      output: '',
      error: 'TinyGo WASM not ready.',
    };
  }

  try {
    const result = (window as unknown as { runTinyGoWeek: (week: number) => string }).runTinyGoWeek(week);
    return { success: true, output: result, error: '' };
  } catch (err) {
    return {
      success: false,
      output: '',
      error: err instanceof Error ? err.message : 'TinyGo execution failed',
    };
  }
}
