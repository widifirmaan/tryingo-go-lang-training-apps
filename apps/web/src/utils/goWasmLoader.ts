let wasmReady = false;
let tinyWasmReady = false;
let initAttempted = false;
let initPromise: Promise<{ yaegi: boolean; tinygo: boolean }> | null = null;

export function isWasmReady(): boolean {
  return wasmReady;
}

export function isTinyGoReady(): boolean {
  return tinyWasmReady;
}

type InitResult = { yaegi: boolean; tinygo: boolean };

export function initGoWasm(): Promise<InitResult> {
  if (initPromise) return initPromise;
  if (initAttempted) return Promise.resolve({ yaegi: false, tinygo: false });

  initAttempted = true;

  initPromise = new Promise<InitResult>((resolve) => {
    const yaegiUrl = new URL('/wasm/go-exec.wasm', import.meta.url).href;
    const wasmExecUrl = new URL('/wasm/wasm_exec.js', import.meta.url).href;
    const tinyWasmUrl = new URL('/wasm/tinygo-runner.wasm', import.meta.url).href;
    const tinyWasmExecUrl = new URL('/wasm/tiny-wasm_exec.js', import.meta.url).href;

    let yaegiLoaded = false;
    let tinygoLoaded = false;

    // ---- TinyGo loader ----
    const loadTinyGo = () => {
      fetch(tinyWasmUrl, { method: 'HEAD' }).then(resp => {
        if (!resp.ok) {
          finalize();
          return;
        }
        const script = document.createElement('script');
        script.src = tinyWasmExecUrl;
        script.onload = async () => {
          try {
            const go = new (window as any).Go();
            const result = await WebAssembly.instantiateStreaming(fetch(tinyWasmUrl), go.importObject);
            go.run(result.instance);
            tinygoLoaded = true;
            tinyWasmReady = true;
          } catch (err) {
            console.warn('TinyGo WASM init failed:', err);
          }
          finalize();
        };
        script.onerror = () => finalize();
        document.head.appendChild(script);
      }).catch(() => finalize());
    };

    // ---- Yaegi loader ----
    fetch(yaegiUrl, { method: 'HEAD' }).then(resp => {
      if (!resp.ok) {
        loadTinyGo();
        return;
      }
      const script = document.createElement('script');
      script.src = wasmExecUrl;
      script.onload = async () => {
        try {
          const go = new (window as any).Go();
          const result = await WebAssembly.instantiateStreaming(fetch(yaegiUrl), go.importObject);
          go.run(result.instance);
          yaegiLoaded = true;
          wasmReady = true;
        } catch (err) {
          console.warn('Go WASM (Yaegi) init failed:', err);
        }
        loadTinyGo();
      };
      script.onerror = () => loadTinyGo();
      document.head.appendChild(script);
    }).catch(() => {
      loadTinyGo();
    });

    // TinyGo's wasm_exec may fire its own onload, but we gate on the script.onload above
    let finalized = false;
    function finalize() {
      if (finalized) return;
      finalized = true;
      resolve({ yaegi: yaegiLoaded, tinygo: tinygoLoaded });
    }

    // Safety timeout
    setTimeout(() => finalize(), 30000);
  });

  return initPromise;
}

export type GoExecResult = {
  success: boolean;
  output: string;
  error: string;
};

export function runGoCode(code: string): GoExecResult {
  if (!wasmReady || typeof (window as any).runGoCode !== 'function') {
    return {
      success: false,
      output: '',
      error: 'Go WASM interpreter not loaded yet.',
    };
  }

  try {
    const raw = (window as any).runGoCode(code) as string;
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
  if (!tinyWasmReady || typeof (window as any).runTinyGoWeek !== 'function') {
    return {
      success: false,
      output: '',
      error: 'TinyGo WASM not ready.',
    };
  }

  try {
    const result = (window as any).runTinyGoWeek(week) as string;
    return { success: true, output: result, error: '' };
  } catch (err) {
    return {
      success: false,
      output: '',
      error: err instanceof Error ? err.message : 'TinyGo execution failed',
    };
  }
}
