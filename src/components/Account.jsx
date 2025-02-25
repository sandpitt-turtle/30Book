import { useState, useEffect } from 'react';

const Account = ({ token }) => {
  const [user, setUser] = useState(null);
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [userResponse, booksResponse] = await Promise.all([
          fetch('https://your-api.com/user', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('https://your-api.com/user/books', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        if (!booksResponse.ok) throw new Error('Failed to fetch checked-out books');

        const userData = await userResponse.json();
        const booksData = await booksResponse.json();

        setUser(userData);
        setCheckedOutBooks(booksData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  if (!token) {
    return <p>Please log in to view your account details.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="account-container">
      <h2 className="account-heading">Account Details</h2>
      {user ? (
        <>
          <p className="account-info"><strong>Username:</strong> {user.username}</p>
          <p className="account-info"><strong>Email:</strong> {user.email}</p>
        </>
      ) : (
        <p className="error-message">Failed to load user details.</p>
      )}
  
      <h3 className="checked-out-heading">Checked-Out Books</h3>
      {checkedOutBooks.length > 0 ? (
        <ul className="checked-out-list">
          {checkedOutBooks.map((book) => (
            <li key={book.id} className="checked-out-item">
              <strong>{book.title}</strong> by {book.author}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-books-message">You have no checked-out books.</p>
      )}
    </div>
  );
}

export default Account;
