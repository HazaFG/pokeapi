// src/App.jsx
import React, { useState } from 'react';
import PokemonList from './components/PokemonList.jsx';
import SearchBar from './components/SearchBar.jsx';  // Importa el componente de buscador

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <h1>Programa de Pokeapi jeje</h1>
      <SearchBar onSearch={handleSearch} />  
      <PokemonList searchTerm={searchTerm} />  
    </div>
  );
};

export default App;
