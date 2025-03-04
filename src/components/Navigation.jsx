import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";

import profilePic from "../assets/default-profile.png";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

function Navigation({ isAuthenticated, setUser, setToken, onSearch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    navigate("/books");
  };


  const isOnBooksPage = location.pathname === "/books";
  const isOnSingleBookPage = /^\/books\/\d+$/.test(location.pathname); 

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <Link to="/books" className="nav-logo">BookBuddy</Link>

 
         {isOnBooksPage && (
  <div className="search-icon" onClick={() => setShowSearch(!showSearch)}>
    <Search size={24} color="white" />
  </div>
)}

            
          </div>

          {location.pathname !== "/books" && (
            <div className="nav-center">
              <Link to="/books" className={`book-nav-button ${isOnBooksPage ? "active" : ""}`}>
                Books
              </Link>
            </div>
          )}

          <div className="nav-right">
            {isAuthenticated ? (
              <>
                <Link to="/books" className="nav-button" onClick={handleLogout}>
                  Logout
                </Link>
                <Link to="/account">
                  <img src={profilePic} alt="Profile" className="profile-pic" />
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-button">Login</Link>
                <Link to="/register" className="nav-button">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {showSearch && (
        <div className="search-overlay" ref={searchRef}>
          <input
            type="text"
            placeholder="Search books..."
            className="search-bar"
            autoFocus
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className="close-search" onClick={() => setShowSearch(false)}></button>
        </div>
      )}
    </>
  );
}

export default Navigation;
