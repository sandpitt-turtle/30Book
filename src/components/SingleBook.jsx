import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SingleBook() {
  const [book, setBook] = useState(null);
  let { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`);
        if (!response.ok) throw new Error("Failed to fetch book details");
        const bookDetails = await response.json();
        
        setBook(bookDetails.book);  
      } catch (error) {
        console.error(error);
      }
    };

    if (bookId) {
      getBook();  
    }
  }, [bookId]);  
  
  if (!book) {
    return <p className="loading-message">Loading book details...</p>;  
  }

  return (
    <div className="book-details">
      <h2 className="book-title">{book.title}</h2>
      <p className="book-author"><strong>Author:</strong> {book.author}</p>
      <p className="book-description"><strong>Description:</strong> {book.description}</p>
      <p className={`book-status ${book.isAvailable ? "available" : "checked-out"}`}>
        <strong>Status:</strong> {book.isAvailable ? 'Available' : 'Checked out'}
      </p>
      <button className="back-button" onClick={() => navigate(`/books`)}>Back to Books</button>
    </div>
  );
}
