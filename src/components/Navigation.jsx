import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Icon from "./Icon";
import "../styles/navigation.css";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navigationConfig = {
    admin: [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: "dashboard",
        path: "/dashboard",
        description: "Admin overview & analytics",
      },
      {
        id: "users",
        title: "User Management",
        icon: "user",
        path: "/users",
        description: "Manage users & roles",
      },
      {
        id: "reports",
        title: "Reports",
        icon: "chart",
        path: "/reports",
        description: "System-wide reports",
      },
      {
        id: "settings",
        title: "Settings",
        icon: "settings",
        path: "/settings",
        description: "Admin settings",
      },
    ],

    expert: [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: "dashboard",
        path: "/dashboard",
        description: "Overview and analytics",
      },
      {
        id: "documents",
        title: "Documents",
        icon: "document",
        description: "Document management",
        children: [
          {
            id: "upload",
            title: "Upload Document",
            icon: "upload",
            path: "/upload",
          },
          {
            id: "analyze",
            title: "Analyze Document",
            icon: "search",
            path: "/framework",
          },
        ],
      },
      {
        id: "frameworks",
        title: "Frameworks",
        icon: "shield",
        description: "Compliance frameworks",
        children: [
          {
            id: "upload-framework",
            title: "Upload Framework",
            icon: "upload",
            path: "/upload-framework",
          },
          {
            id: "browse-frameworks",
            title: "Browse Frameworks",
            icon: "book",
            path: "/framework",
          },
        ],
      },
      {
        id: "reports",
        title: "Reports",
        icon: "chart",
        path: "/reports",
        description: "Compliance reports",
      },
    ],

    user: [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: "dashboard",
        path: "/dashboard",
        description: "Your compliance overview",
      },
      {
        id: "documents",
        title: "My Documents",
        icon: "document",
        path: "/documents",
        description: "Uploaded documents",
      },
      {
        id: "reports",
        title: "My Reports",
        icon: "chart",
        path: "/my-reports",
        description: "Personal reports",
      },
      {
        id: "settings",
        title: "Profile Settings",
        icon: "settings",
        path: "/settings",
        description: "Update your profile",
      },
    ],
  };

  const role = user?.role || "expert";

  const menuItems = navigationConfig[role];

  function handleMenuClick(item) {
    if (item.children) {
      setActiveMenu(activeMenu === item.id ? null : item.id);
    } else {
      if (item.path === "/reports" || item.path === "/settings") {
        alert(`${item.title} page - Coming soon!`);
      } else {
        setIsOpen(false);
      }
    }
  }

  function handleSubMenuClick() {
    setIsOpen(false);
  }

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  function closeSidebar() {
    setIsOpen(false);
  }

  // Check if current path matches menu item
  function isActive(itemPath) {
    if (itemPath === "/dashboard") {
      return location.pathname === "/" || location.pathname === "/dashboard";
    }
    return location.pathname === itemPath;
  }

  return (
    <>
      {/* Hamburger Button - Hidden when sidebar is open */}
      {!isOpen && (
        <button
          className="hamburger"
          onClick={toggleSidebar}
          aria-label="Open navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      {/* Overlay */}
      {isOpen && <div className="nav-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <Icon name="shield" size="28px" />
            </div>
            <div className="logo-text">
              <div className="logo-title">CYPHER SENTINEL</div>
              <div className="logo-subtitle">AI Compliance Platform</div>
            </div>
          </div>
          <button
            className="close-btn"
            onClick={closeSidebar}
            aria-label="Close navigation"
          >
            <Icon name="close" size="20px" />
          </button>
        </div>

        <div className="sidebar-content">
          <div className="nav-menu">
            {menuItems.map((item) => (
              <div key={item.id} className="nav-item">
                {item.children ? (
                  <div
                    className={`nav-link ${
                      activeMenu === item.id ? "expanded" : ""
                    }`}
                    onClick={() => handleMenuClick(item)}
                  >
                    <div className="nav-icon">
                      <Icon name={item.icon} size="20px" />
                    </div>
                    <div className="nav-content">
                      <div className="nav-title">{item.title}</div>
                      <div className="nav-description">{item.description}</div>
                    </div>
                    <div className="nav-arrow">
                      <Icon
                        name={
                          activeMenu === item.id ? "arrow-down" : "arrow-right"
                        }
                        size="12px"
                      />
                    </div>
                  </div>
                ) : item.path === "/reports" || item.path === "/settings" ? (
                  <div
                    className={`nav-link ${
                      isActive(item.path) ? "active" : ""
                    }`}
                    onClick={() => handleMenuClick(item)}
                  >
                    <div className="nav-icon">
                      <Icon name={item.icon} size="20px" />
                    </div>
                    <div className="nav-content">
                      <div className="nav-title">{item.title}</div>
                      <div className="nav-description">{item.description}</div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-link ${
                      isActive(item.path) ? "active" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="nav-icon">
                      <Icon name={item.icon} size="20px" />
                    </div>
                    <div className="nav-content">
                      <div className="nav-title">{item.title}</div>
                      <div className="nav-description">{item.description}</div>
                    </div>
                  </Link>
                )}

                {item.children && activeMenu === item.id && (
                  <div className="nav-submenu">
                    {item.children.map((subItem) => (
                      <Link
                        key={subItem.id}
                        to={subItem.path}
                        className={`nav-sublink ${
                          isActive(subItem.path) ? "active" : ""
                        }`}
                        onClick={handleSubMenuClick}
                      >
                        <div className="nav-subicon">
                          <Icon name={subItem.icon} size="16px" />
                        </div>
                        <div className="nav-subtitle">{subItem.title}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            <div className="user-profile">
              <div className="user-avatar">
                <Icon name="user" size="20px" />
              </div>
              <div className="user-info">
                <div className="user-name">{user?.name || "Admin User"}</div>
                <div className="user-role">
                  {role === "admin"
                    ? "System Administrator"
                    : role === "expert"
                    ? "System Expert"
                    : "System User"}
                </div>
              </div>
              <div className="user-status">
                <div className="status-indicator"></div>
              </div>
            </div>

            <div className="sidebar-actions">
              <button
                className="action-btn theme-toggle"
                onClick={toggleTheme}
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                aria-label={`Switch to ${
                  theme === "light" ? "dark" : "light"
                } mode`}
              >
                <Icon name={theme === "light" ? "moon" : "sun"} size="18px" />
                <span className="action-label">Theme</span>
              </button>
              <button
                className="action-btn logout-btn"
                onClick={logout}
                title="Logout"
                aria-label="Logout"
              >
                <Icon name="logout" size="18px" />
                <span className="action-label">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
