import { useState, useEffect } from "react";
import Icon from "./Icon";
import "../styles/editControlModal.css";
import "../styles/userModal.css";
import toast from "react-hot-toast";

/**
 * UserModal Component - Handles View, Create, and Edit modes
 *
 * @param {string} mode - 'view' | 'create' | 'edit'
 * @param {Object} user - User data (for view/edit modes)
 * @param {Function} onSave - Save handler for create/edit
 * @param {Function} onClose - Close handler
 */
export default function UserModal({
  mode = "view",
  user = null,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
  });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const isReadOnly = mode === "view";

  useEffect(() => {
    if (user && (mode === "view" || mode === "edit")) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "user",
      });
    }
  }, [user, mode]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);
    try {
      const response = await onSave(formData);
      // backend returns temp password on create
      if (mode === "create" && response?.user?.temporaryPassword) {
        setGeneratedPassword(response.user.temporaryPassword);
      } else {
        onClose();
      }
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error(error.message || "Failed to save user");
    } finally {
      setSaving(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "create":
        return "Create New User";
      case "edit":
        return "Edit User";
      default:
        return "User Details";
    }
  };

  const getIcon = () => {
    switch (mode) {
      case "create":
        return "plus";
      case "edit":
        return "edit";
      default:
        return "user";
    }
  };

  const copyPassword = async () => {
    await navigator.clipboard.writeText(generatedPassword);
    toast.success("Password copied to clipboard");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content user-modal"
        onClick={(e) => e.stopPropagation()}
      >
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
              <div className="form-value">{formData.name || "-"}</div>
            ) : (
              <>
                <input
                  id="user-name"
                  type="text"
                  className={`form-input ${errors.name ? "error" : ""}`}
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </>
            )}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="user-email" className="form-label">
              Email Address {!isReadOnly && <span className="required">*</span>}
            </label>
            {isReadOnly ? (
              <div className="form-value">{formData.email || "-"}</div>
            ) : (
              <>
                <input
                  id="user-email"
                  type="email"
                  className={`form-input ${errors.email ? "error" : ""}`}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter email address"
                  disabled={mode === "edit"}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </>
            )}
          </div>

          {/* Phone Field */}
          <div className="form-group">
            <label htmlFor="user-phone" className="form-label">
              Phone Number
            </label>
            {isReadOnly ? (
              <div className="form-value">{formData.phone || "-"}</div>
            ) : (
              <input
                id="user-phone"
                type="tel"
                className="form-input"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Enter phone number"
              />
            )}
          </div>

          {/* Role */}
          <div className="form-group">
            <label htmlFor="user-role" className="form-label">
              Role
            </label>
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
                onChange={(e) => handleChange("role", e.target.value)}
              >
                <option value="expert">Expert</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            )}
          </div>

          {/* GENERATED PASSWORD SECTION */}
          {generatedPassword && (
            <div className="generated-password-box">
              <p className="info-text">
                ⚠️ This password is auto-generated. Copy and share it securely.
              </p>
              <div className="password-row">
                <code>{generatedPassword}</code>
                <button type="button" onClick={copyPassword}>
                  <Icon name="copy" size="16px" />
                  Copy
                </button>
              </div>
            </div>
          )}

          {/* View Mode: Additional Info */}
          {isReadOnly && user && (
            <div className="user-meta">
              <div className="meta-item">
                <Icon name="calendar" size="16px" />
                <span>
                  Created:{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </span>
              </div>
              <div className="meta-item">
                <Icon name="clock" size="16px" />
                <span>
                  Last Updated:{" "}
                  {user.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString()
                    : "-"}
                </span>
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
              {isReadOnly ? "Close" : "Cancel"}
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
                    {mode === "create" ? "Create User" : "Save Changes"}
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
