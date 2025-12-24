import React, { useState, useEffect } from 'react'
import Icon from './Icon'
import '../styles/editControlModal.css'

export default function FrameworkSelectModal({ 
  isOpen,
  onClose,
  onSelect,
  title = "Select Framework for Comparison"
}) {
  const [frameworks, setFrameworks] = useState({ predefined: [], custom: [] })
  const [loading, setLoading] = useState(true)
  const [selectedFramework, setSelectedFramework] = useState(null)
  const [activeTab, setActiveTab] = useState('predefined')

  useEffect(() => {
    if (isOpen) {
      loadFrameworks()
    }
  }, [isOpen])

  async function loadFrameworks() {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/compare/frameworks')
      if (response.ok) {
        const data = await response.json()
        setFrameworks(data)
      }
    } catch (error) {
      console.error('Error loading frameworks:', error)
    } finally {
      setLoading(false)
    }
  }

  function handleSelect() {
    if (selectedFramework) {
      onSelect(selectedFramework)
      onClose()
    }
  }

  if (!isOpen) return null

  const currentFrameworks = activeTab === 'predefined' 
    ? frameworks.predefined 
    : frameworks.custom

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content framework-select-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <Icon name="git-compare" size="24px" color="#3b82f6" />
            <h2 className="modal-title">{title}</h2>
          </div>
          <button className="modal-close" onClick={onClose} title="Close">
            <Icon name="x" size="20px" />
          </button>
        </div>

        <div className="framework-select-content">
          {/* Tab buttons */}
          <div className="framework-tabs">
            <button 
              className={`tab-btn ${activeTab === 'predefined' ? 'active' : ''}`}
              onClick={() => setActiveTab('predefined')}
            >
              <Icon name="shield" size="16px" />
              Predefined Frameworks
              <span className="tab-count">{frameworks.predefined.length}</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
              onClick={() => setActiveTab('custom')}
            >
              <Icon name="folder" size="16px" />
              Custom Frameworks
              <span className="tab-count">{frameworks.custom.length}</span>
            </button>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="framework-loading">
              <div className="loading-spinner"></div>
              <p>Loading frameworks...</p>
            </div>
          )}

          {/* Framework list */}
          {!loading && (
            <div className="framework-list">
              {currentFrameworks.length === 0 ? (
                <div className="no-frameworks">
                  <Icon name="info" size="48px" />
                  <p>No {activeTab} frameworks available</p>
                </div>
              ) : (
                currentFrameworks.map(fw => (
                  <div 
                    key={fw.id}
                    className={`framework-option ${selectedFramework?.id === fw.id ? 'selected' : ''}`}
                    onClick={() => setSelectedFramework(fw)}
                  >
                    <div className="framework-option-icon" style={{ backgroundColor: fw.color }}>
                      <span>{fw.icon}</span>
                    </div>
                    <div className="framework-option-info">
                      <div className="framework-option-name">{fw.name}</div>
                      <div className="framework-option-fullname">{fw.fullName}</div>
                    </div>
                    {selectedFramework?.id === fw.id && (
                      <div className="framework-option-check">
                        <Icon name="check-circle" size="24px" color="#10b981" />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            type="button" 
            className="btn-primary"
            onClick={handleSelect}
            disabled={!selectedFramework}
            style={{ backgroundColor: selectedFramework?.color || '#3b82f6' }}
          >
            <Icon name="git-compare" size="16px" />
            Compare with {selectedFramework?.name || 'Framework'}
          </button>
        </div>
      </div>
    </div>
  )
}

