import React, { useState } from 'react'
import Icon from './Icon'
import '../styles/editControlModal.css'

export default function DeleteConfirmDialog({ 
  control, 
  frameworkColor,
  onConfirm, 
  onCancel 
}) {
  const [deleting, setDeleting] = useState(false)

  const handleConfirm = async () => {
    setDeleting(true)
    try {
      await onConfirm()
    } catch (error) {
      console.error('Error deleting control:', error)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content delete-confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <Icon name="alert-triangle" size="24px" color="#ef4444" />
            <h2 className="modal-title">Delete Control</h2>
          </div>
          <button className="modal-close" onClick={onCancel} title="Close">
            <Icon name="x" size="20px" />
          </button>
        </div>

        <div className="delete-confirm-content">
          <p className="delete-warning">
            Are you sure you want to delete this control? This action cannot be undone.
          </p>

          <div className="control-preview">
            <div className="control-preview-header">
              <div className="control-id-badge" style={{ borderColor: frameworkColor }}>
                {control.id}
              </div>
              <div className="control-type-badge">
                {control.type}
              </div>
            </div>
            <h4 className="control-preview-title">{control.title}</h4>
            <p className="control-preview-description">{control.description}</p>
          </div>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={handleConfirm}
            disabled={deleting}
          >
            {deleting ? (
              <>
                <span className="spinner-small"></span>
                Deleting...
              </>
            ) : (
              <>
                <Icon name="trash" size="16px" />
                Delete Control
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

