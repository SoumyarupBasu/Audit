import React, { useRef, useState } from "react";
import Icon from "../components/Icon";
import "../styles/upload.css";
import "../styles/framework-upload.css";

function Section({ title, right, children }) {
  return (
    <div className="section">
      <div className="section-head">
        <div className="section-title">{title}</div>
        {right ? <div className="section-right">{right}</div> : null}
      </div>
      <div className="section-body">{children}</div>
    </div>
  );
}

export default function UploadFramework({ onFrameworkUpload, onNavigate }) {
  const inputFileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    fullName: "",
    category: "",
    description: "",
    icon: "◆",
    color: "#3b82f6",
    features: "",
    applicableIndustries: "",
    complianceLevel: "",
    regulatoryBody: "",
    geographicScope: "",
    lastUpdated: "",
    version: "",
    certificationRequired: false,
    implementationComplexity: 5,
    maintenanceEffort: 5,
    tags: "",
    notes: "",
  });
  const [sections, setSections] = useState([
    {
      id: "",
      title: "",
      description: "",
      requirements: [{ id: "", title: "", description: "" }],
    },
  ]);

  function openFilePicker() {
    inputFileRef.current?.click();
  }

  function onFileChange(e) {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addSection() {
    setSections([
      ...sections,
      {
        id: "",
        title: "",
        description: "",
        requirements: [{ id: "", title: "", description: "" }],
      },
    ]);
  }

  function removeSection(index) {
    if (sections.length > 1) {
      setSections(sections.filter((_, i) => i !== index));
    }
  }

  function updateSection(index, key, value) {
    const newSections = [...sections];
    newSections[index][key] = value;
    setSections(newSections);
  }

  function addRequirement(sectionIndex) {
    const newSections = [...sections];
    newSections[sectionIndex].requirements.push({
      id: "",
      title: "",
      description: "",
    });
    setSections(newSections);
  }

  function removeRequirement(sectionIndex, reqIndex) {
    const newSections = [...sections];
    if (newSections[sectionIndex].requirements.length > 1) {
      newSections[sectionIndex].requirements = newSections[
        sectionIndex
      ].requirements.filter((_, i) => i !== reqIndex);
      setSections(newSections);
    }
  }

  function updateRequirement(sectionIndex, reqIndex, key, value) {
    const newSections = [...sections];
    newSections[sectionIndex].requirements[reqIndex][key] = value;
    setSections(newSections);
  }

  function handleCancel() {
    setFile(null);
    setForm({
      name: "",
      fullName: "",
      category: "",
      description: "",
      icon: "◆",
      color: "#3b82f6",
      features: "",
      applicableIndustries: "",
      complianceLevel: "",
      regulatoryBody: "",
      geographicScope: "",
      lastUpdated: "",
      version: "",
      certificationRequired: false,
      implementationComplexity: 5,
      maintenanceEffort: 5,
      tags: "",
      notes: "",
    });
    setSections([
      {
        id: "",
        title: "",
        description: "",
        requirements: [{ id: "", title: "", description: "" }],
      },
    ]);
    alert("Cancelled");
  }

  function handleReset() {
    setFile(null);
    setForm({
      name: "",
      fullName: "",
      category: "",
      description: "",
      icon: "◆",
      color: "#3b82f6",
      features: "",
      applicableIndustries: "",
      complianceLevel: "",
      regulatoryBody: "",
      geographicScope: "",
      lastUpdated: "",
      version: "",
      certificationRequired: false,
      implementationComplexity: 5,
      maintenanceEffort: 5,
      tags: "",
      notes: "",
    });
    setSections([
      {
        id: "",
        title: "",
        description: "",
        requirements: [{ id: "", title: "", description: "" }],
      },
    ]);
  }

  function handleUpload() {
    if (!form.name) {
      alert("Please enter a framework name.");
      return;
    }
    if (!form.category) {
      alert("Please select a framework category.");
      return;
    }

    // Parse features from comma-separated string
    const featuresArray = form.features
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f);

    const frameworkData = {
      id: `custom-${Date.now()}`,
      name: form.name,
      fullName: form.fullName || form.name,
      description: form.description,
      icon: form.icon,
      color: form.color,
      features: featuresArray,
      category: form.category,
      sections: sections.filter((s) => s.id && s.title),
      metadata: {
        applicableIndustries: form.applicableIndustries,
        complianceLevel: form.complianceLevel,
        regulatoryBody: form.regulatoryBody,
        geographicScope: form.geographicScope,
        lastUpdated: form.lastUpdated,
        version: form.version,
        certificationRequired: form.certificationRequired,
        implementationComplexity: form.implementationComplexity,
        maintenanceEffort: form.maintenanceEffort,
        tags: form.tags,
        notes: form.notes,
      },
      file: file,
      isCustom: true,
      uploadedAt: new Date().toISOString(),
    };

    console.log("Uploading framework:", frameworkData);

    if (onFrameworkUpload) {
      onFrameworkUpload(frameworkData);
    } else {
      alert("Framework upload simulated. Check console for data.");
    }
  }

  return (
    <div className="layout-single">
      <main className="content">
        <div className="container framework-container">
          {/* Progress Steps */}
          <div className="progress-steps">
            <div className="step active">
              <div className="step-number">1</div>
              <div className="step-label">Basic Info</div>
            </div>
            <div className="step-line"></div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-label">Configuration</div>
            </div>
            <div className="step-line"></div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-label">Sections</div>
            </div>
            <div className="step-line"></div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-label">Review</div>
            </div>
          </div>

          <div className="framework-grid">
            {/* Left Column - Main Form */}
            <div className="framework-main">
              <Section
                title={
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Icon name="document" size="18px" />
                    Framework Documentation (Optional)
                  </span>
                }
              >
                <div className="upload-hint">
                  <span className="hint-icon">
                    <Icon name="info" size="18px" />
                  </span>
                  <span>
                    Upload supporting documentation to help define your
                    framework structure
                  </span>
                </div>

                <div
                  className={`dropzone-modern ${file ? "has-file" : ""}`}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                >
                  <input
                    type="file"
                    ref={inputFileRef}
                    onChange={onFileChange}
                    style={{ display: "none" }}
                    accept=".pdf,.doc,.docx"
                  />

                  {!file ? (
                    <>
                      <div className="drop-icon">
                        <Icon name="folder" size="64px" />
                      </div>
                      <div className="drop-title">Drop your file here</div>
                      <div className="drop-subtitle">or click to browse</div>
                      <button
                        className="btn-upload"
                        type="button"
                        onClick={openFilePicker}
                      >
                        <span className="btn-icon">
                          <span className="icon icon-upload"></span>
                        </span>
                        Choose File
                      </button>
                      <div className="drop-formats">
                        <span className="format-badge">PDF</span>
                        <span className="format-badge">DOC</span>
                        <span className="format-badge">DOCX</span>
                        <span className="format-info">• Max 50MB</span>
                      </div>
                    </>
                  ) : (
                    <div className="file-preview">
                      <div className="file-icon">
                        <span
                          className="icon icon-file"
                          style={{ fontSize: "48px" }}
                        ></span>
                      </div>
                      <div className="file-info">
                        <div className="file-name">{file.name}</div>
                        <div className="file-size">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                      <button
                        className="btn-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                      >
                        <span className="icon icon-close"></span>
                      </button>
                    </div>
                  )}
                </div>
              </Section>

              <Section
                title={
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span className="icon icon-info"></span>
                    Basic Information
                  </span>
                }
              >
                <div className="form-grid">
                  <div className="field-modern full-width">
                    <label className="label-modern">
                      <span className="label-text">Framework Name</span>
                      <span className="label-required">*</span>
                    </label>
                    <input
                      className="input-modern"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="e.g., ISO 27001, NIST CSF, Custom Security Framework"
                    />
                  </div>

                  <div className="field-modern">
                    <label className="label-modern">
                      <span className="label-text">Full Framework Name</span>
                    </label>
                    <input
                      className="input-modern"
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      placeholder="Information Security Management System"
                    />
                  </div>

                  <div className="field-modern">
                    <label className="label-modern">
                      <span className="label-text">Category</span>
                      <span className="label-required">*</span>
                    </label>
                    <select
                      className="input-modern"
                      value={form.category}
                      onChange={(e) => update("category", e.target.value)}
                    >
                      <option value="">Select a category...</option>
                      <option value="Information Security">
                        Information Security
                      </option>
                      <option value="Cybersecurity Framework">
                        Cybersecurity Framework
                      </option>
                      <option value="Security Controls">
                        Security Controls
                      </option>
                      <option value="Financial Compliance">
                        Financial Compliance
                      </option>
                      <option value="Data Privacy">Data Privacy</option>
                      <option value="Payment Security">Payment Security</option>
                      <option value="Healthcare Compliance">
                        Healthcare Compliance
                      </option>
                      <option value="Industry Standard">
                        Industry Standard
                      </option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>

                  <div className="field-modern full-width">
                    <label className="label-modern">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea
                      className="input-modern textarea-modern"
                      rows={4}
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="Provide a comprehensive description of the framework's purpose, scope, and key objectives..."
                    />
                  </div>

                  <div className="field-modern">
                    <label className="label-modern">
                      <span className="label-text">Icon Class</span>
                    </label>
                    <div className="icon-picker">
                      <input
                        className="input-modern icon-input"
                        value={form.icon}
                        onChange={(e) => update("icon", e.target.value)}
                        placeholder="◆"
                      />
                      <div
                        className="icon-preview"
                        style={{ background: form.color }}
                      >
                        <span style={{ fontSize: "24px", color: "white" }}>
                          {form.icon || "◆"}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--muted)",
                        marginTop: "4px",
                      }}
                    >
                      Available: ◆ (shield), ▭ (document), ◫ (chart), ◉
                      (settings), ✓ (check), ▲ (warning), ◷ (clock)
                    </div>
                  </div>

                  <div className="field-modern">
                    <label className="label-modern">
                      <span className="label-text">Color Theme</span>
                    </label>
                    <div className="color-picker">
                      <input
                        className="input-modern color-input"
                        type="color"
                        value={form.color}
                        onChange={(e) => update("color", e.target.value)}
                      />
                      <span className="color-value">{form.color}</span>
                    </div>
                  </div>

                  <div className="field-modern">
                    <label className="label-modern">
                      <span className="label-text">Version</span>
                    </label>
                    <input
                      className="input-modern"
                      value={form.version}
                      onChange={(e) => update("version", e.target.value)}
                      placeholder="e.g., 2.0, 2023"
                    />
                  </div>

                  <div className="field-modern full-width">
                    <label className="label-modern">
                      <span className="label-text">Key Features</span>
                      <span className="label-hint">Separate with commas</span>
                    </label>
                    <input
                      className="input-modern"
                      value={form.features}
                      onChange={(e) => update("features", e.target.value)}
                      placeholder="Risk Management, Security Controls, Compliance Monitoring, Audit Support"
                    />
                    {form.features && (
                      <div className="feature-tags">
                        {form.features.split(",").map(
                          (f, i) =>
                            f.trim() && (
                              <span key={i} className="feature-tag">
                                {f.trim()}
                              </span>
                            )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Section>

              <Section title="⚙️ Configuration & Metadata">
                <div className="form-grid">
                  <div className="field-modern">
                    <label className="label-modern">
                      <span className="label-text">Applicable Industries</span>
                    </label>
                    <input
                      className="input-modern"
                      value={form.applicableIndustries}
                      onChange={(e) =>
                        update("applicableIndustries", e.target.value)
                      }
                      placeholder="Finance, Healthcare, Technology"
                    />
                  </div>

                  <div className="field-modern">
                    <label className="label-modern">
                      <span className="label-text">Regulatory Body</span>
                    </label>
                    <input
                      className="input-modern"
                      value={form.regulatoryBody}
                      onChange={(e) => update("regulatoryBody", e.target.value)}
                      placeholder="ISO, NIST, PCI SSC"
                    />
                  </div>

                  <div className="field-modern">
                    <label className="label-modern">
                      <span className="label-text">Compliance Level</span>
                    </label>
                    <select
                      className="input-modern"
                      value={form.complianceLevel}
                      onChange={(e) =>
                        update("complianceLevel", e.target.value)
                      }
                    >
                      <option value="">Select level...</option>
                      <option value="Mandatory">🔴 Mandatory</option>
                      <option value="Recommended">🟡 Recommended</option>
                      <option value="Optional">🟢 Optional</option>
                    </select>
                  </div>

                  <div className="field-modern">
                    <label className="label-modern">
                      <span className="label-text">Geographic Scope</span>
                    </label>
                    <input
                      className="input-modern"
                      value={form.geographicScope}
                      onChange={(e) =>
                        update("geographicScope", e.target.value)
                      }
                      placeholder="Global, EU, US, APAC"
                    />
                  </div>

                  <div className="field-modern">
                    <label className="label-modern">
                      <span className="label-text">Last Updated</span>
                    </label>
                    <input
                      className="input-modern"
                      type="date"
                      value={form.lastUpdated}
                      onChange={(e) => update("lastUpdated", e.target.value)}
                    />
                  </div>

                  <div className="field-modern">
                    <label className="label-modern">
                      <span className="label-text">Tags</span>
                      <span className="label-hint">Comma-separated</span>
                    </label>
                    <input
                      className="input-modern"
                      value={form.tags}
                      onChange={(e) => update("tags", e.target.value)}
                      placeholder="security, compliance, audit, risk"
                    />
                  </div>

                  <div className="field-modern full-width">
                    <label className="label-modern">
                      <span className="label-text">
                        Implementation Complexity
                      </span>
                      <span className="label-value">
                        Level {form.implementationComplexity}/10
                      </span>
                    </label>
                    <input
                      className="slider-modern"
                      type="range"
                      min="1"
                      max="10"
                      value={form.implementationComplexity}
                      onChange={(e) =>
                        update(
                          "implementationComplexity",
                          parseFloat(e.target.value)
                        )
                      }
                    />
                    <div className="slider-labels">
                      <span>Simple</span>
                      <span>Complex</span>
                    </div>
                  </div>

                  <div className="field-modern full-width">
                    <label className="label-modern">
                      <span className="label-text">Maintenance Effort</span>
                      <span className="label-value">
                        Level {form.maintenanceEffort}/10
                      </span>
                    </label>
                    <input
                      className="slider-modern"
                      type="range"
                      min="1"
                      max="10"
                      value={form.maintenanceEffort}
                      onChange={(e) =>
                        update("maintenanceEffort", parseFloat(e.target.value))
                      }
                    />
                    <div className="slider-labels">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>

                  <div className="field-modern full-width">
                    <label className="checkbox-modern">
                      <input
                        type="checkbox"
                        checked={form.certificationRequired}
                        onChange={(e) =>
                          update("certificationRequired", e.target.checked)
                        }
                      />
                      <span className="checkbox-box"></span>
                      <span className="checkbox-label">
                        Certification Required
                      </span>
                    </label>
                  </div>

                  <div className="field-modern full-width">
                    <label className="label-modern">
                      <span className="label-text">Additional Notes</span>
                    </label>
                    <textarea
                      className="input-modern textarea-modern"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="Any additional information, special requirements, or implementation notes..."
                    />
                  </div>
                </div>
              </Section>
            </div>

            {/* Right Column - Sidebar */}
            <div className="framework-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-header">
                  <Icon name="chart" size="20px" />
                  <span className="sidebar-title">Framework Preview</span>
                </div>
                <div className="sidebar-body">
                  <div className="preview-framework">
                    <div
                      className="preview-icon"
                      style={{ background: form.color }}
                    >
                      <span style={{ fontSize: "32px", color: "white" }}>
                        {form.icon || "◆"}
                      </span>
                    </div>
                    <div className="preview-name">
                      {form.name || "Framework Name"}
                    </div>
                    <div className="preview-category">
                      {form.category || "Category"}
                    </div>
                    {form.version && (
                      <div className="preview-version">v{form.version}</div>
                    )}
                  </div>

                  {form.features && (
                    <div className="preview-section">
                      <div className="preview-label">Features</div>
                      <div className="preview-features">
                        {form.features
                          .split(",")
                          .slice(0, 3)
                          .map(
                            (f, i) =>
                              f.trim() && (
                                <div key={i} className="preview-feature">
                                  ✓ {f.trim()}
                                </div>
                              )
                          )}
                      </div>
                    </div>
                  )}

                  <div className="preview-section">
                    <div className="preview-label">Progress</div>
                    <div className="preview-stats">
                      <div className="preview-stat">
                        <div className="stat-value">{sections.length}</div>
                        <div className="stat-label">Sections</div>
                      </div>
                      <div className="preview-stat">
                        <div className="stat-value">
                          {sections.reduce(
                            (sum, s) => sum + s.requirements.length,
                            0
                          )}
                        </div>
                        <div className="stat-label">Requirements</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sidebar-card">
                <div className="sidebar-header">
                  <Icon name="lightbulb" size="20px" />
                  <span className="sidebar-title">Quick Tips</span>
                </div>
                <div className="sidebar-body">
                  <div className="tip-item">
                    <div className="tip-icon">✓</div>
                    <div className="tip-text">
                      Use clear, descriptive names for better organization
                    </div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">✓</div>
                    <div className="tip-text">
                      Add detailed requirements for accurate compliance tracking
                    </div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">✓</div>
                    <div className="tip-text">
                      Group related requirements into logical sections
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Section
              title={
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span style={{ fontSize: "18px" }}>▭</span>
                  Framework Sections & Requirements (Optional)
                </span>
              }
            >
              <div className="hint">
                Define the sections and requirements of your framework. Each
                section can have multiple requirements.
              </div>

              {sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  style={{
                    background: "var(--bg-2)",
                    border: "1px solid var(--line)",
                    borderRadius: "12px",
                    padding: "16px",
                    marginTop: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <h4
                      style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}
                    >
                      Section {sectionIndex + 1}
                    </h4>
                    {sections.length > 1 && (
                      <button
                        className="ghost"
                        type="button"
                        onClick={() => removeSection(sectionIndex)}
                        style={{ padding: "6px 12px", fontSize: "12px" }}
                      >
                        Remove Section
                      </button>
                    )}
                  </div>

                  <div className="grid3" style={{ marginBottom: "12px" }}>
                    <div className="field">
                      <label>Section ID</label>
                      <input
                        className="input"
                        value={section.id}
                        onChange={(e) =>
                          updateSection(sectionIndex, "id", e.target.value)
                        }
                        placeholder="e.g., A.5, Section 1"
                      />
                    </div>
                    <div className="field" style={{ gridColumn: "span 2" }}>
                      <label>Section Title</label>
                      <input
                        className="input"
                        value={section.title}
                        onChange={(e) =>
                          updateSection(sectionIndex, "title", e.target.value)
                        }
                        placeholder="e.g., Information Security Policies"
                      />
                    </div>
                  </div>

                  <div className="field" style={{ marginBottom: "16px" }}>
                    <label>Section Description</label>
                    <textarea
                      className="input"
                      rows={2}
                      value={section.description}
                      onChange={(e) =>
                        updateSection(
                          sectionIndex,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Brief description of this section"
                    />
                  </div>

                  <div
                    style={{
                      borderTop: "1px dashed var(--line)",
                      paddingTop: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <h5
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--muted)",
                        }}
                      >
                        Requirements
                      </h5>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => addRequirement(sectionIndex)}
                        style={{ padding: "6px 12px", fontSize: "12px" }}
                      >
                        + Add Requirement
                      </button>
                    </div>

                    {section.requirements.map((requirement, reqIndex) => (
                      <div
                        key={reqIndex}
                        style={{
                          background: "var(--bg-3)",
                          border: "1px solid var(--line)",
                          borderRadius: "8px",
                          padding: "12px",
                          marginBottom: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "8px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "var(--muted)",
                            }}
                          >
                            Requirement {reqIndex + 1}
                          </span>
                          {section.requirements.length > 1 && (
                            <button
                              className="ghost"
                              type="button"
                              onClick={() =>
                                removeRequirement(sectionIndex, reqIndex)
                              }
                              style={{ padding: "4px 8px", fontSize: "11px" }}
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="grid3" style={{ marginBottom: "8px" }}>
                          <div className="field">
                            <label style={{ fontSize: "12px" }}>
                              Requirement ID
                            </label>
                            <input
                              className="input"
                              value={requirement.id}
                              onChange={(e) =>
                                updateRequirement(
                                  sectionIndex,
                                  reqIndex,
                                  "id",
                                  e.target.value
                                )
                              }
                              placeholder="e.g., A.5.1"
                              style={{ fontSize: "13px", padding: "8px 10px" }}
                            />
                          </div>
                          <div
                            className="field"
                            style={{ gridColumn: "span 2" }}
                          >
                            <label style={{ fontSize: "12px" }}>
                              Requirement Title
                            </label>
                            <input
                              className="input"
                              value={requirement.title}
                              onChange={(e) =>
                                updateRequirement(
                                  sectionIndex,
                                  reqIndex,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="e.g., Management direction for information security"
                              style={{ fontSize: "13px", padding: "8px 10px" }}
                            />
                          </div>
                        </div>

                        <div className="field">
                          <label style={{ fontSize: "12px" }}>
                            Requirement Description
                          </label>
                          <textarea
                            className="input"
                            rows={2}
                            value={requirement.description}
                            onChange={(e) =>
                              updateRequirement(
                                sectionIndex,
                                reqIndex,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Detailed description of this requirement"
                            style={{ fontSize: "13px", padding: "8px 10px" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ marginTop: "16px" }}>
                <button className="btn" type="button" onClick={addSection}>
                  + Add Section
                </button>
              </div>
            </Section>

            {/* Action Buttons */}
            <div className="framework-actions">
              <div className="actions-left">
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={handleReset}
                >
                  <span className="btn-icon">↻</span>
                  Reset Form
                </button>
              </div>
              <div className="actions-right">
                <button
                  className="btn-cancel"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary-large"
                  type="button"
                  onClick={handleUpload}
                >
                  <span className="btn-icon">▲</span>
                  Upload Framework
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
