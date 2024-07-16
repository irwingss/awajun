import React, { useState } from 'react';

const FilterMenu = ({ isOpen, onSubmit }) => {
  const [filters, setFilters] = useState({
    tipo_categ: '',
    sexo: '',
    grupo_etario: '',
    hijos: ''
  });

  const options = {
    tipo_categ: ['Respiratorio', 'Cardiovascular', 'Digestivo', 'Urinario'],
    sexo: ['H', 'M'],
    grupo_etario: ['Adulto', 'Joven'],
    hijos: ['Sí', 'No']
  };

  const labels = {
    tipo_categ: "Tipo de consulta",
    sexo: "Sexo del paciente",
    grupo_etario: "Grupo etario del paciente",
    hijos: "¿Tiene hijo(s)?"
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filters);
  };

  return (
    <div className={`filter-menu ${isOpen ? 'open' : ''}`}>
      <form onSubmit={handleSubmit}>
        {Object.keys(filters).map(key => (
          <div key={key} className="filter-item">
            <label htmlFor={key}>{labels[key]}</label>
            <select
              id={key}
              name={key}
              value={filters[key]}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              {options[key].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
        <button type="submit" className="submit-button">Generar Diálogo Intercultural</button>
      </form>
    </div>
  );
};

export default FilterMenu;