import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function Books({ isAuthenticated, searchTerm }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(!document.hidden);
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

  useEffect(() => {
    if (searchTerm) {
      const trimmedQuery = searchTerm.trim().toLowerCase();
      const filtered = books.filter((book) =>
        (book.title?.toLowerCase().includes(trimmedQuery) || 
         book.author?.toLowerCase().includes(trimmedQuery)) 
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [searchTerm, books]);

  const handleDetailsClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const scrollToIndex = (index) => {
    const carousel = document.querySelector(".carousel");
    const itemWidth = document.querySelector(".book-card")?.offsetWidth || 0;

    if (carousel && itemWidth) {
      const scrollAmount = index * (itemWidth + 20); 
      carousel.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
    scrollToIndex(index);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isActive || filteredBooks.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === filteredBooks.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredBooks, isActive]);

  useEffect(() => {
    scrollToIndex(currentIndex);
  }, [currentIndex]);

  return (
    <div className="books-container">
      <h2>Books</h2>
      {/* <SearchBar onSearch={(query) => setFilteredBooks(query)} /> */}

      <div className="carousel-container">
        <div className="carousel">
          {filteredBooks.length ? (
            filteredBooks.map((book, index) => (
              <div key={book.id} className="carousel-item">
                <div className="book-card">
                  <h3>{book.title}</h3>
                  <p className="book-author">
                    <strong>Author:</strong> {book.author}
                  </p>
                  <button
                    onClick={() => handleDetailsClick(book.id)}
                    className="details-button"
                  >
                    See details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>

        <div className="carousel-indicators">
          {filteredBooks.map((_, index) => (
            <div
              key={index}
              className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleIndicatorClick(index)}
            ></div>
          ))}
        </div>
      </div>

      <div className="books-grid">
        {filteredBooks.length ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p className="book-author">
                <strong>Author:</strong> {book.author}
              </p>
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
