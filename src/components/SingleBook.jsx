import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchBookImage from "../utils/fetchBookImage";

export default function SingleBook() {
  const [book, setBook] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [bookImage, setBookImage] = useState("");
  const [books, setBooks] = useState([]);
  const [bookImages, setBookImages] = useState({});
  let { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));

    const getBook = async () => {
      try {
        const response = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`
        );
        if (!response.ok) throw new Error("Failed to fetch book details");
        const bookDetails = await response.json();
        setBook(bookDetails.book);

        const image = await fetchBookImage(bookDetails.book.title);
        setBookImage(image);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books"
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const { books } = await response.json();
        const currentBookId = Number(bookId);
        const filteredBooks = books.filter((b) => b.id !== currentBookId);

        setBooks(filteredBooks);

        const images = await Promise.all(
          filteredBooks.map(async (b) => {
            const image = await fetchBookImage(b.title);
            return { id: b.id, image };
          })
        );

        const imageMap = images.reduce((acc, { id, image }) => {
          acc[id] = image;
          return acc;
        }, {});

        setBookImages(imageMap);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    if (bookId) {
      getBook();
      fetchBooks();
    }
  }, [bookId, token]);

  const handleDetailsClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  if (!book) {
    return <p className="loading-message">Loading book details...</p>;
  }

  return (
    <div className="single-book-page">
      {/* Fullscreen Background */}
      <div 
        className="featured-book-bg"
        style={{ backgroundImage: `url(${bookImage})` }}
      ></div>
  
      {/* Gradient Overlay */}
      <div className="book-overlay-gradient"></div>
  
      {/* Book Overlay */}
      <div className="book-overlay">
        <h1 className="book-title">{book.title}</h1>
        <p className="book-author">{book.author}</p>
        <p className="book-description">{book.description}</p>
        <p className={`book-status ${book.isAvailable ? "available" : "checked-out"}`}>
          {book.isAvailable ? "Available" : "Checked Out"}
        </p>
  
        {/* Checkout & Return Buttons */}
        {token && (
          <div className="button-container">
            <button className="checkout-button" disabled={!book.isAvailable}>
              Checkout
            </button>
            <button className="return-button" disabled={book.isAvailable}>
              Return
            </button>
          </div>
        )}
      </div>
  
      {/* Related Books Section - Move BELOW Featured Book */}
      <div className="related-books">
        <h2>More Books</h2>
        <div className="books-grid">
          {books.map((b) => (
            <div key={b.id} className="book-card" onClick={() => handleDetailsClick(b.id)}>
              <img
                src={bookImages[b.id] || "./src/assets/cover.jpeg"}
                alt={b.title}
                className="book-cover"
              />
              <div className="book-card-overlay">
                <h3 className="book-title">{b.title}</h3>
                <p className="book-author">{b.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}  