import React, { useState, useMemo } from 'react'
import '../styles/frameworkDetails.css'
import { findSimilarFrameworks, getSimilarityReasons } from '../utils/frameworkSimilarity'
import { frameworks as predefinedFrameworks } from './FrameworkSelection'

function Breadcrumbs({ frameworkName, onNavigate }) {
  return (
    <div className="crumbs">
      <span className="crumb-link" onClick={() => onNavigate('dashboard')}>Dashboard</span>
      <span className="sep">/</span>
      <span className="crumb-link" onClick={() => onNavigate('documents')}>Documents</span>
      <span className="sep">/</span>
      <span className="crumb-link" onClick={() => onNavigate('upload')}>Upload Document</span>
      <span className="sep">/</span>
      <span className="crumb-link" onClick={() => onNavigate('framework')}>Framework Selection</span>
      <span className="sep">/</span>
      <span className="muted">{frameworkName}</span>
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

function RequirementCard({ requirement, complianceStatus }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'met': return <span className="icon icon-check"></span>
      case 'partial': return <span className="icon icon-warning"></span>
      case 'not-met': return <span className="icon icon-close"></span>
      default: return '○'
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'met': return 'status-met'
      case 'partial': return 'status-partial'
      case 'not-met': return 'status-not-met'
      default: return 'status-unknown'
    }
  }

  return (
    <div className={`requirement-card ${getStatusClass(complianceStatus)}`}>
      <div className="requirement-header">
        <div className="requirement-id">{requirement.id}</div>
        <div className="requirement-status">
          <span className={`status-icon ${getStatusClass(complianceStatus)}`}>
            {getStatusIcon(complianceStatus)}
          </span>
        </div>
      </div>
      <div className="requirement-title">{requirement.title}</div>
      <div className="requirement-description">{requirement.description}</div>
    </div>
  )
}

