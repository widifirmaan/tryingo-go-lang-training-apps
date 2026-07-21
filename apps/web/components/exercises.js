import { getExercises } from '/data/exercises.js'

export async function renderExercises(language, moduleId, lessonId) {
  const items = await getExercises(language, moduleId, lessonId)
  if (!items.length) return ''

  let html = `
    <div class="exercises-section" style="margin-top:var(--spacing-3xl);padding:var(--spacing-xl);background:var(--color-bg-alt);border-radius:var(--radius-xl);border:1px solid var(--color-border)">
      <h2 style="margin-bottom:var(--spacing-lg)">Practice Exercises</h2>`

  items.forEach((item, idx) => {
    if (item.type === 'multiple-choice') {
      html += `
        <div class="exercise-card" data-exercise="${idx}" style="margin-bottom:var(--spacing-lg);padding:var(--spacing-lg);background:var(--color-bg-card);border-radius:var(--radius-lg);border:1px solid var(--color-border)">
          <div style="display:flex;align-items:center;gap:var(--spacing-sm);margin-bottom:var(--spacing-md)">
            <span style="background:var(--color-primary);color:white;width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:var(--font-size-xs);font-weight:600">${idx + 1}</span>
            <strong>Multiple Choice</strong>
          </div>
          <p style="margin-bottom:var(--spacing-md)">${item.question}</p>
          <div class="options-list" style="display:flex;flex-direction:column;gap:var(--spacing-sm)">`
        item.options.forEach((opt, oi) => {
          html += `
            <label class="option-label" style="display:flex;align-items:center;gap:var(--spacing-sm);padding:var(--spacing-sm) var(--spacing-md);border:2px solid var(--color-border);border-radius:var(--radius-md);cursor:pointer;transition:all var(--transition-fast)" data-option="${oi}">
              <input type="radio" name="exercise-${idx}" value="${oi}" style="accent-color:var(--color-primary)" />
              <span>${opt}</span>
            </label>`
        })
        html += `
          </div>
          <button class="btn-check" data-exercise="${idx}" style="margin-top:var(--spacing-md);padding:var(--spacing-sm) var(--spacing-lg);background:var(--color-primary);color:white;border-radius:var(--radius-md);font-size:var(--font-size-sm)">Check Answer</button>
          <div class="exercise-feedback" data-feedback="${idx}" style="margin-top:var(--spacing-sm);padding:var(--spacing-sm);border-radius:var(--radius-sm);display:none"></div>
        </div>`
    } else if (item.type === 'code-challenge') {
      html += `
        <div class="exercise-card code-challenge" data-exercise="${idx}" style="margin-bottom:var(--spacing-lg);padding:var(--spacing-lg);background:var(--color-bg-card);border-radius:var(--radius-lg);border:1px solid var(--color-border)">
          <div style="display:flex;align-items:center;gap:var(--spacing-sm);margin-bottom:var(--spacing-md)">
            <span style="background:var(--color-accent);color:white;width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:var(--font-size-xs);font-weight:600">${idx + 1}</span>
            <strong>Code Challenge</strong>
          </div>
          <p style="margin-bottom:var(--spacing-md)">${item.question}</p>
          <div style="margin-bottom:var(--spacing-md)">
            <textarea class="challenge-editor" data-challenge="${idx}" style="width:100%;min-height:120px;padding:var(--spacing-md);background:var(--color-code-bg);color:#e2e8f0;font-family:var(--font-mono);font-size:var(--font-size-sm);border:none;border-radius:var(--radius-md);resize:vertical;tab-size:2" placeholder="Write your code here...">${escapeHtml(item.starterCode)}</textarea>
          </div>
          <div style="display:flex;gap:var(--spacing-sm);flex-wrap:wrap">
            <button class="btn-check-challenge" data-challenge="${idx}" style="padding:var(--spacing-sm) var(--spacing-lg);background:var(--color-accent);color:white;border-radius:var(--radius-md);font-size:var(--font-size-sm)">Check Solution</button>
            <button class="btn-hint" data-challenge="${idx}" style="padding:var(--spacing-sm) var(--spacing-lg);background:var(--color-warning);color:white;border-radius:var(--radius-md);font-size:var(--font-size-sm)">Hint</button>
            <button class="btn-reset-challenge" data-challenge="${idx}" style="padding:var(--spacing-sm) var(--spacing-lg);background:var(--color-text-muted);color:white;border-radius:var(--radius-md);font-size:var(--font-size-sm)">Reset</button>
          </div>
          <div class="challenge-feedback" data-feedback="${idx}" style="margin-top:var(--spacing-sm);padding:var(--spacing-sm);border-radius:var(--radius-sm);display:none"></div>
        </div>`
    }
  })

  html += '</div>'
  return html
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export function initExercises(language, moduleId, lessonId) {
  initMultipleChoice(language, moduleId, lessonId)
  initCodeChallenges(language, moduleId, lessonId)
}

async function initMultipleChoice(language, moduleId, lessonId) {
  const items = await getExercises(language, moduleId, lessonId)
  const mcItems = items.filter(i => i.type === 'multiple-choice')

  document.querySelectorAll('.btn-check').forEach(btn => {
    const exIdx = parseInt(btn.dataset.exercise)
    const item = mcItems[exIdx]
    if (!item) return

    btn.addEventListener('click', () => {
      const selected = document.querySelector(`input[name="exercise-${exIdx}"]:checked`)
      const feedback = document.querySelector(`[data-feedback="${exIdx}"]`)
      const options = document.querySelectorAll(`[data-option]`)

      options.forEach(o => o.style.borderColor = 'var(--color-border)')

      if (!selected) {
        feedback.style.display = 'block'
        feedback.style.background = '#fef3c7'
        feedback.style.color = '#92400e'
        feedback.textContent = 'Please select an answer.'
        return
      }

      const userAnswer = parseInt(selected.value)
      const correct = userAnswer === item.answer

      feedback.style.display = 'block'
      if (correct) {
        feedback.style.background = '#d1fae5'
        feedback.style.color = '#065f46'
        feedback.innerHTML = `✅ Correct! ${item.explanation}`
        options[userAnswer].style.borderColor = 'var(--color-success)'
        btn.disabled = true
        btn.style.opacity = '0.5'
      } else {
        feedback.style.background = '#fee2e2'
        feedback.style.color = '#991b1b'
        feedback.innerHTML = `❌ Incorrect. ${item.explanation}`
        options[userAnswer].style.borderColor = 'var(--color-error)'
      }
    })
  })
}

async function initCodeChallenges(language, moduleId, lessonId) {
  const items = await getExercises(language, moduleId, lessonId)
  const ccItems = items.filter(i => i.type === 'code-challenge')

  document.querySelectorAll('.btn-check-challenge').forEach(btn => {
    const chIdx = parseInt(btn.dataset.challenge)
    const item = ccItems[chIdx]
    if (!item) return

    btn.addEventListener('click', () => {
      const editor = document.querySelector(`[data-challenge="${chIdx}"]`)
      const feedback = document.querySelector(`.challenge-feedback[data-feedback="${chIdx}"]`)
      const userCode = editor.value.trim()

      feedback.style.display = 'block'

      if (userCode.includes(item.solution.trim())) {
        feedback.style.background = '#d1fae5'
        feedback.style.color = '#065f46'
        feedback.innerHTML = '✅ Great job! Your solution looks correct.'
      } else {
        feedback.style.background = '#fef3c7'
        feedback.style.color = '#92400e'
        feedback.innerHTML = `💡 Almost there! Hint: Make sure you're using the correct function. Expected something like: <code style="background:#fef3c7;padding:1px 4px;border-radius:2px">${escapeHtml(item.solution)}</code>`
      }
    })
  })

  document.querySelectorAll('.btn-hint').forEach(btn => {
    const chIdx = parseInt(btn.dataset.challenge)
    const item = ccItems[chIdx]
    if (!item) return

    btn.addEventListener('click', () => {
      const feedback = document.querySelector(`.challenge-feedback[data-feedback="${chIdx}"]`)
      feedback.style.display = 'block'
      feedback.style.background = '#e0f2fe'
      feedback.style.color = '#075985'
      feedback.textContent = `💡 Hint: ${item.hint}`
    })
  })

  document.querySelectorAll('.btn-reset-challenge').forEach(btn => {
    const chIdx = parseInt(btn.dataset.challenge)
    const item = ccItems[chIdx]
    if (!item) return

    btn.addEventListener('click', () => {
      const editor = document.querySelector(`[data-challenge="${chIdx}"]`)
      const feedback = document.querySelector(`.challenge-feedback[data-feedback="${chIdx}"]`)
      editor.value = item.starterCode
      feedback.style.display = 'none'
    })
  })
}
