import { Link } from 'react-router-dom';
import { useContext } from "react";
import ThemeContext from "./ThemeContext";
import profilePic from '../assets/default-profile.png';

function Navigation() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/books" className="small-link">Books</Link>
      </div>

      <div className="nav-list">
        <div className="accountnav-container">
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
