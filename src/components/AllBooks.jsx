import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';

function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
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
          setFilteredBooks(books); 
        } else {
          console.error("Fetched data does not contain an array of books");
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (query) => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const handleDetailsClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="books-container">
      <h2>Books</h2>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      <div className="books-grid">
        {filteredBooks.length ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p className="book-author"><strong>Author:</strong> {book.author}</p>
              <button
                onClick={() => handleDetailsClick(book.id)}
                className="details-button"
              >
                See details
              </button>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}

export default Books;
