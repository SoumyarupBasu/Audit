import React, { useState, useEffect } from "react";
import Icon from "../../components/Icon";
import { useCustomFramework } from "../../context/CustomFrameworkContext";
import EditControlModal from "../../components/EditControlModal";
import AddControlModal from "../../components/AddControlModal";
import DeleteConfirmDialog from "../../components/DeleteConfirmDialog";
import "../../styles/frameworkControls.css";
import "../../styles/customFramework.css";

function Breadcrumbs({ onNavigate, frameworkName }) {
  return (
    <div className="crumbs">
      <span className="crumb-link" onClick={() => onNavigate("dashboard")}>
        Dashboard
      </span>
      <span className="sep">/</span>
      <span className="crumb-link" onClick={() => onNavigate("framework")}>
        Browse Frameworks
      </span>
      <span className="sep">/</span>
      <span className="muted">{frameworkName} Controls</span>
    </div>
  );
}

export default function FrameworkControls({ framework, onBack, onNavigate }) {
  const [controls, setControls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [localSelectedControls, setLocalSelectedControls] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [editingControl, setEditingControl] = useState(null);
  const [deletingControl, setDeletingControl] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    addControls,
    setIsBuilderOpen,
    isAddingFromFramework,
    setIsAddingFromFramework,
  } = useCustomFramework();

  useEffect(() => {
    loadControls();
  }, [framework]);

  async function loadControls() {
    setLoading(true);
    try {
      // Check if this is a custom AI-extracted framework
      if (framework.id?.startsWith("custom-") || framework.isAIExtracted) {
        // Load from API for custom frameworks
        const response = await fetch(
          `http://localhost:3001/api/custom-frameworks/${framework.id}/controls`
        );
        if (response.ok) {
          const data = await response.json();
          setControls(data.controls || []);
        } else {
          setControls([]);
        }
      } else {
        // List of supported predefined frameworks
        const supportedFrameworks = [
          "iso27001",
          "nist",
          "sox",
          "cis",
          "gdpr",
          "pci-dss",
          "ai-nlp",
        ];

        if (supportedFrameworks.includes(framework.id)) {
          // Always load controls from the API to ensure we get the latest data
          // This allows edit/delete operations to persist correctly
          const response = await fetch(
            `http://localhost:3001/api/frameworks/${framework.id}/controls`
          );
          if (response.ok) {
            const data = await response.json();
            setControls(data.controls || []);
          } else {
            setControls([]);
          }
        } else {
          // For other frameworks, show no controls available
          setControls([]);
        }
      }
    } catch (error) {
      console.error("Error loading controls:", error);
      setControls([]);
    } finally {
      setLoading(false);
    }
  }

  // Get unique categories and types
  const categories = ["all", ...new Set(controls.map((c) => c.category))];
  const types = ["all", ...new Set(controls.map((c) => c.type))];

  // Filter controls
  const filteredControls = controls.filter((control) => {
    const matchesSearch =
      control.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      control.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      control.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || control.category === selectedCategory;
    const matchesType = selectedType === "all" || control.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  // Group controls by category
  const groupedControls = filteredControls.reduce((acc, control) => {
    if (!acc[control.category]) {
      acc[control.category] = [];
    }
    acc[control.category].push(control);
    return acc;
  }, {});

  // Handle individual control selection
  const handleControlToggle = (controlId) => {
    setLocalSelectedControls((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(controlId)) {
        newSet.delete(controlId);
      } else {
        newSet.add(controlId);
      }
      return newSet;
    });
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setLocalSelectedControls(new Set());
      setSelectAll(false);
    } else {
      const allIds = new Set(filteredControls.map((c) => c.id));
      setLocalSelectedControls(allIds);
      setSelectAll(true);
    }
  };

  // Update select all state when selections change
  useEffect(() => {
    if (
      filteredControls.length > 0 &&
      localSelectedControls.size === filteredControls.length
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [localSelectedControls, filteredControls]);

  // Handle build custom framework
  const handleBuildCustomFramework = () => {
    const selectedControlsArray = controls.filter((c) =>
      localSelectedControls.has(c.id)
    );
    addControls(selectedControlsArray, framework);

    // Clear local selections after adding
    setLocalSelectedControls(new Set());
    setSelectAll(false);

    // If we're adding from another framework, just reopen the builder
    // Otherwise, open the builder for the first time
    setIsBuilderOpen(true);

    // Reset the flag
    if (isAddingFromFramework) {
      setIsAddingFromFramework(false);
    }
  };

  // Show success message temporarily
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Handle edit control
  const handleEditControl = async (updatedControl) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/frameworks/${framework.id}/controls/${editingControl.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedControl),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update control");
      }

      // Update local state
      setControls((prev) =>
        prev.map((c) => (c.id === editingControl.id ? updatedControl : c))
      );
      setEditingControl(null);
      showSuccess("Control updated successfully!");
    } catch (error) {
      console.error("Error updating control:", error);
      throw error;
    }
  };

  // Handle add control
  const handleAddControl = async (newControl) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/frameworks/${framework.id}/controls`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newControl),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add control");
      }

      // Update local state
      setControls((prev) => [...prev, newControl]);
      setShowAddModal(false);
      showSuccess("Control added successfully!");
    } catch (error) {
      console.error("Error adding control:", error);
      throw error;
    }
  };

  // Handle delete control
  const handleDeleteControl = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/frameworks/${framework.id}/controls/${deletingControl.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete control");
      }

      // Update local state
      setControls((prev) => prev.filter((c) => c.id !== deletingControl.id));
      setDeletingControl(null);
      showSuccess("Control deleted successfully!");
    } catch (error) {
      console.error("Error deleting control:", error);
      throw error;
    }
  };

  return (
    <div className="layout-single">
      <main className="content">
        <header className="page-head">
          <div className="container head-grid">
            <div className="page-title">
              <Icon
                name="shield"
                size="28px"
                style={{ marginRight: "12px", color: framework.color }}
              />
              {framework.name} Controls
            </div>
            <div className="page-actions">
              <button
                className="btn-add-control"
                onClick={() => setShowAddModal(true)}
              >
                <Icon name="plus" size="16px" />
                Add New Control
              </button>
              <button className="ghost" onClick={onBack}>
                <Icon name="arrow-left" size="16px" />
                BACK
              </button>
            </div>
            <Breadcrumbs
              onNavigate={onNavigate}
              frameworkName={framework.name}
            />
          </div>
        </header>

        <div className="container controls-container">
          {/* Framework Info Card */}
          <div className="framework-info-card">
            <div className="framework-info-header">
              <div
                className="framework-info-icon"
                style={{ backgroundColor: framework.color }}
              >
                <Icon name="shield" size="40px" color="white" />
              </div>
              <div className="framework-info-details">
                <h2 className="framework-info-name">{framework.name}</h2>
                <p className="framework-info-full-name">{framework.fullName}</p>
                <p className="framework-info-description">
                  {framework.description}
                </p>
              </div>
            </div>
            <div className="framework-info-stats">
              <div className="info-stat">
                <div className="stat-value">{controls.length}</div>
                <div className="stat-label">Total Controls</div>
              </div>
              <div className="info-stat">
                <div className="stat-value">{categories.length - 1}</div>
                <div className="stat-label">Categories</div>
              </div>
              <div className="info-stat">
                <div className="stat-value">{filteredControls.length}</div>
                <div className="stat-label">Filtered Results</div>
              </div>
            </div>
          </div>

          {/* Select All Section */}
          {!loading && controls.length > 0 && (
            <div className="select-all-section">
              <div className="select-all-left">
                <input
                  type="checkbox"
                  id="select-all"
                  className="select-all-checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <label htmlFor="select-all" className="select-all-label">
                  Select All Controls
                </label>
              </div>
              {localSelectedControls.size > 0 && (
                <div className="selection-counter">
                  {localSelectedControls.size} control
                  {localSelectedControls.size !== 1 ? "s" : ""} selected
                </div>
              )}
            </div>
          )}

          {/* Filters Section */}
          <div className="controls-filters">
            <div className="filter-search">
              <Icon name="search" size="18px" />
              <input
                type="text"
                placeholder="Search controls by ID, title, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchTerm("")}
                >
                  <Icon name="close" size="16px" />
                </button>
              )}
            </div>
            <div className="filter-dropdowns">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="filter-select"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading controls...</p>
            </div>
          )}

          {/* No Controls Message */}
          {!loading && controls.length === 0 && (
            <div className="no-controls">
              <Icon name="info" size="64px" />
              <h3>No Controls Available</h3>
              <p>
                Controls for this framework are not yet available in the system.
              </p>
            </div>
          )}

          {/* No Results Message */}
          {!loading && controls.length > 0 && filteredControls.length === 0 && (
            <div className="no-results">
              <Icon name="search" size="64px" />
              <h3>No Controls Found</h3>
              <p>
                No controls match your current filters. Try adjusting your
                search criteria.
              </p>
              <button
                className="btn-secondary"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedType("all");
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Controls List - Grouped by Category */}
          {!loading && filteredControls.length > 0 && (
            <div className="controls-list">
              {Object.entries(groupedControls).map(
                ([category, categoryControls]) => (
                  <div key={category} className="controls-category">
                    <div className="category-header">
                      <Icon name="folder" size="20px" />
                      <h3 className="category-title">{category}</h3>
                      <span className="category-count">
                        {categoryControls.length} controls
                      </span>
                    </div>
                    <div className="category-controls">
                      {categoryControls.map((control) => (
                        <div
                          key={control.id}
                          className={`control-card ${
                            localSelectedControls.has(control.id)
                              ? "selected"
                              : ""
                          }`}
                        >
                          <div className="control-checkbox-wrapper">
                            <input
                              type="checkbox"
                              className="control-checkbox"
                              checked={localSelectedControls.has(control.id)}
                              onChange={() => handleControlToggle(control.id)}
                            />
                          </div>
                          <div className="control-header">
                            <div
                              className="control-id-badge"
                              style={{ borderColor: framework.color }}
                            >
                              {control.id}
                            </div>
                            <div className="control-type-badge">
                              {control.type}
                            </div>
                          </div>
                          <h4 className="control-title">{control.title}</h4>
                          <p className="control-description">
                            {control.description}
                          </p>
                          <div className="control-actions">
                            <button
                              className="control-action-btn edit-btn"
                              onClick={() => setEditingControl(control)}
                              title="Edit control"
                            >
                              <Icon name="edit" size="16px" />
                              Edit
                            </button>
                            <button
                              className="control-action-btn delete-btn"
                              onClick={() => setDeletingControl(control)}
                              title="Delete control"
                            >
                              <Icon name="trash" size="16px" />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Build Custom Framework Button - Sticky */}
        {localSelectedControls.size > 0 && (
          <div className="build-framework-sticky">
            <button
              className="btn-build-framework"
              onClick={handleBuildCustomFramework}
            >
              <Icon name="plus" size="20px" />
              {isAddingFromFramework
                ? "Add to Custom Framework"
                : "Build Custom Framework"}
              <span className="build-count-badge">
                {localSelectedControls.size}
              </span>
            </button>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="success-banner">
            <Icon name="check-circle" size="20px" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Edit Control Modal */}
        {editingControl && (
          <EditControlModal
            control={editingControl}
            frameworkId={framework.id}
            frameworkColor={framework.color}
            categories={categories}
            types={types}
            onSave={handleEditControl}
            onClose={() => setEditingControl(null)}
          />
        )}

        {/* Add Control Modal */}
        {showAddModal && (
          <AddControlModal
            frameworkId={framework.id}
            frameworkColor={framework.color}
            categories={categories}
            types={types}
            existingControlIds={controls.map((c) => c.id)}
            onAdd={handleAddControl}
            onClose={() => setShowAddModal(false)}
          />
        )}

        {/* Delete Confirm Dialog */}
        {deletingControl && (
          <DeleteConfirmDialog
            control={deletingControl}
            frameworkColor={framework.color}
            onConfirm={handleDeleteControl}
            onCancel={() => setDeletingControl(null)}
          />
        )}
      </main>
    </div>
  );
}
