import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Account({ user }) {
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const navigate = useNavigate();

/////
  const defaultUser = {
    username: "GuestUser",
    email: "guest@example.com",
    id: null,
  };

  const activeUser = user || defaultUser;

  useEffect(() => {
    const fetchCheckedOutBooks = async () => {
      if (!activeUser.id) {
   
        setCheckedOutBooks([
          { id: 1, title: "Demo Book 1" },
          { id: 2, title: "Demo Book 2" },
        ]);
        return;
      }

      try {
        const response = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/${activeUser.id}/checked-out-books`
        );
        if (!response.ok) throw new Error("Failed to fetch checked-out books");

        const data = await response.json();
        setCheckedOutBooks(data.books);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCheckedOutBooks();
  }, [activeUser.id]);

  return (
    <div className="account-container">
      <h2>Account Details</h2>
      <ul>
        <li><b>Username:</b> {activeUser.username}</li>
        <li><b>Email:</b> {activeUser.email}</li>
      </ul>

      <h3>Checked-Out Books</h3>
      {checkedOutBooks.length > 0 ? (
        <ul>
          {checkedOutBooks.map((book) => (
            <li key={book.id}>
              <b>{book.title}</b>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books checked out.</p>
      )}

      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}
