import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/books">Books</Link><br></br>
      <Link to="/login">Login</Link><br></br>
      <Link to="/register">Register</Link><br></br>
      <Link to="/account">Account</Link><br></br>
    </nav>
  );
}

export default Navigation;
