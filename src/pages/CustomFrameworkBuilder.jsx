import React, { useState, useEffect } from 'react'
import Icon from '../components/Icon'
import { useCustomFramework } from '../context/CustomFrameworkContext'
import { exportCustomFrameworkToWord } from '../utils/wordExport'
import '../styles/customFramework.css'

// Available frameworks for selection (only those with controls available)
const availableFrameworks = [
  { id: 'iso27001', name: 'ISO 27001', color: '#3b82f6', description: 'Information Security Management System' },
  { id: 'nist', name: 'NIST', color: '#10b981', description: 'Cybersecurity Framework' },
  { id: 'sox', name: 'SOX', color: '#8b5cf6', description: 'Sarbanes-Oxley Act' },
  { id: 'cis', name: 'CIS Controls', color: '#f59e0b', description: 'CIS Critical Security Controls' },
  { id: 'gdpr', name: 'GDPR', color: '#ef4444', description: 'General Data Protection Regulation' },
  { id: 'pci-dss', name: 'PCI DSS', color: '#06b6d4', description: 'Payment Card Industry Data Security Standard' },
  { id: 'ai-nlp', name: 'AI NLP Framework', color: '#9333ea', description: 'AI-Processed Composite Security Framework' }
]

export default function CustomFrameworkBuilder({ onNavigateToFramework }) {
  const {
    selectedControls,
    frameworkName,
    setFrameworkName,
    isBuilderOpen,
    setIsBuilderOpen,
    removeControl,
    clearAll,
    getGroupedControls,
    totalCount,
    setIsAddingFromFramework,
    setNavigationCallback
  } = useCustomFramework()

  const [showAddControls, setShowAddControls] = useState(false)
  const [exporting, setExporting] = useState(false)

  const groupedControls = getGroupedControls()

  const handleExport = async () => {
    if (totalCount === 0) return

    setExporting(true)
    try {
      await exportCustomFrameworkToWord(
        frameworkName || 'Custom Compliance Framework',
        groupedControls,
        totalCount
      )
    } catch (error) {
      console.error('Error exporting to Word:', error)
      alert('Failed to export document. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  const handleClose = () => {
    setIsBuilderOpen(false)
    setShowAddControls(false)
  }

  const handleFrameworkSelect = (framework) => {
    // Set flag that we're adding from another framework
    setIsAddingFromFramework(true)

    // Close the modal
    setIsBuilderOpen(false)
    setShowAddControls(false)

    // Navigate to the framework controls page
    if (onNavigateToFramework) {
      onNavigateToFramework(framework)
    }
  }

  const handleAddControlsClick = () => {
    setShowAddControls(true)
  }

  const handleCancelAddControls = () => {
    setShowAddControls(false)
  }

  if (!isBuilderOpen) return null

  return (
    <div className="custom-framework-modal" onClick={handleClose}>
      <div className="custom-framework-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="builder-modal-header">
          <h2 className="builder-modal-title">Custom Framework Builder</h2>
          <button className="btn-close-modal" onClick={handleClose}>
            <Icon name="close" size="20px" />
          </button>
        </div>

        {/* Body */}
        <div className="builder-modal-body">
          {/* Framework Name Input */}
          <div className="framework-name-section">
            <label className="framework-name-label">Framework Name</label>
            <input
              type="text"
              className="framework-name-input"
              placeholder="Enter custom framework name..."
              value={frameworkName}
              onChange={(e) => setFrameworkName(e.target.value)}
            />
          </div>



          {/* Selected Controls Section */}
          <div className="selected-controls-section">
            <div className="section-header">
              <h3 className="section-title">Selected Controls</h3>
              <span className="section-count">{totalCount} total</span>
            </div>

            {totalCount === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <h4 className="empty-state-title">No Controls Selected</h4>
                <p className="empty-state-desc">
                  Start by selecting controls from a framework or add controls from other frameworks below.
                </p>
              </div>
            ) : (
              Object.entries(groupedControls).map(([fwId, { framework, controls }]) => (
                <div key={fwId} className="framework-group">
                  <div className="framework-group-header">
                    <div className="framework-group-info">
                      <div
                        className="framework-group-icon"
                        style={{ backgroundColor: framework.color }}
                      >
                        <Icon name="shield" size="20px" color="white" />
                      </div>
                      <div>
                        <div className="framework-group-name">{framework.name}</div>
                        <div className="framework-group-count">
                          {controls.length} control{controls.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="framework-controls-list">
                    {controls.map(control => (
                      <div key={`${fwId}-${control.id}`} className="selected-control-item">
                        <div className="selected-control-info">
                          <div className="selected-control-header">
                            <span className="selected-control-id">{control.id}</span>
                            <h5 className="selected-control-title">{control.title}</h5>
                          </div>
                          <p className="selected-control-category">{control.category}</p>
                        </div>
                        <button
                          className="btn-remove-control"
                          onClick={() => removeControl(control.id, fwId)}
                          title="Remove control"
                        >
                          <Icon name="close" size="16px" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Controls from Other Frameworks */}
          <div className="add-controls-section">
            {!showAddControls ? (
              <button
                className="btn-add-controls"
                onClick={handleAddControlsClick}
              >
                <Icon name="plus" size="20px" />
                Add Controls from Other Frameworks
              </button>
            ) : (
              <div className="framework-selector">
                <div className="framework-selector-header">
                  <h4 className="framework-selector-title">Select a Framework to Add Controls</h4>
                  <button className="btn-cancel-add" onClick={handleCancelAddControls}>
                    <Icon name="close" size="16px" />
                    Cancel
                  </button>
                </div>
                <p className="framework-selector-subtitle">
                  Click on a framework to navigate to its controls page and select additional controls.
                </p>
                <div className="framework-cards-grid">
                  {availableFrameworks.map(fw => (
                    <div
                      key={fw.id}
                      className="framework-selector-card"
                      onClick={() => handleFrameworkSelect(fw)}
                    >
                      <div
                        className="framework-selector-icon"
                        style={{ backgroundColor: fw.color }}
                      >
                        <Icon name="shield" size="24px" color="white" />
                      </div>
                      <div className="framework-selector-info">
                        <h5 className="framework-selector-name">{fw.name}</h5>
                        <p className="framework-selector-desc">{fw.description}</p>
                      </div>
                      <div className="framework-selector-arrow">
                        <Icon name="arrow-right" size="20px" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="builder-modal-footer">
          <button className="btn-secondary" onClick={clearAll}>
            Clear All
          </button>
          <button
            className="btn-export"
            onClick={handleExport}
            disabled={totalCount === 0 || exporting}
          >
            {exporting ? (
              <div className="export-loading">
                <div className="loading-spinner-small"></div>
                Exporting...
              </div>
            ) : (
              <>
                <Icon name="download" size="16px" />
                Export to Word
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}