const { readPokemonData } = require('../../../utils/readPokemonFile.util');
const Joi = require('joi');

const getListPokemons = (req, res) => {
  const schema = Joi.object({
    type: Joi.string().optional(),
    name: Joi.string().optional(),
    currentPage: Joi.number().integer().min(1).default(1),
    pokemonsPerPage: Joi.number().integer().min(1).default(10),
  });

  const { error, value } = schema.validate(req.query);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const pokemonData = readPokemonData();
  const { type, name, page = 1, limit = 10 } = value;

  let filteredPokemons = pokemonData;

  if (type) {
    filteredPokemons = filteredPokemons.filter(
      (pokemon) =>
        pokemon.types[0].toLowerCase() === type.toLowerCase() ||
        (pokemon.types[1] &&
          pokemon.types[1].toLowerCase() === type.toLowerCase())
    );
  }

  if (name) {
    filteredPokemons = filteredPokemons.filter(
      (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
    );
  }

  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;

  const paginatedPokemonData = filteredPokemons.slice(startIndex, endIndex);

  res.status(200).json({
    currentPage: pageNumber,
    pokemonsPerPage: limitNumber,
    totalResults: filteredPokemons.length,
    totalPages: Math.ceil(filteredPokemons.length / limitNumber),
    results: paginatedPokemonData,
  });
};

module.exports = { getListPokemons };
