import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className= "navbar">
    <ul className ="nav-list">
      <li><Link to="/books">Books</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li> <Link to="/register">Register</Link></li>
      <li><Link to="/account">Account</Link></li>
      </ul>
    </nav>
  );
}


 

export default Navigation;
