import { useState, useEffect } from 'react';

const Account = ({ token }) => {
  const [user, setUser] = useState(null);
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchUserData = async () => {
      try {
        const userResponse = await fetch('https://your-api.com/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        setUser(userData);

        const booksResponse = await fetch('https://your-api.com/user/books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!booksResponse.ok) {
          throw new Error('Failed to fetch checked-out books');
        }

        const booksData = await booksResponse.json();
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
    <div>
      <h2>Account Details</h2>
      {user ? (
        <>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </>
      ) : (
        <p>Failed to load user details.</p>
      )}

      <h3>Checked-Out Books</h3>
      {checkedOutBooks.length > 0 ? (
        <ul>
          {checkedOutBooks.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no checked-out books.</p>
      )}
    </div>
  );
};

export default Account;
