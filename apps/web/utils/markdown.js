export function mdToHtml(md) {
  if (md.startsWith('<!') || md.startsWith('<html')) {
    return '<p style="color:var(--color-error)">Failed to load lesson content. The file may not be available yet.</p>'
  }
  let html = md.replace(/\r\n/g, '\n')

  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/`(.+?)`/g, '<code>$1</code>')

  html = html.replace(/^```(\w*)\n([\s\S]*?)^```$/gm, (_, lang, code) => {
    const langClass = lang ? ` class="language-${lang}"` : ''
    return `<pre><code${langClass}>${escapeHtml(code.trim())}</code></pre>`
  })

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')

  html = html.replace(/^---$/gm, '<hr />')

  let inTable = false
  let tableHtml = ''
  const lines = html.split('\n')
  const result = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (!inTable) {
        inTable = true
        tableHtml = '<table>\n<thead>\n<tr>\n'
        const headers = parseTableRow(line)
        headers.forEach(h => { tableHtml += `<th>${h}</th>\n` })
        tableHtml += '</tr>\n</thead>\n<tbody>\n'
        if (i + 1 < lines.length && lines[i + 1].match(/^[\s\|:-]+$/)) {
          i++
        }
      } else {
        const cells = parseTableRow(line)
        tableHtml += '<tr>\n'
        cells.forEach(c => { tableHtml += `<td>${c}</td>\n` })
        tableHtml += '</tr>\n'
      }
      if (i + 1 >= lines.length || !lines[i + 1].trim().startsWith('|')) {
        tableHtml += '</tbody>\n</table>'
        result.push(tableHtml)
        tableHtml = ''
        inTable = false
      }
      continue
    }

    if (inTable) {
      tableHtml += '</tbody>\n</table>'
      result.push(tableHtml)
      tableHtml = ''
      inTable = false
    }

    result.push(line)
  }

  html = result.join('\n')

  html = html.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => {
      if (!match.includes('<ol>')) {
        return `<ol>\n${match}</ol>\n`
      }
      return match
    })

  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => {
      if (!match.includes('<ol>') && !match.includes('<ul>')) {
        return `<ul>\n${match}</ul>\n`
      }
      return match
    })

  html = html.replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')

  html = html.replace(/\n\n/g, '</p><p>')
  html = '<p>' + html + '</p>'

  html = html.replace(/<p>\s*<\/p>/g, '')
    .replace(/<p><h(\d)/g, '<h$1')
    .replace(/<\/h(\d)><\/p>/g, '</h$1>')
    .replace(/<p><(ul|ol|li|pre|blockquote|table|hr)/g, '<$1')
    .replace(/<\/(ul|ol|li|pre|blockquote|table)><\/p>/g, '</$1>')
    .replace(/<p><\/p>/g, '')
    .replace(/<\/pre><\/p>/g, '</pre>')
    .replace(/<pre><code/g, '<pre><code')

  return html
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function parseTableRow(line) {
  return line.trim().split('|').filter(c => c.trim()).map(c => c.trim())
}
