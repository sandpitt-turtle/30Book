import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import profilePic from '../assets/default-profile.png';

function Navigation() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {

      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/books" className="small-link">Books</Link>
      </div>

      <div className="nav-list">
        <div className="account-container">
          <div className="login-register">
            <Link to="/register" className="small-link">Register</Link>
            <Link to="/login" className="small-link">Login</Link>
          </div>
          <Link to="/account">
            <img src={profilePic} alt="Profile" className="profile-pic" />
          </Link>
          <Link to="/account" className="account-link">Account</Link>
        </div>
  
      </div>
    </nav>
  );
}

export default Navigation;
