import Icon from "../../../components/Icon";
import { formatDate } from "../../../utils/dateFormatter";
import "./styles/userViewModal.css";

/**
 * UserViewModal Component - Beautiful user details display
 *
 * @param {Object} user - User data object
 * @param {Function} onClose - Close modal handler
 * @param {Function} onEdit - Edit user handler (optional)
 */
export default function UserViewModal({ user, onClose, onEdit }) {
  if (!user) return null;

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "admin";
      case "expert":
        return "expert";
      case "user":
        return "user";
      default:
        return "user";
    }
  };

  const getStatusColor = (isVerified) => {
    return isVerified ? "verified" : "pending";
  };

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="user-view-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="user-view-header">
          <div className="header-content">
            <div className="user-avatar">
              <span className="avatar-text">{getInitials(user.name)}</span>
            </div>
            <div className="user-basic-info">
              <h2 className="user-name">{user.name}</h2>
              <p className="user-email">{user.email}</p>
              <div className="user-badges">
                <span className={`role-badge ${getRoleColor(user.role)}`}>
                  <Icon name="shield" size="12px" />
                  {user.role}
                </span>
                <span
                  className={`status-badge ${getStatusColor(
                    user.isEmailVerified
                  )}`}
                >
                  <Icon
                    name={user.isEmailVerified ? "check-circle" : "clock"}
                    size="12px"
                  />
                  {user.isEmailVerified ? "Verified" : "Pending"}
                </span>
              </div>
            </div>
          </div>
          <div className="header-actions">
            {onEdit && (
              <button
                className="action-btn edit-btn"
                onClick={() => onEdit(user)}
                title="Edit User"
              >
                <Icon name="edit" size="16px" />
              </button>
            )}
            <button
              className="action-btn close-btn"
              onClick={onClose}
              title="Close"
            >
              <Icon name="x" size="18px" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="user-view-content">
          {/* Contact Information */}
          <div className="info-section">
            <h3 className="section-title">
              <Icon name="user" size="16px" />
              Contact Information
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">
                  <Icon name="mail" size="14px" />
                  Email Address
                </div>
                <div className="info-value">
                  <a href={`mailto:${user.email}`} className="email-link">
                    {user.email}
                  </a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-label">
                  <Icon name="phone" size="14px" />
                  Phone Number
                </div>
                <div className="info-value">
                  {user.phone ? (
                    <a href={`tel:${user.phone}`} className="phone-link">
                      {user.phone}
                    </a>
                  ) : (
                    <span className="not-provided">Not provided</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="info-section">
            <h3 className="section-title">
              <Icon name="settings" size="16px" />
              Account Details
            </h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">
                  <Icon name="shield" size="14px" />
                  Role
                </div>
                <div className="info-value">
                  <span className={`role-badge ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-label">
                  <Icon name="check-circle" size="14px" />
                  Email Status
                </div>
                <div className="info-value">
                  <span
                    className={`status-badge ${getStatusColor(
                      user.isEmailVerified
                    )}`}
                  >
                    {user.isEmailVerified ? "Verified" : "Pending Verification"}
                  </span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-label">
                  <Icon name="hash" size="14px" />
                  User ID
                </div>
                <div className="info-value">
                  <div className="user-id-container">
                    <code className="user-id">{user.id}</code>
                    <button
                      className="copy-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(user.id);
                        // You can add toast notification here
                      }}
                      title="Copy User ID"
                    >
                      <Icon name="copy" size="12px" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="info-section">
            <h3 className="section-title">
              <Icon name="clock" size="16px" />
              Timeline
            </h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-icon created">
                  <Icon name="user-plus" size="12px" />
                </div>
                <div className="timeline-content">
                  <div className="timeline-title">Account Created</div>
                  <div className="timeline-date">
                    {formatDate(user.createdAt)}
                  </div>
                </div>
              </div>
              {user.updatedAt && user.updatedAt !== user.createdAt && (
                <div className="timeline-item">
                  <div className="timeline-icon updated">
                    <Icon name="edit" size="12px" />
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-title">Last Updated</div>
                    <div className="timeline-date">
                      {formatDate(user.updatedAt)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="user-view-footer">
          <div className="footer-info">
            <Icon name="info" size="14px" />
            <span>User information is automatically synced</span>
          </div>
          <div className="footer-actions">
            <button className="btn-secondary" onClick={onClose}>
              Close
            </button>
            {onEdit && (
              <button className="btn-primary" onClick={() => onEdit(user)}>
                <Icon name="edit" size="16px" />
                Edit User
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
