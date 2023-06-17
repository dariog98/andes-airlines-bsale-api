import { Router } from 'express'
import { getFlightPassengers } from '../controllers/flights.js'

const router = Router()

router.get('/:id/passengers', getFlightPassengers)

export { router }