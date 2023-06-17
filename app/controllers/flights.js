import { resolveGroups } from '../scripts/resolveGroups.js'
import { getSeatNeighbors } from '../helpers/getSeatNeighbors.js'
import { snakeToCamelObject } from '../helpers/snakeToCamel.js'
import BoardingPass from '../models/boardingpass.js'
import Flight from '../models/flight.js'
import Seat from '../models/seat.js'

const getFlightPassengers = async (request, response) => {
    try {
        const id = request.params.id

        // Get Flight
        const flight = await Flight.findOne({
            where: { flight_id: id },
            raw: true,
            nest: true,
        })

        if (flight) {
            /* Get seats */
            const airplaneSeats = (await Seat.findAll({
                where: { airplane_id: flight.airplane_id},
                raw: true,
                nest: true
            })).map(seat => snakeToCamelObject(seat))

            airplaneSeats.forEach((_, index) => {
                airplaneSeats[index].neighbors = getSeatNeighbors(airplaneSeats, index) 
            })

            const seats = {}
            
            airplaneSeats.forEach(seat => {
                seats[seat.seatId] = seat
            })

            /* Get passengers */
            const boardingPasses = await BoardingPass.getBoardingPassesOfFlight(id)
            const passengersList = boardingPasses.map(boardingPass => {
                const { purchaseId, boardingPassId, seatId, seatTypeId } = snakeToCamelObject(boardingPass)
                const passenger = snakeToCamelObject(boardingPass.passenger)
                return {
                    ...passenger,
                    dni: Number(passenger.dni),
                    boardingPassId,
                    purchaseId,
                    seatId,
                    seatTypeId,
                }
            })

            /* Groups */
            const groups = {}

            passengersList.forEach(passenger => {
                if (!groups[passenger.purchaseId]) {
                    groups[passenger.purchaseId] = []
                }
                groups[passenger.purchaseId].push(passenger)
            })

            const passengers = resolveGroups(Object.values(groups), seats, passengersList).flat()

            /* Response */
            response.status(200)
            response.send({
                code: '200',
                data: {
                    ...snakeToCamelObject(flight),
                    passengers: passengers
                }
            })
        } else {
            response.status(404)
            response.send({
                code: '404',
                data: {}
            })
        }
    } catch (error) {
        console.log(error)
        response.status(400)
        response.send({
            code: '400',
            error: 'could not connect to db'
        })
    }
}

export {
    getFlightPassengers
}