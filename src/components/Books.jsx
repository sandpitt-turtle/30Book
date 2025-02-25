import { useState, useEffect } from 'react';

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {

    async function fetchBooks() {
      try {
        const response = await fetch('');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.length > 0 ? (
          books.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
            </li>
          ))
        ) : (
          <p>Loading books...</p>
        )}
      </ul>
    </div>
  );
}

export default Books;