function ComparisonResults({ framework, documentFile, complianceData }) {
  const totalRequirements = framework.sections.reduce((total, section) => total + section.requirements.length, 0)
  const metRequirements = complianceData.filter(item => item.status === 'met').length
  const partialRequirements = complianceData.filter(item => item.status === 'partial').length
  const notMetRequirements = complianceData.filter(item => item.status === 'not-met').length
  const compliancePercentage = Math.round((metRequirements / totalRequirements) * 100)

  return (
    <div className="comparison-results">
      <div className="comparison-layout">
        <div className="compare-left">
          <div className="compare-left-head">
            <h3>Framework vs Document</h3>
            <div className="doc-chip">
              <span className="doc-icon">
                <span className="icon icon-document"></span>
              </span>
              <span className="doc-name">{documentFile?.name || 'Document.pdf'}</span>
            </div>
          </div>
          <div className="requirements-breakdown">
            {framework.sections.map(section => (
              <div key={section.id} className="section-breakdown">
                <div className="section-breakdown-header">
                  <h4>{section.id} - {section.title}</h4>
                  <span className="section-compliance">
                    {complianceData.filter(item => item.sectionId === section.id && item.status === 'met').length}/
                    {section.requirements.length} met
                  </span>
                </div>
                <div className="requirements-list">
                  {section.requirements.map(requirement => {
                    const complianceItem = complianceData.find(item => item.requirementId === requirement.id)
                    return (
                      <div key={requirement.id} className="compare-row">
                        <div className="compare-cell requirement-side">
                          <div className="requirement-id">{requirement.id}</div>
                          <div className="requirement-title">{requirement.title}</div>
                          <div className="requirement-description">{requirement.description}</div>
                        </div>
                        <div className="compare-cell document-side">
                          <div className={`status-pill ${complianceItem?.status || 'unknown'}`}>
                            {complianceItem?.status === 'met' && '✓ Met'}
                            {complianceItem?.status === 'partial' && '⚠ Partial'}
                            {complianceItem?.status === 'not-met' && '✗ Not Met'}
                            {!complianceItem && '○ Unknown'}
                          </div>
                          <div className="doc-snippet">Relevant excerpt preview will appear here.</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="compare-right">
          <div className="summary-card">
            <div className="comparison-header">
              <h3>Compliance Summary</h3>
              <div className="compliance-score">
                <div className="score-circle">
                  <span className="score-percentage">{compliancePercentage}%</span>
                  <span className="score-label">Compliant</span>
                </div>
              </div>
            </div>
            <div className="compliance-summary">
              <div className="summary-stats">
                <div className="stat-item">
                  <span className="stat-number">{metRequirements}</span>
                  <span className="stat-label">Met</span>
                  <span className="stat-color met"></span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{partialRequirements}</span>
                  <span className="stat-label">Partial</span>
                  <span className="stat-color partial"></span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{notMetRequirements}</span>
                  <span className="stat-label">Not Met</span>
                  <span className="stat-color not-met"></span>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${compliancePercentage}%` }}></div>
              </div>
            </div>
          </div>

          <div className="legend-card">
            <div className="legend-title">Legend</div>
            <div className="legend-items">
              <div className="legend-item"><span className="dot met"></span> Met</div>
              <div className="legend-item"><span className="dot partial"></span> Partial</div>
              <div className="legend-item"><span className="dot not-met"></span> Not Met</div>
              <div className="legend-item"><span className="dot unknown"></span> Unknown</div>
            </div>
          </div>

          <div className="doc-card">
            <div className="doc-card-title">Document</div>
            <div className="doc-file">
              <span className="doc-icon">
                <span className="icon icon-document"></span>
              </span>
              <div className="doc-meta">
                <div className="doc-name">{documentFile?.name || 'Document.pdf'}</div>
                <div className="doc-sub">{(documentFile?.size ? (documentFile.size / 1024 / 1024).toFixed(2) : '—')} MB • {documentFile?.type || 'application/pdf'}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default function FrameworkDetails({ selectedFramework, selectedFile, uploadedFrameworks = [], onBack, onNavigate }) {
  const [showComparison, setShowComparison] = useState(false)
  const [expandedSections, setExpandedSections] = useState(new Set())

  // Find similar frameworks if the selected framework is custom
  const similarFrameworks = useMemo(() => {
    if (selectedFramework?.isCustom) {
      return findSimilarFrameworks(selectedFramework, predefinedFrameworks, 0.3, 3)
    }
    return []
  }, [selectedFramework])

  // Mock compliance data for demonstration
  const mockComplianceData = selectedFramework.sections.flatMap(section =>
    section.requirements.map(requirement => ({
      sectionId: section.id,
      requirementId: requirement.id,
      status: ['met', 'partial', 'not-met'][Math.floor(Math.random() * 3)]
    }))
  )

  // Mock compliance data for similar frameworks
  const similarFrameworksComplianceData = useMemo(() => {
    return similarFrameworks.map(({ framework, similarity }) => ({
      framework,
      similarity,
      complianceData: framework.sections.flatMap(section =>
        section.requirements.map(requirement => ({
          sectionId: section.id,
          requirementId: requirement.id,
          status: ['met', 'partial', 'not-met'][Math.floor(Math.random() * 3)]
        }))
      )
    }))
  }, [similarFrameworks])

  function toggleSection(sectionId) {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  function handleCompare() {
    setShowComparison(true)
  }

  function handleBackToSelection() {
    onBack()
  }

  if (!selectedFramework) {
    return (
      <div className="layout-single">
        <main className="content">
          <div className="container">
            <div className="error-state">
              <h2>No Framework Selected</h2>
              <p>Please go back and select a framework to view its details.</p>
              <button className="primary" onClick={handleBackToSelection}>Go Back</button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="layout-single">
      <main className="content">
        <header className="page-head">
          <div className="container head-grid">
            <div className="page-title">{selectedFramework.name} Details</div>
            <div className="page-actions">
              <button className="ghost" onClick={handleBackToSelection}>← BACK</button>
            </div>
            <Breadcrumbs frameworkName={selectedFramework.name} onNavigate={onNavigate} />
          </div>
        </header>

        <div className="container stack gap-lg">
          {/* Framework Header */}
          <Section title="Framework Information">
            <div className="framework-header">
              <div className="framework-icon" style={{ backgroundColor: selectedFramework.color }}>
                <span className={`icon ${selectedFramework.icon}`} style={{ fontSize: '48px', color: 'white' }}></span>
              </div>
              <div className="framework-info">
                <h2 className="framework-name">{selectedFramework.name}</h2>
                <h3 className="framework-full-name">{selectedFramework.fullName}</h3>
                <div className="framework-category">{selectedFramework.category}</div>
                <p className="framework-description">{selectedFramework.description}</p>
              </div>
            </div>
          </Section>

          {/* Document Information */}
          <Section title="Document Information">
            <div className="file-info">
              <div className="file-icon">
                <span className="icon icon-document" style={{ fontSize: '48px' }}></span>
              </div>
              <div className="file-details">
                <div className="file-name">{selectedFile?.name || 'Document.pdf'}</div>
                <div className="file-meta">
                  Size: {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB •
                  Type: {selectedFile?.type || 'application/pdf'}
                </div>
              </div>
            </div>
          </Section>

          {/* Framework Sections */}
          <Section title="Framework Requirements">
            <div className="framework-sections">
              {selectedFramework.sections.map(section => (
                <div key={section.id} className="framework-section">
                  <div 
                    className="section-header"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="section-info">
                      <h3 className="section-title">{section.id} - {section.title}</h3>
                      <p className="section-description">{section.description}</p>
                      <div className="section-meta">
                        {section.requirements.length} requirements
                      </div>
                    </div>
                    <div className="section-toggle">
                      {expandedSections.has(section.id) ? '−' : '+'}
                    </div>
                  </div>
                  
                  {expandedSections.has(section.id) && (
                    <div className="section-content">
                      <div className="requirements-grid">
                        {section.requirements.map(requirement => (
                          <div key={requirement.id} className="requirement-item">
                            <div className="requirement-id">{requirement.id}</div>
                            <div className="requirement-title">{requirement.title}</div>
                            <div className="requirement-description">{requirement.description}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* Comparison Section */}
          {!showComparison ? (
            <div className="actions">
              <button className="primary" onClick={handleCompare}>
                COMPARE WITH DOCUMENT
              </button>
            </div>
          ) : (
            <>
              <Section title="Compliance Analysis">
                <ComparisonResults
                  framework={selectedFramework}
                  documentFile={selectedFile}
                  complianceData={mockComplianceData}
                />
              </Section>

              {/* Show similar frameworks comparison if this is a custom framework */}
              {selectedFramework.isCustom && similarFrameworks.length > 0 && (
                <Section title="Similar Predefined Frameworks">
                  <div className="hint" style={{ marginBottom: '16px' }}>
                    Based on your custom framework, we found {similarFrameworks.length} similar predefined framework{similarFrameworks.length > 1 ? 's' : ''} that may provide additional compliance insights.
                  </div>

                  {similarFrameworksComplianceData.map(({ framework, similarity, complianceData }) => {
                    const totalReqs = framework.sections.reduce((sum, s) => sum + s.requirements.length, 0)
                    const metReqs = complianceData.filter(item => item.status === 'met').length
                    const compliancePercentage = Math.round((metReqs / totalReqs) * 100)
                    const reasons = getSimilarityReasons(selectedFramework, framework)

                    return (
                      <div key={framework.id} style={{
                        background: 'var(--bg-2)',
                        border: '1px solid var(--line)',
                        borderRadius: '12px',
                        padding: '20px',
                        marginBottom: '16px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                          <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '10px',
                            background: framework.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px'
                          }}>
                            <span className={`icon ${framework.icon}`} style={{ fontSize: '24px', color: 'white' }}></span>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{framework.name}</h3>
                              <span style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                padding: '4px 8px',
                                borderRadius: '4px',
                                background: 'var(--primary-2)',
                                color: 'var(--primary)'
                              }}>
                                {Math.round(similarity * 100)}% Similar
                              </span>
                            </div>
                            <div style={{ fontSize: '14px', color: 'var(--muted)' }}>{framework.fullName}</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '28px', fontWeight: 700, color: compliancePercentage >= 70 ? 'var(--success)' : compliancePercentage >= 50 ? 'var(--warning)' : 'var(--error)' }}>
                              {compliancePercentage}%
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Compliant</div>
                          </div>
                        </div>

                        {reasons.length > 0 && (
                          <div style={{
                            background: 'var(--bg-3)',
                            border: '1px solid var(--line)',
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: '12px'
                          }}>
                            <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--muted)' }}>
                              Why this framework is similar:
                            </div>
                            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: 'var(--text)' }}>
                              {reasons.map((reason, idx) => (
                                <li key={idx} style={{ marginBottom: '4px' }}>{reason}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                          <div style={{ textAlign: 'center', padding: '12px', background: 'var(--bg-3)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--success)' }}>
                              {complianceData.filter(item => item.status === 'met').length}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Met</div>
                          </div>
                          <div style={{ textAlign: 'center', padding: '12px', background: 'var(--bg-3)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--warning)' }}>
                              {complianceData.filter(item => item.status === 'partial').length}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Partial</div>
                          </div>
                          <div style={{ textAlign: 'center', padding: '12px', background: 'var(--bg-3)', borderRadius: '8px' }}>
                            <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--error)' }}>
                              {complianceData.filter(item => item.status === 'not-met').length}
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Not Met</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </Section>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
