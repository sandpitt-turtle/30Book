
import React from "react";

function Footer({ onToggleTheme, darkMode }) {
  return (
    <footer>
      <p>Library App &copy; 2025</p>
      <button className="theme-toggle" onClick={onToggleTheme}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </footer>
  );
}

export default Footer;
