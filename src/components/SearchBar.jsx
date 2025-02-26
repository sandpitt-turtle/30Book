export default function SearchBar({ onSearch }) {
    return (
      <input
        type="text"
        placeholder="Search for a book.."
        onChange={(e) => onSearch(e.target.value)}
        className="search-bar"
      />
    );
  }
  