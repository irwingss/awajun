import React, { useState } from 'react';

const SearchBar = ({ onSearch, onReset }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm('');
    onReset();
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Buscar palabra clave (cabeza, duele, silba, etc.)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button type="button" className="reset-button" onClick={handleReset}>
            ×
          </button>
        )}
      </div>

    </form>
  );
};

export default SearchBar;