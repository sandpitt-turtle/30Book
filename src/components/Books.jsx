import { useState, useEffect } from 'react';

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books');
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

     
        if (data.books && Array.isArray(data.books)) {
          setBooks(data.books);
        } else {
          console.error('Fetched data does not contain an array of books');
        }
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
