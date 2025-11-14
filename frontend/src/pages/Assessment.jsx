import React, { useState, useEffect } from 'react'

const questionsList = [
  {
    id: 'q1',
    type: 'text',
    question: 'Please describe the main symptom you are experiencing:',
    placeholder: 'Describe your symptom...',
    required: true,
  },
  {
    id: 'q2',
    type: 'single',
    question: 'How long have you had this symptom?',
    options: ['Less than 24 hours', '1-3 days', 'More than 3 days'],
    required: true,
  },
  {
    id: 'q3',
    type: 'multi',
    question: 'Which of the following apply? (select all that apply)',
    options: ['Fever', 'Cough', 'Shortness of breath', 'Fatigue', 'None of the above'],
    required: false,
  },
  {
    id: 'q4',
    type: 'rating',
    question: 'Rate the severity of your symptom (1 = mild, 5 = severe):',
    scale: 5,
    required: true,
  },
  {
    id: 'q5',
    type: 'number',
    question: 'What is your age?',
    placeholder: 'Enter your age',
    required: true,
    min: 0,
    max: 120,
  },
  {
    id: 'q6',
    type: 'text',
    question: 'Any other notes or concerns?',
    placeholder: 'Optional notes...',
    required: false,
  },
]

const initialAnswers = () => {
  const obj = {}
  questionsList.forEach((q) => {
    if (q.type === 'multi') obj[q.id] = []
    else obj[q.id] = ''
  })
  return obj
}

