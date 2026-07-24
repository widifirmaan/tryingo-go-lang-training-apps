import { getSandbox, type Sandbox } from "@cloudflare/sandbox";

export { Sandbox } from "@cloudflare/sandbox";

type Env = {
  Sandbox: DurableObjectNamespace<Sandbox>;
};

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

const LANGS_WITH_FILE: Record<string, { ext: string; cmd: (path: string) => string }> = {
  python: { ext: ".py", cmd: (p) => `python3 ${p}` },
  go: { ext: ".go", cmd: (p) => `go run ${p}` },
  javascript: { ext: ".mjs", cmd: (p) => `node ${p}` },
  typescript: { ext: ".ts", cmd: (p) => `npx tsx ${p}` },
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
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

    const url = new URL(request.url);
    const sandboxId = url.searchParams.get("sandboxId") || "default";

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

    const langConfig = LANGS_WITH_FILE[language];
    if (!langConfig) {
      return new Response(`Unsupported language: ${language}`, { status: 400, headers: corsHeaders });
    }

    const sandbox = getSandbox(env.Sandbox, sandboxId);

    const filename = `/workspace/code${langConfig.ext}`;
    const start = performance.now();

    try {
      await sandbox.writeFile(filename, code);
      const result = await sandbox.exec(langConfig.cmd(filename));
      const duration = Math.round((performance.now() - start) * 100) / 100;

      const response: ExecuteResponse = {
        stdout: result.stdout,
        stderr: result.stderr,
        exitCode: result.exitCode,
        success: result.success,
        duration,
      };

      return Response.json(response, { headers: corsHeaders });
    } catch (err) {
      const duration = Math.round((performance.now() - start) * 100) / 100;
      return Response.json(
        {
          stdout: "",
          stderr: err instanceof Error ? err.message : "Execution failed",
          exitCode: 1,
          success: false,
          duration,
        },
        { status: 200, headers: corsHeaders }
      );
    }
  },
};
