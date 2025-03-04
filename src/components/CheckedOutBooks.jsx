import { useEffect } from "react";

export default function CheckedOutBooks({ checkedOutBooks, onClose }) {
  useEffect(() => {


    const closeOnEscape = (e) => {
      if (e.key === "Escape") {
     
        onClose();
      }
    };
    const closeOnOutsideClick = (e) => {
      if (e.target.id === "popup-overlay") {
    
        onClose();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("click", closeOnOutsideClick);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("click", closeOnOutsideClick);
    };
  }, [onClose, checkedOutBooks]);

  return (
    <div id="popup-overlay" className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h3>Checked-Out Books</h3>
        {checkedOutBooks.length > 0 ? (
          <ul>
            {checkedOutBooks.map((book) => (
              <li key={book.id}><b>{book.title}</b></li>
            ))}
          </ul>
        ) : (
          <p>No books checked out.</p>
        )}
      </div>
    </div>
  );
}