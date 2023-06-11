import { Router } from 'express'
import PokemonDB from '../app';

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
  const {id, password, nickname, followers} = req.body;
  const user = PokemonDB.set({
    id,
    password,
    nickname,
    followers
  });
  res.json({message: "Success"});
})

export default router
