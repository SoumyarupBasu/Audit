import React, { useState, useEffect } from "react";
import Icon from "../../components/Icon";
import "../../styles/comparisonResults.css";

function ScoreBadge({ score }) {
  let className = "score-badge";
  if (score >= 90) className += " high";
  else if (score >= 70) className += " medium";
  else className += " low";

  return <span className={className}>{score}%</span>;
}

export default function ComparisonResults({
  jobId,
  framework,
  onNavigate,
  onBack,
}) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, high, medium, low
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("score"); // score, name

  useEffect(() => {
    if (jobId) {
      loadResults();
    }
  }, [jobId]);

  async function loadResults() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3001/api/compare/results/${jobId}`
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to load results");
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function getFilteredComparisons() {
    if (!results?.comparisons) return [];

    let filtered = [...results.comparisons];

    // Apply filter
    if (filter === "high") {
      filtered = filtered.filter((c) => c.similarityPercent >= 90);
    } else if (filter === "medium") {
      filtered = filtered.filter(
        (c) => c.similarityPercent >= 70 && c.similarityPercent < 90
      );
    } else if (filter === "low") {
      filtered = filtered.filter((c) => c.similarityPercent < 70);
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.clientControl.name?.toLowerCase().includes(term) ||
          c.clientControl.description?.toLowerCase().includes(term) ||
          c.frameworkControl.title?.toLowerCase().includes(term) ||
          c.frameworkControl.description?.toLowerCase().includes(term)
      );
    }

    // Apply sort
    if (sortBy === "score") {
      filtered.sort((a, b) => b.similarityPercent - a.similarityPercent);
    } else {
      filtered.sort((a, b) =>
        (a.clientControl.name || "").localeCompare(b.clientControl.name || "")
      );
    }

    return filtered;
  }

  function exportToCSV() {
    if (!results?.comparisons) return;

    const headers = [
      "Client Control",
      "Client Description",
      "Framework Control ID",
      "Framework Control",
      "Framework Description",
      "Similarity Score",
    ];
    const rows = results.comparisons.map((c) => [
      c.clientControl.name,
      c.clientControl.description,
      c.frameworkControl.id,
      c.frameworkControl.title,
      c.frameworkControl.description,
      `${c.similarityPercent}%`,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${(cell || "").replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `comparison-${results.frameworkId}-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="comparison-results-page">
        <div className="loading-container">
          <div className="loading-spinner large"></div>
          <p>Loading comparison results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="comparison-results-page">
        <div className="error-container">
          <Icon name="alert-circle" size="48px" />
          <h2>Error Loading Results</h2>
          <p>{error}</p>
          <button className="btn-primary" onClick={onBack}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const filteredComparisons = getFilteredComparisons();

  return (
    <div className="comparison-results-page">
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-icon doc">
            <Icon name="file-text" size="24px" />
          </div>
          <div className="card-content">
            <div className="card-value">
              {results?.totalDocumentControls || 0}
            </div>
            <div className="card-label">Document Controls</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="card-icon fw">
            <Icon name="shield" size="24px" />
          </div>
          <div className="card-content">
            <div className="card-value">
              {results?.totalFrameworkControls || 0}
            </div>
            <div className="card-label">Framework Controls</div>
          </div>
        </div>
        <div className="summary-card high">
          <div className="card-icon">
            <Icon name="check-circle" size="24px" />
          </div>
          <div className="card-content">
            <div className="card-value">{results?.summary?.highMatch || 0}</div>
            <div className="card-label">High Match (≥90%)</div>
          </div>
        </div>
        <div className="summary-card medium">
          <div className="card-icon">
            <Icon name="alert-circle" size="24px" />
          </div>
          <div className="card-content">
            <div className="card-value">
              {results?.summary?.mediumMatch || 0}
            </div>
            <div className="card-label">Medium Match (70-89%)</div>
          </div>
        </div>
        <div className="summary-card low">
          <div className="card-icon">
            <Icon name="x-circle" size="24px" />
          </div>
          <div className="card-content">
            <div className="card-value">{results?.summary?.lowMatch || 0}</div>
            <div className="card-label">Low Match (&lt;70%)</div>
          </div>
        </div>
        <div className="summary-card avg">
          <div className="card-icon">
            <Icon name="bar-chart-2" size="24px" />
          </div>
          <div className="card-content">
            <div className="card-value">
              {results?.summary?.averageScore || 0}%
            </div>
            <div className="card-label">Average Score</div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="results-toolbar">
        <div className="toolbar-left">
          <div className="filter-group">
            <button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All ({results?.comparisons?.length || 0})
            </button>
            <button
              className={`filter-btn high ${filter === "high" ? "active" : ""}`}
              onClick={() => setFilter("high")}
            >
              High ({results?.summary?.highMatch || 0})
            </button>
            <button
              className={`filter-btn medium ${
                filter === "medium" ? "active" : ""
              }`}
              onClick={() => setFilter("medium")}
            >
              Medium ({results?.summary?.mediumMatch || 0})
            </button>
            <button
              className={`filter-btn low ${filter === "low" ? "active" : ""}`}
              onClick={() => setFilter("low")}
            >
              Low ({results?.summary?.lowMatch || 0})
            </button>
          </div>
          <div className="search-box">
            <Icon name="search" size="16px" />
            <input
              type="text"
              placeholder="Search controls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="toolbar-right">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="score">Sort by Score</option>
            <option value="name">Sort by Name</option>
          </select>
          <button className="export-btn" onClick={exportToCSV}>
            <Icon name="download" size="16px" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="col-score">Score</th>
              <th className="col-client">Document Control</th>
              <th className="col-arrow"></th>
              <th className="col-framework">Framework Control</th>
            </tr>
          </thead>
          <tbody>
            {filteredComparisons.map((comp, idx) => (
              <tr
                key={idx}
                className={`match-${
                  comp.similarityPercent >= 90
                    ? "high"
                    : comp.similarityPercent >= 70
                    ? "medium"
                    : "low"
                }`}
              >
                <td className="col-score">
                  <ScoreBadge score={comp.similarityPercent} />
                </td>
                <td className="col-client">
                  <div className="control-card client">
                    <div className="control-name">
                      {comp.clientControl.name ||
                        comp.clientControl.id ||
                        "Unnamed Control"}
                    </div>
                    <div className="control-desc">
                      {comp.clientControl.description?.substring(0, 200)}
                      {comp.clientControl.description?.length > 200
                        ? "..."
                        : ""}
                    </div>
                  </div>
                </td>
                <td className="col-arrow">
                  <Icon name="arrow-right" size="20px" />
                </td>
                <td className="col-framework">
                  <div className="control-card framework">
                    <div className="control-id">{comp.frameworkControl.id}</div>
                    <div className="control-name">
                      {comp.frameworkControl.title}
                    </div>
                    <div className="control-desc">
                      {comp.frameworkControl.description?.substring(0, 200)}
                      {comp.frameworkControl.description?.length > 200
                        ? "..."
                        : ""}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredComparisons.length === 0 && (
          <div className="no-results">
            <Icon name="search" size="48px" />
            <p>No matching controls found</p>
          </div>
        )}
      </div>
    </div>
  );
}
