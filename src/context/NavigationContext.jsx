import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const NavigationContext = createContext();

export function useAppNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useAppNavigation must be used within NavigationProvider");
  }
  return context;
}

export function NavigationProvider({ children }) {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  const navigateWithState = (path, state = {}) => {
    navigate(path, { state });
  };

  const goBack = () => {
    navigate(-1);
  };

  const value = {
    navigate: navigateTo,
    navigateWithState,
    goBack,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
