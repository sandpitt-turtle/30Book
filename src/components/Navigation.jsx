import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import ThemeContext from "./ThemeContext";
import profilePic from "../assets/default-profile.png";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react"; 
import SearchBar from "./SearchBar";

function Navigation({ isAuthenticated, setUser, setToken, onSearch }) {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation(); 
  const [showSearch, setShowSearch] = useState(false);

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

        

     
        {location.pathname !== "/books" && (
          <div className="nav-center">
            <Link to="/books" className="book-nav-button"><h2>Books</h2></Link>
          </div>
        )}

  
        <div className="nav-right">
          {location.pathname === "/books" && (
            <div className="search-wrapper">
              <div className="search-icon" onClick={() => setShowSearch(!showSearch)}>
                <Search size={24} color="white" />
                <span className="search-label"></span> 
              </div>
              {showSearch && <SearchBar onSearch={onSearch} className="nav-search" />}
            </div>
          )}

          {isAuthenticated ? (
            <>
              <button onClick={handleLogout} className="nav-button">Logout</button>
          
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
  );
}

export default Navigation;
