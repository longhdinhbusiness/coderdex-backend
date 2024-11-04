const fs = require('fs');
const path = require('path');
const { readPokemonData } = require('../../../utils/readPokemonFile.util');
const Joi = require('joi');

const deletePokemonByID = (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().positive().required(),
  });

  const { error } = schema.validate({ id: parseInt(req.params.id) });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const pokemonData = readPokemonData();
  const id = parseInt(req.params.id);

  const updatedPokemonData = pokemonData.filter((pokemon) => pokemon.id !== id);

  if (updatedPokemonData.length === pokemonData.length) {
    return res.status(404).json({ error: 'Pokemon not found' });
  }

  const filePath = path.join(__dirname, '../../../pokemon-list.json');

  fs.writeFile(
    filePath,
    JSON.stringify({ data: updatedPokemonData }, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing to file:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(200).send('Pokemon deleted successfully');
    }
  );
};

module.exports = { deletePokemonByID };
