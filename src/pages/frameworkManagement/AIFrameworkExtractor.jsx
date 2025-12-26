import React, { useRef, useState, useEffect } from "react";
import Icon from "../../components/Icon";
import "../../styles/upload.css";
import "../../styles/framework-upload.css";

const API_BASE = "http://localhost:3001";

export default function AIFrameworkExtractor({
  onNavigate,
  onFrameworkCreated,
}) {
  const inputFileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [frameworkName, setFrameworkName] = useState("");
  const [frameworkVersion, setFrameworkVersion] = useState("1.0");
  const [isUploading, setIsUploading] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);
  const [error, setError] = useState(null);

  // Poll for job status
  useEffect(() => {
    if (!jobId) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`${API_BASE}/api/extract/status/${jobId}`);
        const status = await response.json();
        setJobStatus(status);

        if (status.status === "completed" || status.status === "failed") {
          clearInterval(pollInterval);
          setIsUploading(false);

          if (status.status === "completed" && onFrameworkCreated) {
            onFrameworkCreated({
              id: `custom-${jobId}`,
              name: status.frameworkName,
              controlCount: status.controlCount,
            });
          }
        }
      } catch (err) {
        console.error("Error polling status:", err);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [jobId, onFrameworkCreated]);

  function openFilePicker() {
    inputFileRef.current?.click();
  }

  function onFileChange(e) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setError(null);
      // Auto-populate framework name from filename
      if (!frameworkName) {
        const nameWithoutExt = f.name.replace(/\.[^/.]+$/, "");
        setFrameworkName(nameWithoutExt);
      }
    }
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    if (f) {
      setFile(f);
      setError(null);
      if (!frameworkName) {
        const nameWithoutExt = f.name.replace(/\.[^/.]+$/, "");
        setFrameworkName(nameWithoutExt);
      }
    }
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  async function handleExtract() {
    if (!file) {
      setError("Please select a document file");
      return;
    }
    if (!frameworkName.trim()) {
      setError("Please enter a framework name");
      return;
    }

    setIsUploading(true);
    setError(null);
    setJobStatus(null);

    try {
      const formData = new FormData();
      formData.append("document", file);
      formData.append("frameworkName", frameworkName);
      formData.append("frameworkVersion", frameworkVersion);

      const response = await fetch(`${API_BASE}/api/extract/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setJobId(result.jobId);
        setJobStatus({ status: "processing", progress: 0 });
      } else {
        setError(result.error || "Upload failed");
        setIsUploading(false);
      }
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
      setIsUploading(false);
    }
  }

  function handleReset() {
    setFile(null);
    setFrameworkName("");
    setFrameworkVersion("1.0");
    setJobId(null);
    setJobStatus(null);
    setError(null);
    setIsUploading(false);
  }

  const isCompleted = jobStatus?.status === "completed";
  const isFailed = jobStatus?.status === "failed";
  const isProcessing = jobStatus?.status === "processing";

  return (
    <div className="layout-single">
      <main className="content">
        <div className="container framework-container">
          <div
            className="framework-grid"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            {/* Status Card - Shows when extraction is in progress or complete */}
            {jobStatus && (
              <div className="section" style={{ marginBottom: "24px" }}>
                <div className="section-head">
                  <div
                    className="section-title"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {isProcessing && <span className="spinner">⏳</span>}
                    {isCompleted && <span style={{ color: "#10b981" }}>✓</span>}
                    {isFailed && <span style={{ color: "#ef4444" }}>✕</span>}
                    Extraction Status
                  </div>
                </div>
                <div className="section-body">
                  {isProcessing && (
                    <div>
                      <div
                        style={{
                          marginBottom: "12px",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Extracting controls from your document... This may take
                        a few minutes.
                      </div>
                      <div
                        style={{
                          background: "var(--bg-3)",
                          borderRadius: "8px",
                          overflow: "hidden",
                          height: "8px",
                        }}
                      >
                        <div
                          style={{
                            background:
                              "linear-gradient(90deg, #8b5cf6, #6366f1)",
                            height: "100%",
                            width: `${jobStatus.progress || 5}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "14px",
                          color: "var(--muted)",
                        }}
                      >
                        {jobStatus.progress || 0}% complete
                      </div>
                    </div>
                  )}
                  {isCompleted && (
                    <div style={{ textAlign: "center", padding: "24px" }}>
                      <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                        🎉
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: 600,
                          marginBottom: "8px",
                          color: "#10b981",
                        }}
                      >
                        Extraction Complete!
                      </div>
                      <div
                        style={{
                          color: "var(--text-secondary)",
                          marginBottom: "16px",
                        }}
                      >
                        Successfully extracted{" "}
                        <strong>{jobStatus.controlCount}</strong> controls from
                        your document.
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          className="btn-primary-large"
                          onClick={() => onNavigate("framework")}
                        >
                          View Framework
                        </button>
                        <button className="btn-secondary" onClick={handleReset}>
                          Extract Another
                        </button>
                      </div>
                    </div>
                  )}
                  {isFailed && (
                    <div style={{ textAlign: "center", padding: "24px" }}>
                      <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                        ❌
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: 600,
                          marginBottom: "8px",
                          color: "#ef4444",
                        }}
                      >
                        Extraction Failed
                      </div>
                      <div
                        style={{
                          color: "var(--text-secondary)",
                          marginBottom: "16px",
                        }}
                      >
                        {jobStatus.error || "An unknown error occurred"}
                      </div>
                      <button className="btn-secondary" onClick={handleReset}>
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Upload Form - Hide when processing or complete */}
            {!isProcessing && !isCompleted && (
              <>
                <div className="section">
                  <div className="section-head">
                    <div
                      className="section-title"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Icon name="upload" size="18px" />
                      Upload Compliance Document
                    </div>
                  </div>
                  <div className="section-body">
                    <div
                      className="upload-hint"
                      style={{ marginBottom: "16px" }}
                    >
                      <span className="hint-icon">
                        <Icon name="info" size="18px" />
                      </span>
                      <span>
                        Upload a compliance framework document and our AI will
                        automatically extract all controls.
                      </span>
                    </div>

                    <div
                      className={`dropzone-modern ${file ? "has-file" : ""}`}
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                      onClick={!file ? openFilePicker : undefined}
                      style={{ cursor: !file ? "pointer" : "default" }}
                    >
                      <input
                        type="file"
                        ref={inputFileRef}
                        onChange={onFileChange}
                        style={{ display: "none" }}
                        accept=".pdf,.doc,.docx,.xlsx,.xls,.txt"
                      />

                      {!file ? (
                        <>
                          <div className="drop-icon">
                            <Icon name="folder" size="64px" />
                          </div>
                          <div className="drop-title">
                            Drop your compliance document here
                          </div>
                          <div className="drop-subtitle">
                            or click to browse
                          </div>
                          <button
                            className="btn-upload"
                            type="button"
                            onClick={openFilePicker}
                          >
                            <Icon name="upload" size="18px" />
                            Choose File
                          </button>
                          <div className="drop-formats">
                            <span className="format-badge">PDF</span>
                            <span className="format-badge">DOCX</span>
                            <span className="format-badge">XLSX</span>
                            <span className="format-badge">TXT</span>
                            <span className="format-info">• Max 50MB</span>
                          </div>
                        </>
                      ) : (
                        <div className="file-preview">
                          <div className="file-icon">
                            <span style={{ fontSize: "48px" }}>📄</span>
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
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="section">
                  <div className="section-head">
                    <div
                      className="section-title"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Icon name="settings" size="18px" />
                      Framework Details
                    </div>
                  </div>
                  <div className="section-body">
                    <div className="form-grid">
                      <div className="field-modern full-width">
                        <label className="label-modern">
                          <span className="label-text">Framework Name</span>
                          <span className="label-required">*</span>
                        </label>
                        <input
                          className="input-modern"
                          value={frameworkName}
                          onChange={(e) => setFrameworkName(e.target.value)}
                          placeholder="e.g., Custom Security Framework, Industry Standard v2"
                        />
                      </div>
                      <div className="field-modern">
                        <label className="label-modern">
                          <span className="label-text">Version</span>
                        </label>
                        <input
                          className="input-modern"
                          value={frameworkVersion}
                          onChange={(e) => setFrameworkVersion(e.target.value)}
                          placeholder="1.0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: "8px",
                      color: "#ef4444",
                      marginBottom: "16px",
                    }}
                  >
                    {error}
                  </div>
                )}

                <div className="framework-actions">
                  <div className="actions-left">
                    <button
                      className="btn-secondary"
                      type="button"
                      onClick={() => onNavigate("framework")}
                    >
                      ← Back to Frameworks
                    </button>
                  </div>
                  <div className="actions-right">
                    <button
                      className="btn-primary-large"
                      type="button"
                      onClick={handleExtract}
                      disabled={isUploading || !file}
                      style={{ opacity: isUploading || !file ? 0.6 : 1 }}
                    >
                      {isUploading ? (
                        <>⏳ Uploading...</>
                      ) : (
                        <>🤖 Extract Controls with AI</>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
