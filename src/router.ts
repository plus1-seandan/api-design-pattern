import express from 'express'
import donut from './web/donutController'

const router = express.Router()

// this is a global route
router.get('/health', function(req, res) {
  res.sendStatus(200)
})

router.use('/donut', donut)

export default router
