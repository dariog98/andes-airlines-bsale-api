import { Router } from 'express'
import { getAirplane } from '../controllers/airplane.js'

const router = Router()

router.get('/:id', getAirplane)

export { router }