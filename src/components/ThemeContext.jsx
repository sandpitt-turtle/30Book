import { createContext, useState } from "react";
import PropTypes from "prop-types";

// ✅ Declare ThemeContext FIRST
export const ThemeContext = createContext();

// ✅ Then define the ThemeProvider
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ✅ Add PropTypes validation
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

