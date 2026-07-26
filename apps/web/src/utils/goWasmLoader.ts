let wasmReady = false;
let initAttempted = false;
let initPromise: Promise<boolean> | null = null;

export function isWasmReady(): boolean {
  return wasmReady;
}

export function initGoWasm(): Promise<boolean> {
  if (initPromise) return initPromise;
  if (initAttempted) return Promise.resolve(false);

  initAttempted = true;

  initPromise = new Promise<boolean>((resolve) => {
    const wasmUrl = new URL('/wasm/go-exec.wasm', import.meta.url).href;
    const wasmExecUrl = new URL('/wasm/wasm_exec.js', import.meta.url).href;

    fetch(wasmUrl, { method: 'HEAD' }).then(resp => {
      if (!resp.ok) {
        console.warn('Go WASM binary not found at', wasmUrl);
        wasmReady = false;
        resolve(false);
        return;
      }

      const script = document.createElement('script');
      script.src = wasmExecUrl;
      script.onload = async () => {
        try {
          const go = new (window as any).Go();
          const result = await WebAssembly.instantiateStreaming(fetch(wasmUrl), go.importObject);
          go.run(result.instance);
          wasmReady = true;
          resolve(true);
        } catch (err) {
          console.warn('Go WASM init failed:', err);
          wasmReady = false;
          resolve(false);
        }
      };
      script.onerror = () => {
        console.warn('Failed to load wasm_exec.js');
        wasmReady = false;
        resolve(false);
      };
      document.head.appendChild(script);
    }).catch(() => {
      console.warn('Cannot reach Go WASM binary, will use Worker fallback');
      wasmReady = false;
      resolve(false);
    });
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
      error: 'Go WASM interpreter not loaded yet. Please wait...',
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
