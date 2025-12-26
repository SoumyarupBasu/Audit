import { useNavigate } from "react-router-dom";
import Icon from "./Icon";

function Header({ title, breadcrumbs = [], actions = [] }) {
  const navigate = useNavigate();

  function openAI() {
    alert("AI Assistant coming soon");
  }

  function openSettings() {
    alert("Settings coming soon");
  }

  function refreshPage() {
    window.location.reload();
  }

  // Default actions that appear on all pages
  const defaultActions = [
    {
      id: "ai",
      label: "AI ASSISTANT",
      onClick: openAI,
      className: "ghost",
    },
    {
      id: "settings",
      label: "⚙",
      onClick: openSettings,
      className: "ghost",
    },
    {
      id: "refresh",
      label: "↻",
      onClick: refreshPage,
      className: "ghost",
    },
  ];

  // Combine custom actions with default actions
  const allActions = [...actions, ...defaultActions];

  return (
    <header className="page-head">
      <div className="container head-grid">
        <div className="page-title">{title}</div>
        <div className="page-actions">
          {allActions.map((action) => (
            <button
              key={action.id}
              className={action.className || "ghost"}
              onClick={action.onClick}
              title={action.title}
              style={action.style}
            >
              {action.icon && <Icon name={action.icon} size="16px" />}
              {action.label}
            </button>
          ))}
        </div>
        {breadcrumbs.length > 0 && (
          <div className="crumbs">
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {crumb.path ? (
                  <span
                    className="crumb-link"
                    onClick={() => navigate(crumb.path)}
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <span className={crumb.active ? "muted" : "crumb-link"}>
                    {crumb.label}
                  </span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="sep">/</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
