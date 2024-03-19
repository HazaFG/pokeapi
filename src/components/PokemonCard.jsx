// src/components/PokemonCard.jsx
import React, { useState, useEffect } from 'react';

const PokemonCard = ({ pokemonName }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [evolutionDetails, setEvolutionDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();
        setPokemonDetails(data);

        // Fetch evolution chain
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionChainData = await evolutionChainResponse.json();

        // Extract evolution details
        const chain = [];
        let currentPokemon = evolutionChainData.chain;

        while (currentPokemon) {
          chain.push(currentPokemon.species.name);
          currentPokemon = currentPokemon.evolves_to[0];
        }

        setEvolutionDetails(chain);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  const handlePokemonClick = async (evolutionName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionName}`);
      const data = await response.json();
      setPokemonDetails(data);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  return (
    <div className="pokemon-card">
      {pokemonDetails && (
        <>
          <h3>{pokemonDetails.name}</h3>
          <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
          <div>
            <h4>Evoluciones:</h4>
            <ul>
              {evolutionDetails && evolutionDetails.map((evolution, index) => (
                <li key={index} onClick={() => handlePokemonClick(evolution)}>
                  {evolution}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonCard;
