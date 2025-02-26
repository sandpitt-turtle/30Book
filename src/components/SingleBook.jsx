import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SingleBook() {
  const [book, setBook] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userHasBook, setUserHasBook] = useState(false);
  let { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));

    const getBook = async () => {
      try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`);
        if (!response.ok) throw new Error("Failed to fetch book details");
        const bookDetails = await response.json();
        
        setBook(bookDetails.book);

        if (token) {
          const userBooksResponse = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/account/books`, {
            headers: {
              "Authorization": `Bearer ${token}`,
            }
          });

          if (userBooksResponse.ok) {
            const userBooks = await userBooksResponse.json();
            if (userBooks.books && userBooks.books.length > 0) {
              setUserHasBook(userBooks.books.some((userBook) => userBook.id === bookId));
            } else {
            
              setUserHasBook(false);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    if (bookId) {
      getBook();
    }
  }, [bookId, token]);

  const handleCheckoutClick = async (bookId) => {
    if (!token) {
      alert("You must be logged in to checkout a book.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/checkout/${bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to checkout book");

      setBook((prevBook) => ({ ...prevBook, isAvailable: false }));
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  const handleReturnClick = async (bookId) => {
    if (!token) {
      alert("You must be logged in to return a book.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/return/${bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to return book");

      setBook((prevBook) => ({ ...prevBook, isAvailable: true }));
      setUserHasBook(false);
    } catch (error) {
      console.error("Return failed:", error);
    }
  };

  if (!book) {
    return <p className="loading-message">Loading book details...</p>;
  }

  return (
    <div className="book-details-container">
      <button className="back-button" onClick={() => navigate(`/books`)}>Back to Books</button>
      <h2 className="book-title">{book.title}</h2>
      <p className="book-author"><strong>Author:</strong> {book.author}</p>
      <p className="book-description"><strong>Description:</strong> {book.description}</p>
      <p className={`book-status ${book.isAvailable ? "available" : "checked-out"}`}>
        <strong>Status:</strong> {book.isAvailable ? 'Available' : 'Checked out'}
      </p>

      {token && (
        <button
          onClick={() => {
            if (book.isAvailable) {
              handleCheckoutClick(book.id);
            } else {
              alert("This book is already checked out.");
            }
          }}
          className="checkout-button"
        >
          Checkout
        </button>
      )}

      {token && (
        <button
          onClick={() => {
            if (userHasBook) {
              handleReturnClick(book.id);
            } else {
              alert("You don't have this book to return.");
            }
          }}
          className="return-button"
        >
          Return
        </button>
      )}

      {token && !book.isAvailable && !userHasBook && (
        <p className="book-message">You don't have this book to return.</p>
      )}

      {token && !book.isAvailable && userHasBook && (
        <p className="book-message">This book is already checked out.</p>
      )}
    </div>
  );
}
