import React, { useRef, useState } from 'react'
import FrameworkSelectModal from '../components/FrameworkSelectModal'
import Icon from '../components/Icon'
import '../styles/upload.css'

function Breadcrumbs({ onNavigate }) {
  return (
    <div className="crumbs">
      <span className="crumb-link" onClick={() => onNavigate('dashboard')}>Dashboard</span>
      <span className="sep">/</span>
      <span className="crumb-link" onClick={() => onNavigate('documents')}>Documents</span>
      <span className="sep">/</span>
      <span className="muted">Upload Document</span>
    </div>
  )
}

function Section({ title, right, children }) {
  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">{title}</div>
        {right ? <div className="section-right">{right}</div> : null}
      </div>
      <div className="section-body">{children}</div>
    </div>
  )
}

export default function UploadDocument({ onFileUpload, onNavigate, onComparisonComplete }) {
  const inputFileRef = useRef(null)
  const [file, setFile] = useState(null)
  const [form, setForm] = useState({
    title: '', category: '', type: '', subCategory: '', periodicity: '', level: '', tags: '', origin: '', source: '', topics: '', summary: '', description: '', sourceSeverity: 8.5, reviewSeverity: 7.2,
  })

  // Comparison state
  const [showFrameworkModal, setShowFrameworkModal] = useState(false)
  const [isComparing, setIsComparing] = useState(false)
  const [comparisonProgress, setComparisonProgress] = useState({ phase: '', percent: 0 })
  const [comparisonError, setComparisonError] = useState(null)

  function openFilePicker() {
    inputFileRef.current?.click()
  }

  function onFileChange(e) {
    const f = e.target.files?.[0]
    if (f) setFile(f)
  }

  function onDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    const f = e.dataTransfer.files?.[0]
    if (f) setFile(f)
  }

  function onDragOver(e) { e.preventDefault() }

  function update(key, value) { setForm(prev => ({ ...prev, [key]: value })) }

  function handleCancel() {
    // In a real app, navigate away. For now clear and notify.
    setFile(null)
    setForm({ title: '', category: '', type: '', subCategory: '', periodicity: '', level: '', tags: '', origin: '', source: '', topics: '', summary: '', description: '', sourceSeverity: 8.5, reviewSeverity: 7.2 })
    alert('Cancelled')
  }

  function handleReset() {
    setFile(null)
    setForm({ title: '', category: '', type: '', subCategory: '', periodicity: '', level: '', tags: '', origin: '', source: '', topics: '', summary: '', description: '', sourceSeverity: 8.5, reviewSeverity: 7.2 })
  }

  function handleUpload() {
    if (!file) { alert('Please select a file first.'); return }
    const payload = { fileName: file.name, size: file.size, type: file.type, form }
    console.log('Uploading payload', payload)

    // Call the onFileUpload callback to navigate to framework selection
    if (onFileUpload) {
      onFileUpload(file)
    } else {
      alert('Upload simulated. Check console for payload.')
    }
  }

  function handleCompareClick() {
    if (!file) {
      alert('Please select a file first.')
      return
    }
    setShowFrameworkModal(true)
  }

  async function handleFrameworkSelect(framework) {
    setShowFrameworkModal(false)
    setIsComparing(true)
    setComparisonError(null)
    setComparisonProgress({ phase: 'uploading', percent: 0 })

    try {
      // Create form data for upload
      const formData = new FormData()
      formData.append('document', file)
      formData.append('frameworkId', framework.id)
      formData.append('frameworkName', framework.name)

      // Upload and start comparison
      const uploadResponse = await fetch('http://localhost:3001/api/compare/upload', {
        method: 'POST',
        body: formData
      })

      if (!uploadResponse.ok) {
        const error = await uploadResponse.json()
        throw new Error(error.error || 'Upload failed')
      }

      const { jobId } = await uploadResponse.json()

      // Poll for status
      let completed = false
      while (!completed) {
        await new Promise(resolve => setTimeout(resolve, 1000))

        const statusResponse = await fetch(`http://localhost:3001/api/compare/status/${jobId}`)
        const status = await statusResponse.json()

        setComparisonProgress({
          phase: status.phase || 'processing',
          percent: status.progress || 0
        })

        if (status.status === 'completed') {
          completed = true
          // Navigate to comparison results
          if (onComparisonComplete) {
            onComparisonComplete(jobId, framework)
          } else {
            onNavigate('comparison-results', { jobId, framework })
          }
        } else if (status.status === 'failed') {
          throw new Error(status.error || 'Comparison failed')
        }
      }
    } catch (error) {
      console.error('Comparison error:', error)
      setComparisonError(error.message)
    } finally {
      setIsComparing(false)
    }
  }

  function openAI() { alert('AI Assistant coming soon') }
  function openSettings() { alert('Settings coming soon') }
  function refreshPage() { window.location.reload() }


  return (
    <div className="layout-single">
      <main className="content">
        <header className="page-head">
          <div className="container head-grid">
            <div className="page-title">Upload Document</div>
            <div className="page-actions">
              <button className="ghost" onClick={openAI}>AI ASSISTANT</button>
              <button className="ghost" onClick={openSettings}>⚙</button>
              <button className="ghost" onClick={refreshPage}>↻</button>
            </div>
            <Breadcrumbs onNavigate={onNavigate} />
          </div>
        </header>

        <div className="container stack gap-lg">
          <Section title="Document Files">
            <div className="hint">Upload one document file. Supported: PDF, DOC, DOCX, PNG, JPEG, GIF, MP3, MP4, AAC, OGG, AMR, 3GPP, MOV. Max: 50MB.</div>

            <div className="dropzone" onDrop={onDrop} onDragOver={onDragOver} onClick={openFilePicker}>
              <div className="drop-cloud">
                <span className="icon icon-cloud" style={{ fontSize: '64px' }}></span>
              </div>
              <div className="drop-text">{file ? `Selected: ${file.name}` : 'Drag & drop file here, or click to select'}</div>
              <div className="drop-sub">Supports: application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/png, image/jpeg, image/gif, audio/mpeg, audio/mp4, audio/aac, audio/ogg, audio/amr, video/mp4, video/3gpp, video/quicktime - Max size: 50MB</div>
              <input type="file" ref={inputFileRef} onChange={onFileChange} style={{ display: 'none' }} />
              <button className="btn" type="button" onClick={openFilePicker}>CHOOSE FILES</button>
            </div>

            <div className="legend">
              <div>Supported file types: <span className="muted">PDF, DOC, DOCX, PNG, JPEG, GIF, MP3, MP4, AAC, OGG, AMR, 3GPP, MOV</span></div>
              <div>Maximum file size: <span className="muted">50MB</span></div>
              <div>Upload limit: <span className="muted">One file only</span></div>
            </div>
          </Section>

          <Section title="Document Information">
            <div className="group">
              <div className="field">
                <label>Document Title</label>
                <input className="input" value={form.title} onChange={e => update('title', e.target.value)} placeholder="" />
              </div>
            </div>

            <div className="grid3">
              <div className="field">
                <label>Document Category</label>
                <select className="input" value={form.category} onChange={e => update('category', e.target.value)}><option>—</option><option>Category A</option><option>Category B</option></select>
              </div>
              <div className="field">
                <label>Document Type</label>
                <select className="input" value={form.type} onChange={e => update('type', e.target.value)}><option>—</option><option>Report</option><option>Notice</option></select>
              </div>
              <div className="field">
                <label>Document Sub-Category</label>
                <select className="input" value={form.subCategory} onChange={e => update('subCategory', e.target.value)}><option>—</option><option>Sub A</option><option>Sub B</option></select>
              </div>
            </div>

            <div className="grid3">
              <div className="field">
                <label>Periodicity</label>
                <select className="input" value={form.periodicity} onChange={e => update('periodicity', e.target.value)}><option>—</option><option>One-time</option><option>Monthly</option></select>
              </div>
              <div className="field">
                <label>Classification Level</label>
                <select className="input" value={form.level} onChange={e => update('level', e.target.value)}><option>—</option><option>Public</option><option>Confidential</option></select>
              </div>
              <div className="field">
                <label>Tags</label>
                <input className="input" value={form.tags} onChange={e => update('tags', e.target.value)} placeholder="Add tags" />
              </div>
            </div>

            <div className="grid2">
              <div className="field">
                <label>Origin</label>
                <input className="input" value={form.origin} onChange={e => update('origin', e.target.value)} />
              </div>
              <div className="field">
                <label>Source</label>
                <input className="input" value={form.source} onChange={e => update('source', e.target.value)} />
              </div>
            </div>

            <div className="field">
              <label>Related Topics</label>
              <input className="input" value={form.topics} onChange={e => update('topics', e.target.value)} placeholder="Related Topics" />
            </div>

            <div className="grid2">
              <div className="field">
                <label>Source Severity (0-10)</label>
                <input type="range" min="0" max="10" value={form.sourceSeverity} onChange={e => update('sourceSeverity', parseFloat(e.target.value))} className="range" />
                <div className="muted">Current value: {form.sourceSeverity}</div>
              </div>
              <div className="field">
                <label>Review Severity (0-10)</label>
                <input type="range" min="0" max="10" value={form.reviewSeverity} onChange={e => update('reviewSeverity', parseFloat(e.target.value))} className="range" />
                <div className="muted">Current value: {form.reviewSeverity}</div>
              </div>
            </div>

            <div className="field">
              <label>Executive Summary</label>
              <textarea className="input" rows={4} value={form.summary} onChange={e => update('summary', e.target.value)} />
            </div>
            <div className="field">
              <label>Detailed Description</label>
              <textarea className="input" rows={6} value={form.description} onChange={e => update('description', e.target.value)} />
            </div>

            {/* Comparison Progress Indicator */}
            {isComparing && (
              <div className="comparison-progress">
                <div className="progress-header">
                  <Icon name="loader" size="20px" className="spinning" />
                  <span>Comparing controls...</span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${comparisonProgress.percent}%` }}
                  />
                </div>
                <div className="progress-info">
                  <span className="progress-phase">
                    {comparisonProgress.phase === 'extracting' && 'Extracting controls from document...'}
                    {comparisonProgress.phase === 'comparing' && 'Comparing with framework controls...'}
                    {comparisonProgress.phase === 'uploading' && 'Uploading document...'}
                    {comparisonProgress.phase === 'complete' && 'Comparison complete!'}
                  </span>
                  <span className="progress-percent">{comparisonProgress.percent}%</span>
                </div>
              </div>
            )}

            {/* Comparison Error */}
            {comparisonError && (
              <div className="comparison-error">
                <Icon name="alert-circle" size="20px" />
                <span>{comparisonError}</span>
                <button onClick={() => setComparisonError(null)}>Dismiss</button>
              </div>
            )}

            <div className="actions">
              <button className="ghost" type="button" onClick={handleCancel}>CANCEL</button>
              <button className="ghost" type="button" onClick={handleReset}>RESET</button>
              <button className="primary" type="button" onClick={handleUpload}>UPLOAD</button>
              <button
                className="compare-btn"
                type="button"
                onClick={handleCompareClick}
                disabled={!file || isComparing}
                title="Extract controls from document and compare with a framework"
              >
                <Icon name="git-compare" size="16px" />
                EXTRACT & COMPARE
              </button>
            </div>
          </Section>
        </div>
      </main>

      {/* Framework Selection Modal */}
      <FrameworkSelectModal
        isOpen={showFrameworkModal}
        onClose={() => setShowFrameworkModal(false)}
        onSelect={handleFrameworkSelect}
        title="Select Framework for Comparison"
      />
    </div>
  )
}


