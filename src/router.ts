import express from 'express'
import pokemonRoutes from './pokemon/pokemon'

const router = express.Router()

// this is a global route
router.get('/health', function(req, res) {
  res.sendStatus(200)
})

router.use('/pokemon', pokemonRoutes)

export default router
