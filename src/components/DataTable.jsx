import { useState, useMemo, useCallback, useEffect } from "react";
import Icon from "./Icon";
import "../styles/dataTable.css";

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Reusable DataTable Component
 * Features: sorting, pagination, search/filtering, loading states, empty states
 *
 * @param {Array} columns - Column configuration array [{key, label, sortable, render}]
 * @param {Array} data - Array of data objects
 * @param {Object} pagination - Pagination config {currentPage, totalPages, totalItems, limit, onPageChange}
 * @param {Function} onSearch - Search handler function
 * @param {boolean} loading - Loading state
 * @param {string} emptyMessage - Message to show when no data
 * @param {Function} renderActions - Function to render action buttons for each row
 * @param {string} searchPlaceholder - Placeholder text for search input
 */
export default function DataTable({
  columns = [],
  data = [],
  pagination = null,
  onSearch,
  loading = false,
  emptyMessage = "No data found",
  renderActions,
  searchPlaceholder = "Search...",
  onRefresh,
  searchTerm: externalSearchTerm = "",
  onClearSearch,
}) {
  const [searchTerm, setSearchTerm] = useState(externalSearchTerm);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [isSearching, setIsSearching] = useState(false);

  // Sync external search term with internal state
  useEffect(() => {
    setSearchTerm(externalSearchTerm);
    setIsSearching(false); // Reset searching state when external term changes
  }, [externalSearchTerm]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      if (onSearch) {
        setIsSearching(true);
        onSearch(searchValue);
      }
    }, 500), // 500ms delay
    [onSearch]
  );

  // Reset searching state when loading changes
  useEffect(() => {
    if (!loading) {
      setIsSearching(false);
    }
  }, [loading]);

  // Handle sorting
  const handleSort = (key) => {
    if (!columns.find((col) => col.key === key)?.sortable) return;

    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sort data locally if no server-side pagination
  const sortedData = useMemo(() => {
    if (!sortConfig.key || pagination) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig, pagination]);

  // Handle search with debouncing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Use debounced search instead of immediate API call
    debouncedSearch(value);
  };

  // Render sort indicator
  const renderSortIndicator = (column) => {
    if (!column.sortable) return null;

    if (sortConfig.key === column.key) {
      return (
        <span className="sort-indicator active">
          <Icon
            name={sortConfig.direction === "asc" ? "arrow-up" : "arrow-down"}
            size="12px"
          />
        </span>
      );
    }
    return (
      <span className="sort-indicator">
        <Icon name="arrow-up" size="12px" />
      </span>
    );
  };

  return (
    <div className="data-table-container">
      {/* Table Header with Search */}
      <div className="data-table-header">
        <div className="search-box">
          <Icon name="search" size="16px" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {isSearching && (
            <div className="search-loading">
              <div className="search-spinner"></div>
            </div>
          )}
          {searchTerm && !isSearching && (
            <button
              className="search-clear-btn"
              onClick={() => {
                setSearchTerm("");
                // Clear search should be immediate, not debounced
                if (onClearSearch) {
                  onClearSearch();
                } else if (onSearch) {
                  onSearch("");
                }
              }}
              title="Clear search"
            >
              <Icon name="x" size="14px" />
            </button>
          )}
        </div>
        <div className="table-actions">
          {onRefresh && (
            <button
              className="refresh-btn"
              onClick={onRefresh}
              disabled={loading}
            >
              <Icon name="refresh" size="16px" />
              Refresh
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className={column.sortable ? "sortable" : ""}
                >
                  <div className="th-content">
                    <span>{column.label}</span>
                    {renderSortIndicator(column)}
                  </div>
                </th>
              ))}
              {renderActions && <th className="actions-column">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (renderActions ? 1 : 0)}
                  className="loading-cell"
                >
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                  <span>Loading...</span>
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (renderActions ? 1 : 0)}
                  className="empty-cell"
                >
                  <div className="empty-state">
                    <Icon name="folder" size="48px" />
                    <p>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => (
                <tr key={row.id || index}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                  {renderActions && (
                    <td className="actions-cell">{renderActions(row)}</td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 0 && (
        <div className="data-table-pagination">
          <div className="pagination-info">
            Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
            {Math.min(
              pagination.currentPage * pagination.limit,
              pagination.totalItems
            )}{" "}
            of {pagination.totalItems} entries
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={() => pagination.onPageChange(1)}
              disabled={!pagination.hasPrevPage || loading}
              title="First page"
            >
              <Icon name="arrow-left" size="14px" />
              <Icon name="arrow-left" size="14px" />
            </button>
            <button
              className="pagination-btn"
              onClick={() =>
                pagination.onPageChange(pagination.currentPage - 1)
              }
              disabled={!pagination.hasPrevPage || loading}
              title="Previous page"
            >
              <Icon name="arrow-left" size="14px" />
            </button>

            <div className="page-numbers">
              {generatePageNumbers(
                pagination.currentPage,
                pagination.totalPages
              ).map((page, idx) =>
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className="page-ellipsis">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={`page-number ${
                      page === pagination.currentPage ? "active" : ""
                    }`}
                    onClick={() => pagination.onPageChange(page)}
                    disabled={loading}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              className="pagination-btn"
              onClick={() =>
                pagination.onPageChange(pagination.currentPage + 1)
              }
              disabled={!pagination.hasNextPage || loading}
              title="Next page"
            >
              <Icon name="arrow-right" size="14px" />
            </button>
            <button
              className="pagination-btn"
              onClick={() => pagination.onPageChange(pagination.totalPages)}
              disabled={!pagination.hasNextPage || loading}
              title="Last page"
            >
              <Icon name="arrow-right" size="14px" />
              <Icon name="arrow-right" size="14px" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to generate page numbers with ellipsis
function generatePageNumbers(currentPage, totalPages) {
  const pages = [];
  const delta = 2;

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > delta + 2) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - delta - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return pages;
}
