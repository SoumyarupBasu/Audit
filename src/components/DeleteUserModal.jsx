import React, { useState } from 'react'
import Icon from './Icon'
import '../styles/editControlModal.css'
import '../styles/userModal.css'

/**
 * DeleteUserModal Component - Confirmation dialog for deleting a user
 * 
 * @param {Object} user - User to delete
 * @param {Function} onConfirm - Confirm delete handler
 * @param {Function} onCancel - Cancel handler
 */
export default function DeleteUserModal({ user, onConfirm, onCancel }) {
  const [deleting, setDeleting] = useState(false)

  const handleConfirm = async () => {
    setDeleting(true)
    try {
      await onConfirm()
    } catch (error) {
      console.error('Error deleting user:', error)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content delete-user-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-row">
            <Icon name="alert-triangle" size="24px" color="#ef4444" />
            <h2 className="modal-title">Delete User</h2>
          </div>
          <button className="modal-close" onClick={onCancel} title="Close">
            <Icon name="x" size="20px" />
          </button>
        </div>

        <div className="delete-user-content">
          <p className="delete-warning-text">
            Are you sure you want to delete this user? This action cannot be undone and will permanently remove all associated data.
          </p>

          <div className="user-preview">
            <div className="user-preview-header">
              <div className="user-avatar-preview">
                <Icon name="user" size="24px" />
              </div>
              <div className="user-preview-info">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="user-preview-badges">
              <span className={`status-badge ${user.role}`}>
                {user.role}
              </span>
              <span className={`status-badge ${user.isVerified ? 'verified' : 'pending'}`}>
                {user.isVerified ? 'Verified' : 'Pending'}
              </span>
            </div>
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
                Delete User
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

