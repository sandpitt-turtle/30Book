import { Link } from "react-router-dom";
import { useContext } from "react";
import ThemeContext from "./ThemeContext";
import profilePic from "../assets/default-profile.png";
import { useNavigate } from "react-router-dom";

function Navigation({ isAuthenticated, setUser, setToken }) {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    navigate("/books"); 
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/books" className="small-link">Books</Link>
      </div>

      <div className="nav-list">
        {isAuthenticated ? (
          <div className="accountnav-container">
            <Link to="/account">
              <img src={profilePic} alt="Profile" className="profile-pic" />
            </Link>
            <Link to="/account" className="account-link">Account</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        ) : (
          <div className="login-register">
            <Link to="/register" className="small-link">Register</Link>
            <Link to="/login" className="small-link">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
