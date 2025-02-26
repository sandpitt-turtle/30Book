export default function SearchBar({ onSearch }) {
    return (
      <input
        type="text"
        placeholder="Search for a player..."
        onChange={(e) => onSearch(e.target.value)}
        className="search-bar"
      />
    );
  }
  