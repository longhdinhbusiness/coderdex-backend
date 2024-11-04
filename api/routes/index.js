const express = require('express');
const router = express.Router();
const pokemonRoutes = require('./pokemon.route');

router.use('/pokemons', pokemonRoutes);

module.exports = router;
