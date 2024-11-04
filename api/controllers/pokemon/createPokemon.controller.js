const { readPokemonData } = require('../../../utils/readPokemonFile.util');
const { pokemonTypes } = require('../../../constants/index');
const Joi = require('joi');
const fs = require('fs');
const path = require('path');

const createPokemon = (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().min(1).required(),
    types: Joi.array()
      .items(Joi.string().valid(...pokemonTypes))
      .min(1)
      .max(2)
      .required(),
    url: Joi.string().uri().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const pokemonData = readPokemonData();
  const { id, name, types, url } = value;

  const pokemonExists = pokemonData.some(
    (pokemon) =>
      pokemon.id === id || pokemon.name.toLowerCase() === name.toLowerCase()
  );

  if (pokemonExists) {
    return res.status(400).send('The Pokemon already exists');
  }

  const newPokemon = { id, name, types, url };
  pokemonData.push(newPokemon);

  const filePath = path.join(__dirname, '../../../pokemon-list.json');

  fs.writeFile(
    filePath,
    JSON.stringify({ data: pokemonData }, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).send('Internal Server Error');
      }
    }
  );

  res.status(201).json(newPokemon);
};

module.exports = { createPokemon };
