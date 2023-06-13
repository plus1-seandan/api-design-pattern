import { Router } from 'express'
import PokemonDB from '../app';
import { PokemonFactory } from '../utils/query';

const router = Router()

router.get('/pokemon', (req, res) => {
  const user = PokemonDB.get(req.query.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
})


router.post('/pokemon', (req, res) => {
  const {id, type, attack, defense, special} = req.body;
  const pokemonFactory = new PokemonFactory();
  
  const pokemon = pokemonFactory.createPokemon(id, type, attack, defense, special);

  const user = PokemonDB.set(pokemon);
  res.json(pokemon);
})

export default router
