// src/components/PokemonList.jsx
import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ searchTerm }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const result = await response.json();
        setPokemonList(result.results);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [pokemonList, searchTerm]);

  return (
    <div>
      <h2>Lista de pokemones.</h2>
      <div className="pokemon-list">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemonName={pokemon.name} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
