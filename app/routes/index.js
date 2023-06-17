import { Router } from 'express'
import { router as flightsRouter } from './flights.js'
import { router as airplanesRouter } from './airplanes.js'

const router = Router()

router.use('/flights', flightsRouter)
router.use('/airplanes', airplanesRouter)
//router.get('/flights/:id/passengers', getFlightPassengers)

router.get('*', (request, response) => {
    response.status(404)
    response.send({ error: 'Route not found' })
})

export default router