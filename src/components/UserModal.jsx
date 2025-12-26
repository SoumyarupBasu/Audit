import React, { useState, useEffect } from 'react'
import Icon from './Icon'
import '../styles/editControlModal.css'
import '../styles/userModal.css'

/**
 * UserModal Component - Handles View, Create, and Edit modes
 * 
 * @param {string} mode - 'view' | 'create' | 'edit'
 * @param {Object} user - User data (for view/edit modes)
 * @param {Function} onSave - Save handler for create/edit
 * @param {Function} onClose - Close handler
 */
export default function UserModal({ mode = 'view', user = null, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user',
    isVerified: false,
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user && (mode === 'view' || mode === 'edit')) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'user',
        isVerified: user.isVerified || false,
        password: ''
      })
    }
  }, [user, mode])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (mode === 'create' && !formData.password) {
      newErrors.password = 'Password is required for new users'
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setSaving(true)
    try {
      const dataToSave = { ...formData }
      if (!dataToSave.password) {
        delete dataToSave.password
      }
      await onSave(dataToSave)
    } catch (error) {
      console.error('Error saving user:', error)
      setErrors({ submit: error.message || 'Failed to save user. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  const getTitle = () => {
    switch (mode) {
      case 'create': return 'Create New User'
      case 'edit': return 'Edit User'
      default: return 'User Details'
    }
  }

  const getIcon = () => {
    switch (mode) {
      case 'create': return 'plus'
      case 'edit': return 'edit'
      default: return 'user'
    }
  }

  const isReadOnly = mode === 'view'

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content user-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <Icon name={getIcon()} size="24px" color="var(--primary)" />
            <h2 className="modal-title">{getTitle()}</h2>
          </div>
          <button className="modal-close" onClick={onClose} title="Close">
            <Icon name="x" size="20px" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="user-name" className="form-label">
              Full Name {!isReadOnly && <span className="required">*</span>}
            </label>
            {isReadOnly ? (
              <div className="form-value">{formData.name || '-'}</div>
            ) : (
              <>
                <input
                  id="user-name"
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter full name"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="user-email" className="form-label">
              Email Address {!isReadOnly && <span className="required">*</span>}
            </label>
            {isReadOnly ? (
              <div className="form-value">{formData.email || '-'}</div>
            ) : (
              <>
                <input
                  id="user-email"
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="Enter email address"
                  disabled={mode === 'edit'}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </>
            )}
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="user-phone" className="form-label">Phone Number</label>
            {isReadOnly ? (
              <div className="form-value">{formData.phone || '-'}</div>
            ) : (
              <input
                id="user-phone"
                type="tel"
                className="form-input"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Enter phone number"
              />
            )}
          </div>

          {/* Role and Verification Status Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="user-role" className="form-label">Role</label>
              {isReadOnly ? (
                <div className="form-value">
                  <span className={`status-badge ${formData.role}`}>
                    {formData.role}
                  </span>
                </div>
              ) : (
                <select
                  id="user-role"
                  className="form-select"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="expert">Expert</option>
                  <option value="admin">Admin</option>
                </select>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="user-verified" className="form-label">Verification Status</label>
              {isReadOnly ? (
                <div className="form-value">
                  <span className={`status-badge ${formData.isVerified ? 'verified' : 'pending'}`}>
                    {formData.isVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              ) : (
                <div className="toggle-wrapper">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={formData.isVerified}
                      onChange={(e) => handleChange('isVerified', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                  <span className="toggle-label">
                    {formData.isVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Password Field (only for create/edit) */}
          {!isReadOnly && (
            <div className="form-group">
              <label htmlFor="user-password" className="form-label">
                {mode === 'create' ? 'Password' : 'New Password'}
                {mode === 'create' && <span className="required">*</span>}
              </label>
              <input
                id="user-password"
                type="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder={mode === 'create' ? 'Enter password' : 'Leave blank to keep current'}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
              {mode === 'edit' && (
                <span className="form-hint">Leave blank to keep the current password</span>
              )}
            </div>
          )}

          {/* View Mode: Additional Info */}
          {isReadOnly && user && (
            <div className="user-meta">
              <div className="meta-item">
                <Icon name="calendar" size="16px" />
                <span>Created: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</span>
              </div>
              <div className="meta-item">
                <Icon name="clock" size="16px" />
                <span>Last Updated: {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : '-'}</span>
              </div>
            </div>
          )}

          {errors.submit && (
            <div className="error-banner">
              <Icon name="alert-circle" size="20px" />
              <span>{errors.submit}</span>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              {isReadOnly ? 'Close' : 'Cancel'}
            </button>
            {!isReadOnly && (
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? (
                  <>
                    <span className="spinner-small"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Icon name="check" size="16px" />
                    {mode === 'create' ? 'Create User' : 'Save Changes'}
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
