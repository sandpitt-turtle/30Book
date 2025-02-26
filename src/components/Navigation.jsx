import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import ThemeContext from "./ThemeContext";
import profilePic from "../assets/default-profile.png";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react"; // Importing the search icon
import SearchBar from "./SearchBar";

function Navigation({ isAuthenticated, setUser, setToken, onSearch }) {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [showSearch, setShowSearch] = useState(false); // Toggle search bar state

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    navigate("/books");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/books" className="nav-logo">BookBuddy</Link>

   
        {location.pathname === "/books" ? (
          <div className="nav-center">
            <div className="search-wrapper">
              <div className="search-icon" onClick={() => setShowSearch(!showSearch)}>
                <Search size={24} color="white" />
                <span className="search-label">Search</span> 
              </div>
              {showSearch && <SearchBar onSearch={onSearch} className="nav-search" />}
            </div>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/books" className="nav-item">Books</Link>
            {isAuthenticated && <Link to="/account" className="nav-item">Account</Link>}
          </div>
        )}

        <div className="nav-right">
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout} className="nav-button">Logout</button>
              <Link to="/account">
                <img src={profilePic} alt="Profile" className="profile-pic" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="nav-button">Register</Link>
              <Link to="/login" className="nav-button">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
