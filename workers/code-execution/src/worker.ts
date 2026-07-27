type ExecuteRequest = {
  code: string;
  language: string;
};

type ExecuteResponse = {
  stdout: string;
  stderr: string;
  exitCode: number;
  success: boolean;
  duration: number;
};

const NATIVE_EXEC: Record<string, (code: string) => ExecuteResponse> = {
  javascript: (code) => {
    try {
      const fn = new Function(code);
      const logs: string[] = [];
      const mockConsole = { log: (...args: unknown[]) => logs.push(args.map(String).join(' ')) };
      fn.call({ console: mockConsole });
      return { stdout: logs.join('\n'), stderr: '', exitCode: 0, success: true, duration: 0 };
    } catch (err) {
      return { stdout: '', stderr: err instanceof Error ? err.message : String(err), exitCode: 1, success: false, duration: 0 };
    }
  },
  typescript: () => ({ stdout: '', stderr: 'TypeScript execution not available server-side. Use a WASM-capable browser.', exitCode: 1, success: false, duration: 0 }),
  go: () => ({ stdout: '', stderr: 'Go execution is handled client-side via WebAssembly. Use a modern browser with WASM support.', exitCode: 1, success: false, duration: 0 }),
  python: () => ({ stdout: '', stderr: 'Python execution not yet available. Coming soon.', exitCode: 1, success: false, duration: 0 }),
};

async function execRust(code: string): Promise<ExecuteResponse> {
  const start = performance.now();
  try {
    const res = await fetch('https://play.rust-lang.org/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        crateType: 'bin',
        edition: '2024',
        channel: 'stable',
        mode: 'debug',
        tests: false,
      }),
    });
    const data = await res.json() as { success: boolean; stdout: string; stderr: string; error?: string };
    const duration = Math.round((performance.now() - start) * 100) / 100;
    if (data.error) {
      return { stdout: '', stderr: data.error, exitCode: 1, success: false, duration };
    }
    return {
      stdout: data.stdout || '',
      stderr: data.stderr || '',
      exitCode: data.success ? 0 : 1,
      success: data.success,
      duration,
    };
  } catch (err) {
    const duration = Math.round((performance.now() - start) * 100) / 100;
    return {
      stdout: '',
      stderr: err instanceof Error ? err.message : 'Rust Playground API unavailable',
      exitCode: 1,
      success: false,
      duration,
    };
  }
}

export default {
  async fetch(request: Request): Promise<Response> {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    let body: ExecuteRequest;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400, headers: corsHeaders });
    }

    const { code, language } = body;

    if (!code || !language) {
      return new Response("Missing 'code' or 'language'", { status: 400, headers: corsHeaders });
    }

    const start = performance.now();

    if (language === 'rust') {
      const result = await execRust(code);
      return Response.json(result, { headers: corsHeaders });
    }

    const execFn = NATIVE_EXEC[language];
    if (!execFn) {
      return new Response(`Unsupported language: ${language}`, { status: 400, headers: corsHeaders });
    }

    const result = execFn(code);
    result.duration = Math.round((performance.now() - start) * 100) / 100;

    return Response.json(result, { headers: corsHeaders });
  },
};
