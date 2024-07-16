import { useState } from 'react';
import FilterMenu from '../components/FilterMenu';
import SwipeableCard from '../components/SwipeableCard';
import SearchBar from '../components/SearchBar';
import { processData } from '../utils/dataProcessor';

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);

  const handleFilterSubmit = async (filters) => {
    try {
      const processedData = await processData(filters);
      setQuestions(processedData);
      setFilteredQuestions(processedData);
      setIsFilterMenuOpen(false);
      setHasAppliedFilters(true);
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredQuestions(questions);
    } else {
      const filtered = questions.filter(question =>
        question.pregunta.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuestions(filtered);
    }
  };

  const handleReset = () => {
    setFilteredQuestions(questions);
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  return (
    <div className={`app-container ${isFilterMenuOpen ? 'filter-open' : ''}`}>
      <button className="menu-toggle" onClick={toggleFilterMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <FilterMenu isOpen={isFilterMenuOpen} onSubmit={handleFilterSubmit} />
      <main className="main-content">
        <h1>Diálogo Intercultural Español-Awajún</h1>
        {filteredQuestions.length > 0 ? (
          <>
            <SwipeableCard questions={filteredQuestions} />
            {hasAppliedFilters && (
              <SearchBar onSearch={handleSearch} onReset={handleReset} />
            )}
          </>
        ) : (
          <div className="empty-state">
            <p>Por favor, abra los filtros y seleccione las opciones para mostrar el diálogo intercultural correspondiente</p>
          </div>
        )}
      </main>
    </div>
  );
}