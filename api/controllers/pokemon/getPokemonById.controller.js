const { readPokemonData } = require('../../../utils/readPokemonFile.util');
const Joi = require('joi');

const getPokemonById = (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().positive().required(),
  });

  const { error } = schema.validate({ id: parseInt(req.params.id) });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const pokemonData = readPokemonData();
  const id = parseInt(req.params.id);
  const pokemonIndex = id - 1;

  if (pokemonIndex < 0 || pokemonIndex >= pokemonData.length) {
    return res.status(404).json({ error: 'Pokemon not found' });
  }

  const currentPokemon = pokemonData[pokemonIndex];

  const previousPokemon =
    pokemonData[id == 1 ? pokemonData.length - 1 : pokemonIndex - 1];
  const nextPokemon =
    pokemonData[id === pokemonData.length ? 0 : pokemonIndex + 1];

  const response = {
    data: {
      pokemon: currentPokemon,
      previousPokemon: previousPokemon,
      nextPokemon: nextPokemon,
    },
  };
  res.status(200).json(response);
};

module.exports = { getPokemonById };
