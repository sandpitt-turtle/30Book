import { useContext } from "react";
import ThemeContext from "./ThemeContext";

function Footer() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <footer className="footer">
      <p>© 2025 BookBuddy.</p>
      
    
      <button onClick={toggleTheme} className="theme-toggle">
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </footer>
  );
}

export default Footer;
