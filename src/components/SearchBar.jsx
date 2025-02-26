import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    onSearch(query); 
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Search books..." 
        value={searchInput} 
        onChange={handleSearchChange} 
      />
    </div>
  );
}

export default SearchBar;
