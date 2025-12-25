import React, { createContext, useContext, useState } from "react";

const CustomFrameworkContext = createContext();

export function useCustomFramework() {
  const context = useContext(CustomFrameworkContext);
  if (!context) {
    throw new Error(
      "useCustomFramework must be used within CustomFrameworkProvider"
    );
  }
  return context;
}

export function CustomFrameworkProvider({ children }) {
  const [selectedControls, setSelectedControls] = useState([]);
  const [frameworkName, setFrameworkName] = useState("");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isAddingFromFramework, setIsAddingFromFramework] = useState(false);

  // Add controls from a framework
  const addControls = (controls, frameworkInfo) => {
    const newControls = controls.map((control) => ({
      ...control,
      sourceFramework: {
        id: frameworkInfo.id,
        name: frameworkInfo.name,
        color: frameworkInfo.color,
      },
    }));

    // Filter out duplicates based on control ID and source framework
    setSelectedControls((prev) => {
      const existing = new Set(
        prev.map((c) => `${c.sourceFramework.id}-${c.id}`)
      );
      const filtered = newControls.filter(
        (c) => !existing.has(`${c.sourceFramework.id}-${c.id}`)
      );
      return [...prev, ...filtered];
    });
  };

  // Remove a specific control
  const removeControl = (controlId, frameworkId) => {
    setSelectedControls((prev) =>
      prev.filter(
        (c) => !(c.id === controlId && c.sourceFramework.id === frameworkId)
      )
    );
  };

  // Clear all selections
  const clearAll = () => {
    setSelectedControls([]);
    setFrameworkName("");
  };

  // Get controls grouped by framework
  const getGroupedControls = () => {
    const grouped = {};
    selectedControls.forEach((control) => {
      const fwId = control.sourceFramework.id;
      if (!grouped[fwId]) {
        grouped[fwId] = {
          framework: control.sourceFramework,
          controls: [],
        };
      }
      grouped[fwId].controls.push(control);
    });
    return grouped;
  };

  // Get controls count by framework
  const getControlsCountByFramework = () => {
    const counts = {};
    selectedControls.forEach((control) => {
      const fwId = control.sourceFramework.id;
      counts[fwId] = (counts[fwId] || 0) + 1;
    });
    return counts;
  };

  const value = {
    selectedControls,
    frameworkName,
    isBuilderOpen,
    isAddingFromFramework,
    setFrameworkName,
    setIsBuilderOpen,
    setIsAddingFromFramework,
    addControls,
    removeControl,
    clearAll,
    getGroupedControls,
    getControlsCountByFramework,
    totalCount: selectedControls.length,
  };

  return (
    <CustomFrameworkContext.Provider value={value}>
      {children}
    </CustomFrameworkContext.Provider>
  );
}
