const fs = require('fs');

const readPokemonData = () => {
  const { data } = JSON.parse(fs.readFileSync('pokemon-list.json', 'utf-8'));
  return data;
};

module.exports = { readPokemonData };
