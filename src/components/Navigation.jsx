import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/books">Books</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/account">Account</Link>
    </nav>
  );
}

export default Navigation;
