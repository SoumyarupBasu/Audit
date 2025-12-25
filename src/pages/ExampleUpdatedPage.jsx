// Example of how to update a page component to use contexts instead of props drilling

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useAppState } from "../context/AppStateContext";
import { useAppNavigation } from "../context/NavigationContext";

// BEFORE: Component with props drilling
// function OldComponent({
//   selectedFile,
//   onFileUpload,
//   theme,
//   onThemeToggle,
//   onLogout,
//   onNavigate
// }) {
//   // Component logic using props
// }

// AFTER: Clean component using contexts
function NewComponent() {
  // Get what you need from contexts
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { selectedFile, uploadFile } = useAppState();
  const { navigate } = useAppNavigation();

  // Local component state
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (file) => {
    uploadFile(file); // Updates global state
    navigate("/framework"); // Navigate to next step
  };

  const handleLogout = () => {
    logout(); // Handles auth logout and cleanup
  };

  return (
    <div>
      <h1>Clean Component</h1>
      <p>Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={handleLogout}>Logout</button>
      {selectedFile && <p>Selected: {selectedFile.name}</p>}
      <input
        type="file"
        onChange={(e) => handleFileUpload(e.target.files[0])}
      />
    </div>
  );
}

export default NewComponent;

// Benefits of this approach:
// 1. No props drilling - components get only what they need
// 2. Easier testing - mock contexts instead of passing many props
// 3. Better separation of concerns - each context handles specific domain
// 4. Cleaner component signatures - no long prop lists
// 5. Easier refactoring - change context implementation without touching components
