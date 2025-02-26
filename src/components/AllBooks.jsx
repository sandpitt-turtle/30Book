import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import LoginForm from "./LoginForm";

function Books() {
  const [books, setBooks] = useState([]);
  // const [isLoginVisible, setIsLoginVisible] = useState(false); 
  const [checkedOutBooks, setCheckedOutBooks] = useState(new Set()); 
  const navigate = useNavigate();

 useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const { books } = await response.json();
        if (Array.isArray(books)) {
          setBooks(books);
        } else {
          console.error("Fetched data does not contain an array of books");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  

  const handleDetailsClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };
  

  return (
    <div className="books-container">
      <h2>Books</h2>
      {/* <button onClick={() => setIsLoginVisible(true)} className="login-button">Login</button>
      <LoginForm isVisible={isLoginVisible} setIsVisible={setIsLoginVisible}  */}

      <div className="books-grid">
        {books.length ? (
          books.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <button onClick={() => handleDetailsClick(book.id)} className="details-button">See details</button>
             </div>
          ))
        ) : (
          <p>Loading books...</p>
        )}
      </div>
    </div>
  );
}

export default Books;
