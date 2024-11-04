const express = require('express');
const router = express.Router();
const {
  createPokemon,
  getListPokemons,
  getPokemonById,
  deletePokemonByID,
} = require('../controllers/pokemon');

router.post('/', createPokemon);
router.get('/', getListPokemons);
router.get('/:id', getPokemonById);
router.delete('/:id', deletePokemonByID);

module.exports = router;
