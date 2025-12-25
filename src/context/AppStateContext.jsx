import { createContext, useContext, useState } from "react";

const AppStateContext = createContext();

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }
  return context;
}

export function AppStateProvider({ children }) {
  // File and framework state
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [uploadedFrameworks, setUploadedFrameworks] = useState([]);
  const [currentUploadedFramework, setCurrentUploadedFramework] =
    useState(null);
  const [frameworkForControls, setFrameworkForControls] = useState(null);

  // Comparison state
  const [comparisonJobId, setComparisonJobId] = useState(null);
  const [comparisonFramework, setComparisonFramework] = useState(null);

  // UI state
  const [successMessage, setSuccessMessage] = useState("");

  // Actions
  const uploadFile = (file) => {
    setSelectedFile(file);
  };

  const selectFramework = (framework) => {
    setSelectedFramework(framework);
  };

  const uploadFramework = (frameworkData) => {
    setUploadedFrameworks((prev) => [...prev, frameworkData]);
    setCurrentUploadedFramework(frameworkData);
  };

  const setFrameworkForControlsView = (framework) => {
    setFrameworkForControls(framework);
  };

  const startComparison = (jobId, framework) => {
    setComparisonJobId(jobId);
    setComparisonFramework(framework);
  };

  const clearState = () => {
    setSelectedFile(null);
    setSelectedFramework(null);
    setSuccessMessage("");
  };

  const value = {
    // State
    selectedFile,
    selectedFramework,
    uploadedFrameworks,
    currentUploadedFramework,
    frameworkForControls,
    comparisonJobId,
    comparisonFramework,
    successMessage,

    // Setters (for direct access if needed)
    setSelectedFile,
    setSelectedFramework,
    setUploadedFrameworks,
    setCurrentUploadedFramework,
    setFrameworkForControls,
    setComparisonJobId,
    setComparisonFramework,
    setSuccessMessage,

    // Actions
    uploadFile,
    selectFramework,
    uploadFramework,
    setFrameworkForControlsView,
    startComparison,
    clearState,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}
