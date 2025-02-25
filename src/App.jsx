import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer"; // Import Footer
import Books from "./components/AllBooks";
import Login from "./components/Login";
import Register from "./components/Register";
import SingleBook from "./components/SingleBook"; 
import Account from "./components/Account"; 

import './App.css';
import './index.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark theme
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Apply dark mode to body when theme changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="app-container">  
        <Navigation onToggleTheme={toggleTheme} darkMode={darkMode} />
        
        <main> 
          <Routes>
            <Route path="/" element={<Books />} />  
            <Route path="/books" element={<Books />} />
            <Route path="/books/:bookId" element={<SingleBook />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route path="/account" element={<Account setToken={setToken}/> } />
          </Routes>
        </main>
        
        <Footer onToggleTheme={toggleTheme} darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;
