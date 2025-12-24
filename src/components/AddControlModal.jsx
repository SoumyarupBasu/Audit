import React, { useState } from 'react'
import Icon from './Icon'
import '../styles/editControlModal.css'

export default function AddControlModal({ 
  frameworkId, 
  frameworkColor,
  categories,
  types,
  existingControlIds,
  onAdd, 
  onClose 
}) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    category: categories.length > 1 ? categories[1] : '',
    type: types.length > 1 ? types[1] : ''
  })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.id.trim()) {
      newErrors.id = 'Control ID is required'
    } else if (existingControlIds.includes(formData.id.trim())) {
      newErrors.id = 'Control ID already exists'
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Control title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Control description is required'
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required'
    }

    if (!formData.type.trim()) {
      newErrors.type = 'Type is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setSaving(true)
    try {
      await onAdd(formData)
    } catch (error) {
      console.error('Error adding control:', error)
      setErrors({ submit: 'Failed to add control. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content edit-control-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <Icon name="plus" size="24px" color={frameworkColor} />
            <h2 className="modal-title">Add New Control</h2>
          </div>
          <button className="modal-close" onClick={onClose} title="Close">
            <Icon name="x" size="20px" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-control-form">
          <div className="form-group">
            <label htmlFor="control-id" className="form-label">
              Control ID <span className="required">*</span>
            </label>
            <input
              id="control-id"
              type="text"
              className={`form-input ${errors.id ? 'error' : ''}`}
              value={formData.id}
              onChange={(e) => handleChange('id', e.target.value)}
              placeholder="e.g., A.5.1, ID.AM-1, SOX-302-1"
            />
            {errors.id && <span className="error-message">{errors.id}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="control-title" className="form-label">
              Control Title <span className="required">*</span>
            </label>
            <input
              id="control-title"
              type="text"
              className={`form-input ${errors.title ? 'error' : ''}`}
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter control title"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="control-description" className="form-label">
              Control Description <span className="required">*</span>
            </label>
            <textarea
              id="control-description"
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter detailed control description"
              rows="4"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="control-category" className="form-label">
                Category <span className="required">*</span>
              </label>
              <select
                id="control-category"
                className={`form-select ${errors.category ? 'error' : ''}`}
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option value="">Select category</option>
                {categories.filter(c => c !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <span className="error-message">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="control-type" className="form-label">
                Type <span className="required">*</span>
              </label>
              <select
                id="control-type"
                className={`form-select ${errors.type ? 'error' : ''}`}
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
              >
                <option value="">Select type</option>
                {types.filter(t => t !== 'all').map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.type && <span className="error-message">{errors.type}</span>}
            </div>
          </div>

          {errors.submit && (
            <div className="error-banner">
              <Icon name="alert-circle" size="20px" />
              <span>{errors.submit}</span>
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
              style={{ backgroundColor: frameworkColor }}
            >
              {saving ? (
                <>
                  <span className="spinner-small"></span>
                  Adding...
                </>
              ) : (
                <>
                  <Icon name="plus" size="16px" />
                  Add Control
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

