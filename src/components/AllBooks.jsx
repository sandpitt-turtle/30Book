import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchBookImage from "../utils/fetchBookImage";

function Books({ isAuthenticated, searchTerm }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [bookImages, setBookImages] = useState({});
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

          // Fetch book images
          const images = await Promise.all(
            books.map(async (book) => {
              const image = await fetchBookImage(book.title);
              return { id: book.id, image };
            })
          );

          const imageMap = images.reduce((acc, { id, image }) => {
            acc[id] = image;
            return acc;
          }, {});

          setBookImages(imageMap);
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
        book.title?.toLowerCase().includes(trimmedQuery) ||
        book.author?.toLowerCase().includes(trimmedQuery)
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [searchTerm, books]);

  const handleDetailsClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (

   <div className="all-page">
    <div className="books-container">
      <h2>Books</h2>

      <div className="books-grid">
        {filteredBooks.length ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card">  

<button onClick={() => handleDetailsClick(book.id)} className="cover-button">
      {bookImages[book.id] ? (
        <img
          src={bookImages[book.id]}
          alt={book.title}
          className="book-cover"
          onError={(e) => (e.target.src = "./src/assets/cover.jpeg")}
        />
      ) : (
        <div className="loading-placeholder">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Gray_circles_rotate.gif"
            alt="Loading..."
            className="loading-spinner"
            onError={(e) => (e.target.src = "./src/assets/cover.jpeg")}
          />
        </div>
      )}
              </button>
              <h3>{book.title}</h3>
              <p className="book-author"><strong>Author:</strong> {book.author}</p>
              <button onClick={() => handleDetailsClick(book.id)} className="details-button">
                See details
              </button>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
    </div>
  );
}  

export default Books;



//   return (
//     <div className="books-container">
//       <h2>Books</h2>
//       <div className="carousel-container">
//         <div className="carousel">
//           {filteredBooks.length ? (
//             filteredBooks.map((book, index) => (
//               <div key={book.id} className="carousel-item">
//                 <div className="carousel-card">
//                 {bookImages[book.id] ? (
//   <img
//     src={bookImages[book.id]}
//     alt={book.title}
//     className="book-cover"
//     onError={(e) => (e.target.src = "./src/assets/cover.jpeg")}
//   />
// ) : (
//   <div className="book-cover loading-placeholder">
//     <img
//       src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Gray_circles_rotate.gif"
//       alt="Loading..."
//       className="loading-spinner"
//       onError={(e) => (e.target.src = "./src/assets/cover.jpeg")}
//     />
//   </div>
// )}



//                    <div className= "book-details">  
//                   <h3>{book.title}</h3>
//                   <p className="book-author"><strong>Author:</strong> {book.author}</p>
                 
//                   <button onClick={() => handleDetailsClick(book.id)} className="details-button">
//                     See details
//                   </button>
//                 </div>
//               </div>
//               </div>
//             ))
//           ) : (
//             <p>No books found.</p>
//           )}
//         </div>
//         <div className="carousel-indicators">
//           {filteredBooks.map((_, index) => (
//             <div
//               key={index}
//               className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
//               onClick={() => handleIndicatorClick(index)}
//             ></div>
//           ))}
//         </div>
//       </div>
     