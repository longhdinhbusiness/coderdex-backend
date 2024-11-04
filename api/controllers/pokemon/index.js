const { createPokemon } = require('./createPokemon.controller');
const { deletePokemonByID } = require('./deletePokemonById.controller');
const { getListPokemons } = require('./getListPokemons.controller');
const { getPokemonById } = require('./getPokemonById.controller');

module.exports = {
  createPokemon,
  getPokemonById,
  getListPokemons,
  deletePokemonByID,
};
