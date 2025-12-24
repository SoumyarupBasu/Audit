import React, { useState, useMemo, useRef } from 'react'
import { calculateFrameworkSimilarity, getSimilarityReasons } from '../utils/frameworkSimilarity'
import { frameworks as predefinedFrameworks } from './FrameworkSelection'
import Icon from '../components/Icon'
import '../styles/frameworkComparison.css'

function Section({ title, children, right }) {
  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">{title}</div>
        {right && <div>{right}</div>}
      </div>
      <div className="section-body">{children}</div>
    </div>
  )
}

function Breadcrumbs({ onNavigate }) {
  return (
    <div className="crumbs">
      <span className="crumb-link" onClick={() => onNavigate('dashboard')}>Dashboard</span>
      <span className="sep">/</span>
      <span className="crumb-link" onClick={() => onNavigate('upload-framework')}>Upload Framework</span>
      <span className="sep">/</span>
      <span>Framework Comparison</span>
    </div>
  )
}

export default function FrameworkComparison({ uploadedFramework, onDocumentUpload, onNavigate, onBack }) {
  const inputFileRef = useRef(null)
  const [documentFile, setDocumentFile] = useState(null)
  const [showResults, setShowResults] = useState(false)

  // Calculate similarity scores for all predefined frameworks
  const frameworkComparisons = useMemo(() => {
    return predefinedFrameworks.map(framework => ({
      framework,
      similarity: calculateFrameworkSimilarity(uploadedFramework, framework),
      reasons: getSimilarityReasons(uploadedFramework, framework)
    }))
    .sort((a, b) => b.similarity - a.similarity)
  }, [uploadedFramework])

  // Get top 3 most similar frameworks
  const topSimilarFrameworks = frameworkComparisons.slice(0, 3)

  // Get similarity level color
  const getSimilarityColor = (similarity) => {
    const percentage = similarity * 100
    if (percentage >= 70) return 'var(--success)'
    if (percentage >= 40) return 'var(--warning)'
    return 'var(--muted)'
  }

  // Get similarity level label
  const getSimilarityLabel = (similarity) => {
    const percentage = similarity * 100
    if (percentage >= 70) return 'High Similarity'
    if (percentage >= 40) return 'Medium Similarity'
    return 'Low Similarity'
  }

  function openFilePicker() {
    inputFileRef.current?.click()
  }

  function onFileChange(e) {
    const f = e.target.files?.[0]
    if (f) {
      setDocumentFile(f)
    }
  }

  function onDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    const f = e.dataTransfer.files?.[0]
    if (f) {
      setDocumentFile(f)
    }
  }

  function onDragOver(e) {
    e.preventDefault()
  }

  function handleAnalyzeDocument() {
    if (!documentFile) {
      alert('Please upload a document first.')
      return
    }
    setShowResults(true)
    // Call the parent callback if provided
    if (onDocumentUpload) {
      onDocumentUpload(documentFile, uploadedFramework, topSimilarFrameworks)
    }
  }

  function handleBackClick() {
    if (onBack) {
      onBack()
    } else {
      onNavigate('upload-framework')
    }
  }

  function openAI() { alert('AI Assistant coming soon') }
  function openSettings() { alert('Settings coming soon') }
  function refreshPage() { window.location.reload() }

  // Calculate matching features
  const getMatchingFeatures = (framework) => {
    const customFeatures = new Set((uploadedFramework.features || []).map(f => f.toLowerCase()))
    const frameworkFeatures = framework.features || []
    return frameworkFeatures.filter(f => customFeatures.has(f.toLowerCase()))
  }

  return (
    <div className="layout-single">
      <main className="content">
        <header className="page-head">
          <div className="container head-grid">
            <div className="page-title">Framework Comparison</div>
            <div className="page-actions">
              <button className="ghost" onClick={openAI}>AI ASSISTANT</button>
              <button className="ghost" onClick={openSettings}>⚙</button>
              <button className="ghost" onClick={refreshPage}>↻</button>
            </div>
            <Breadcrumbs onNavigate={onNavigate} />
          </div>
        </header>

        <div className="container stack gap-lg">
          {/* Uploaded Framework Header */}
          <Section title="Your Custom Framework">
            <div className="framework-header-card">
              <div className="framework-icon-large" style={{ backgroundColor: uploadedFramework.color }}>
                <Icon name={uploadedFramework.icon} size="48px" style={{ color: 'white' }} />
              </div>
              <div className="framework-header-info">
                <h2 className="framework-name-large">{uploadedFramework.name}</h2>
                <p className="framework-full-name">{uploadedFramework.fullName || uploadedFramework.name}</p>
                <div className="framework-meta">
                  <span className="meta-badge">{uploadedFramework.category}</span>
                  <span className="meta-item">{uploadedFramework.sections?.length || 0} Sections</span>
                  <span className="meta-item">
                    {uploadedFramework.sections?.reduce((sum, s) => sum + (s.requirements?.length || 0), 0) || 0} Requirements
                  </span>
                </div>
                <p className="framework-description">{uploadedFramework.description}</p>
              </div>
            </div>
          </Section>

          {/* Similarity Analysis */}
          <Section 
            title="Framework Similarity Analysis"
            right={
              <span className="hint-text">
                Showing all {frameworkComparisons.length} preset frameworks ranked by similarity
              </span>
            }
          >
            <div className="similarity-grid">
              {frameworkComparisons.map(({ framework, similarity, reasons }, index) => {
                const isTopMatch = index < 3
                const matchingFeatures = getMatchingFeatures(framework)
                const similarityPercentage = Math.round(similarity * 100)
                
                return (
                  <div 
                    key={framework.id} 
                    className={`similarity-card ${isTopMatch ? 'top-match' : ''}`}
                  >
                    {isTopMatch && (
                      <div className="top-match-badge">
                        Top {index + 1} Match
                      </div>
                    )}
                    
                    <div className="similarity-card-header">
                      <div className="framework-icon-small" style={{ backgroundColor: framework.color }}>
                        <Icon name={framework.icon} size="24px" style={{ color: 'white' }} />
                      </div>
                      <div className="similarity-card-info">
                        <h4 className="similarity-framework-name">{framework.name}</h4>
                        <p className="similarity-framework-category">{framework.category}</p>
                      </div>
                      <div className="similarity-score-badge" style={{ 
                        background: `${getSimilarityColor(similarity)}15`,
                        color: getSimilarityColor(similarity),
                        borderColor: getSimilarityColor(similarity)
                      }}>
                        {similarityPercentage}%
                      </div>
                    </div>

                    <div className="similarity-progress-bar">
                      <div 
                        className="similarity-progress-fill" 
                        style={{ 
                          width: `${similarityPercentage}%`,
                          background: getSimilarityColor(similarity)
                        }}
                      ></div>
                    </div>

                    <div className="similarity-label" style={{ color: getSimilarityColor(similarity) }}>
                      {getSimilarityLabel(similarity)}
                    </div>

                    {reasons.length > 0 && (
                      <div className="similarity-reasons">
                        <div className="reasons-title">Why similar:</div>
                        <ul className="reasons-list">
                          {reasons.slice(0, 3).map((reason, idx) => (
                            <li key={idx}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="similarity-stats">
                      <div className="stat-item">
                        <div className="stat-value">{framework.sections?.length || 0}</div>
                        <div className="stat-label">Sections</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">
                          {framework.sections?.reduce((sum, s) => sum + (s.requirements?.length || 0), 0) || 0}
                        </div>
                        <div className="stat-label">Requirements</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">{matchingFeatures.length}</div>
                        <div className="stat-label">Matching Features</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Section>

          {/* Side-by-Side Comparison with Top 3 */}
          <Section title="Detailed Comparison - Top 3 Similar Frameworks">
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th className="comparison-header-cell">Attribute</th>
                    <th className="comparison-header-cell custom-column">
                      Your Framework
                      <div className="column-subtitle">{uploadedFramework.name}</div>
                    </th>
                    {topSimilarFrameworks.map(({ framework, similarity }) => (
                      <th key={framework.id} className="comparison-header-cell">
                        {framework.name}
                        <div className="column-subtitle">{Math.round(similarity * 100)}% Similar</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="comparison-label-cell">Category</td>
                    <td className="comparison-value-cell custom-column">
                      <span className="value-badge">{uploadedFramework.category}</span>
                    </td>
                    {topSimilarFrameworks.map(({ framework }) => (
                      <td key={framework.id} className="comparison-value-cell">
                        <span className={`value-badge ${framework.category === uploadedFramework.category ? 'match' : ''}`}>
                          {framework.category}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="comparison-label-cell">Sections</td>
                    <td className="comparison-value-cell custom-column">{uploadedFramework.sections?.length || 0}</td>
                    {topSimilarFrameworks.map(({ framework }) => (
                      <td key={framework.id} className="comparison-value-cell">{framework.sections?.length || 0}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="comparison-label-cell">Requirements</td>
                    <td className="comparison-value-cell custom-column">
                      {uploadedFramework.sections?.reduce((sum, s) => sum + (s.requirements?.length || 0), 0) || 0}
                    </td>
                    {topSimilarFrameworks.map(({ framework }) => (
                      <td key={framework.id} className="comparison-value-cell">
                        {framework.sections?.reduce((sum, s) => sum + (s.requirements?.length || 0), 0) || 0}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* Document Upload Section */}
          <Section title="Upload Document for Audit">
            <div className="upload-hint">
              <span className="hint-icon">ℹ️</span>
              <span>Upload a document to analyze compliance against your custom framework and the top similar preset frameworks</span>
            </div>

            <div className={`dropzone-modern ${documentFile ? 'has-file' : ''}`} onDrop={onDrop} onDragOver={onDragOver}>
              <input type="file" ref={inputFileRef} onChange={onFileChange} style={{ display: 'none' }} accept=".pdf,.doc,.docx" />

              {!documentFile ? (
                <>
                  <div className="drop-icon">📄</div>
                  <div className="drop-title">Drop your document here</div>
                  <div className="drop-subtitle">or click to browse</div>
                  <button className="btn-upload" type="button" onClick={openFilePicker}>
                    Choose File
                  </button>
                  <div className="drop-formats">
                    <span className="format-badge">PDF</span>
                    <span className="format-badge">DOC</span>
                    <span className="format-badge">DOCX</span>
                    <span className="format-info">• Max 50MB</span>
                  </div>
                </>
              ) : (
                <div className="file-preview">
                  <div className="file-icon">📄</div>
                  <div className="file-details">
                    <div className="file-name">{documentFile.name}</div>
                    <div className="file-meta">
                      {(documentFile.size / 1024 / 1024).toFixed(2)} MB • {documentFile.type || 'Unknown type'}
                    </div>
                  </div>
                  <button className="btn-remove" onClick={() => setDocumentFile(null)}>✕</button>
                </div>
              )}
            </div>

            {documentFile && !showResults && (
              <div className="actions">
                <button className="btn-primary" onClick={handleAnalyzeDocument}>
                  Analyze Document Against Frameworks
                </button>
              </div>
            )}
          </Section>

          {/* Action Buttons */}
          <div className="actions">
            <button className="btn-secondary" onClick={handleBackClick}>
              ← Back to Upload Framework
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