const Assessment = () => {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(initialAnswers())
  const [errors, setErrors] = useState({})
  const [showReview, setShowReview] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null) // computed mental state/stress result

  useEffect(() => {
    // load saved draft if any
    const draft = localStorage.getItem('assessment_draft')
    if (draft) {
      try {
        const parsed = JSON.parse(draft)
        setAnswers((prev) => ({ ...prev, ...parsed }))
      } catch (e) {
        // ignore
      }
    }
  }, [])

  useEffect(() => {
    // autosave draft
    localStorage.setItem('assessment_draft', JSON.stringify(answers))
  }, [answers])

  const validateQuestion = (q) => {
    if (!q.required) return null
    const val = answers[q.id]
    if (q.type === 'multi') {
      if (!Array.isArray(val) || val.length === 0) return 'This question is required.'
    } else if (q.type === 'number') {
      if (val === '' || val === null) return 'Required'
      const num = Number(val)
      if (Number.isNaN(num)) return 'Must be a number'
      if (q.min !== undefined && num < q.min) return `Must be at least ${q.min}`
      if (q.max !== undefined && num > q.max) return `Must be at most ${q.max}`
    } else {
      if (val === '' || val === null) return 'This question is required.'
    }
    return null
  }

  const handleChangeText = (id, value) => {
    setAnswers((a) => ({ ...a, [id]: value }))
    setErrors((e) => ({ ...e, [id]: null }))
  }

  const handleSelectSingle = (id, option) => {
    setAnswers((a) => ({ ...a, [id]: option }))
    setErrors((e) => ({ ...e, [id]: null }))
  }

  const handleToggleMulti = (id, option) => {
    setAnswers((a) => {
      const currentArr = Array.isArray(a[id]) ? a[id].slice() : []
      const idx = currentArr.indexOf(option)
      if (idx >= 0) currentArr.splice(idx, 1)
      else currentArr.push(option)
      return { ...a, [id]: currentArr }
    })
    setErrors((e) => ({ ...e, [id]: null }))
  }

  const handleRating = (id, value) => {
    setAnswers((a) => ({ ...a, [id]: value }))
    setErrors((e) => ({ ...e, [id]: null }))
  }

  // compute a simple stress/mental-state score and label from answers
  const computeMentalState = (ans) => {
    let score = 0
    // rating severity (q4) has strongest weight
    const rating = Number(ans.q4) || 0
    score += rating * 2

    // duration (q2)
    if (ans.q2 === 'More than 3 days') score += 2
    else if (ans.q2 === '1-3 days') score += 1

    // symptoms (q3)
    const multi = Array.isArray(ans.q3) ? ans.q3 : []
    if (multi.includes('Fatigue')) score += 2
    if (multi.includes('Shortness of breath')) score += 2
    if (multi.includes('Fever')) score += 1
    if (multi.includes('Cough')) score += 1

    // free text signals in main symptom and notes
    const text = ((ans.q1 || '') + ' ' + (ans.q6 || '')).toLowerCase()
    const keywords = ['anx', 'anxiety', 'stress', 'depress', 'worried', 'panic']
    for (const k of keywords) {
      if (text.includes(k)) {
        score += 2
        break
      }
    }

    // simple mapping
    let label = 'Low'
    let message = 'Your current stress/mental state appears to be low based on these responses.'
    if (score >= 7) {
      label = 'High'
      message = 'Your responses suggest a high level of stress/mental strain. Consider seeking professional support.'
    } else if (score >= 4) {
      label = 'Moderate'
      message = 'Your responses suggest a moderate level of stress. Monitor symptoms and consider self-care or professional advice if it persists.'
    }

    return { score, label, message, breakdown: { rating, duration: ans.q2, symptoms: multi, textSnippet: text.slice(0, 200) } }
  }

  const next = () => {
    const q = questionsList[current]
    const err = validateQuestion(q)
    if (err) {
      setErrors((e) => ({ ...e, [q.id]: err }))
      return
    }
    if (current < questionsList.length - 1) setCurrent((c) => c + 1)
    else setShowReview(true)
  }

  const prev = () => {
    if (current > 0) setCurrent((c) => c - 1)
  }

  const goTo = (index) => {
    setCurrent(index)
    setShowReview(false)
  }

  const submit = () => {
    // validate all required
    const newErrors = {}
    questionsList.forEach((q) => {
      const err = validateQuestion(q)
      if (err) newErrors[q.id] = err
    })
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // jump to first error
      const firstErrIndex = questionsList.findIndex((q) => newErrors[q.id])
      if (firstErrIndex >= 0) {
        setCurrent(firstErrIndex)
        setShowReview(false)
      }
      return
    }

    const payload = {
      answers,
      completedAt: new Date().toISOString(),
    }
    // simulate submit: save to localStorage and clear draft
    const submissions = JSON.parse(localStorage.getItem('assessments') || '[]')
    submissions.push(payload)
    localStorage.setItem('assessments', JSON.stringify(submissions))
    localStorage.removeItem('assessment_draft')
    // compute and store mental state result to show to user
    const computed = computeMentalState(answers)
    setResult(computed)
    setSubmitted(true)
  }

  const reset = () => {
    setAnswers(initialAnswers())
    setCurrent(0)
    setErrors({})
    setShowReview(false)
    setSubmitted(false)
    localStorage.removeItem('assessment_draft')
    setResult(null)
  }

  const q = questionsList[current]

  if (submitted) {
    return (
      <div style={{ maxWidth: 780, margin: '24px auto', fontFamily: 'sans-serif' }}>
        <h2>Assessment submitted</h2>
        <p>Thank you. Your responses have been recorded.</p>
        {result ? (
          <div style={{ marginTop: 12, padding: 12, border: '1px solid #eee', borderRadius: 6 }}>
            <h3>Mental state / Stress level: <span style={{ color: result.label === 'High' ? '#c00' : result.label === 'Moderate' ? '#e65' : '#2a9d8f' }}>{result.label}</span></h3>
            <p><strong>Score:</strong> {result.score}</p>
            <p>{result.message}</p>
            <details style={{ marginTop: 8 }}>
              <summary style={{ cursor: 'pointer' }}>View breakdown</summary>
              <div style={{ marginTop: 8 }}>
                <div><strong>Severity rating:</strong> {result.breakdown.rating}</div>
                <div><strong>Duration:</strong> {result.breakdown.duration || '—'}</div>
                <div><strong>Symptoms:</strong> {(result.breakdown.symptoms || []).join(', ') || '—'}</div>
                <div style={{ marginTop: 6 }}><strong>Notes snippet:</strong> {result.breakdown.textSnippet || '—'}</div>
              </div>
            </details>
          </div>
        ) : null}
        <div style={{ marginTop: 12 }}>
          <button onClick={reset} style={buttonStyle}>Start New Assessment</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 780, margin: '24px auto', fontFamily: 'sans-serif' }}>
      <h2>Health Assessment</h2>

      <div style={{ marginBottom: 12 }}>
        <strong>Progress:</strong> {Math.min(current + 1, questionsList.length)} / {questionsList.length}
      </div>

      {!showReview ? (
        <div>
          <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 6 }}>
            <div style={{ marginBottom: 8 }}>
              <strong>{q.question}</strong> {q.required ? <span style={{ color: 'red' }}>*</span> : null}
            </div>

            {q.type === 'text' && (
              <div>
                <textarea
                  rows={4}
                  placeholder={q.placeholder || ''}
                  value={answers[q.id]}
                  onChange={(e) => handleChangeText(q.id, e.target.value)}
                  style={{ width: '100%', padding: 8 }}
                />
              </div>
            )}

            {q.type === 'number' && (
              <div>
                <input
                  type="number"
                  placeholder={q.placeholder || ''}
                  value={answers[q.id]}
                  onChange={(e) => handleChangeText(q.id, e.target.value)}
                  min={q.min}
                  max={q.max}
                  style={{ width: '100%', padding: 8 }}
                />
              </div>
            )}

            {q.type === 'single' && (
              <div>
                {q.options.map((opt) => (
                  <label key={opt} style={{ display: 'block', marginBottom: 6 }}>
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === opt}
                      onChange={() => handleSelectSingle(q.id, opt)}
                    />{' '}
                    {opt}
                  </label>
                ))}
              </div>
            )}

            {q.type === 'multi' && (
              <div>
                {q.options.map((opt) => (
                  <label key={opt} style={{ display: 'block', marginBottom: 6 }}>
                    <input
                      type="checkbox"
                      checked={(answers[q.id] || []).indexOf(opt) >= 0}
                      onChange={() => handleToggleMulti(q.id, opt)}
                    />{' '}
                    {opt}
                  </label>
                ))}
              </div>
            )}

            {q.type === 'rating' && (
              <div>
                {[...Array(q.scale || 5)].map((_, i) => {
                  const val = i + 1
                  return (
                    <button
                      key={val}
                      onClick={() => handleRating(q.id, val)}
                      style={{
                        marginRight: 6,
                        padding: '6px 10px',
                        background: answers[q.id] === val ? '#007bff' : '#f0f0f0',
                        color: answers[q.id] === val ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                      }}
                      type="button"
                    >
                      {val}
                    </button>
                  )
                })}
              </div>
            )}

            {errors[q.id] && <div style={{ color: 'red', marginTop: 8 }}>{errors[q.id]}</div>}
          </div>

          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button onClick={prev} disabled={current === 0} style={buttonStyle}>Previous</button>
            <button onClick={next} style={buttonStyle}>
              {current === questionsList.length - 1 ? 'Review' : 'Next'}
            </button>
            <button onClick={() => setShowReview(true)} style={{ ...buttonStyle, marginLeft: 'auto' }}>Open Review</button>
          </div>

          <div style={{ marginTop: 18 }}>
            <small>Tip: Responses are autosaved as a draft in your browser.</small>
          </div>
        </div>
      ) : (
        <div>
          <h3>Review your answers</h3>
          <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 6 }}>
            {questionsList.map((qq, idx) => (
              <div key={qq.id} style={{ padding: 8, borderBottom: '1px solid #fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{idx + 1}. {qq.question}</strong>
                  <button onClick={() => goTo(idx)} style={{ ...smallBtnStyle }}>Edit</button>
                </div>
                <div style={{ marginTop: 6 }}>
                  {renderAnswerPreview(answers[qq.id])}
                  {errors[qq.id] && <div style={{ color: 'red', marginTop: 6 }}>{errors[qq.id]}</div>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button onClick={() => setShowReview(false)} style={buttonStyle}>Back</button>
            <button onClick={submit} style={buttonStyle}>Submit Assessment</button>
          </div>
        </div>
      )}
    </div>
  )
}

// small helpers and styles
const buttonStyle = {
  padding: '8px 12px',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
}

const smallBtnStyle = {
  padding: '4px 8px',
  background: '#eee',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
}

function renderAnswerPreview(value) {
  if (Array.isArray(value)) {
    if (value.length === 0) return <em>No response</em>
    return <div>{value.join(', ')}</div>
  }
  if (value === '' || value == null) return <em>No response</em>
  return <div>{String(value)}</div>
}

export default Assessment
