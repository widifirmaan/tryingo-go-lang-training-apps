const GO_PLAYGROUND_URL = 'https://play.golang.org/compile'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          ...CORS_HEADERS,
          'Allow': 'POST, OPTIONS'
        }
      })
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      })
    }

    const url = new URL(request.url)
    const path = url.pathname

    try {
      const { language, code } = await request.json()

      if (!code) {
        return new Response(JSON.stringify({ error: 'Code is required' }), {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
        })
      }

      switch (path) {
        case '/go':
          return await executeGo(code)
        case '/html':
          return await executeHtml(code)
        default:
          return new Response(JSON.stringify({ error: `Unknown endpoint: ${path}` }), {
            status: 404,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
          })
      }
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
      })
    }
  }
}

async function executeGo(code) {
  const body = new URLSearchParams({
    version: 2,
    body: code
  })

  const response = await fetch(GO_PLAYGROUND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  })

  if (!response.ok) {
    return new Response(JSON.stringify({
      Errors: `Go Playground API error: ${response.status}`
    }), {
      status: 502,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
    })
  }

  const data = await response.json()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  })
}

function executeHtml(code) {
  const sandboxPage = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
${code}
</body>
</html>`

  return new Response(JSON.stringify({
    output: 'HTML page generated',
    html: sandboxPage
  }), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  })
}
