import { snakeToCamelObject } from '../helpers/snakeToCamel.js'
import Airplane from '../models/airplane.js'

const getAirplane = async (request, response) => {
    try {
        const id = request.params.id

        const airplane = await Airplane.getAirplaneAndSeats(id)

        let airplaneData = JSON.parse(JSON.stringify(airplane))
        airplaneData.seats = airplaneData.seats.map(seat => snakeToCamelObject(seat))
        airplaneData = snakeToCamelObject(airplaneData)
        airplaneData.maxRows = Math.max(...airplaneData.seats.map(seat => seat.seatRow))
        airplaneData.maxColumns = String.fromCharCode(Math.max(...airplaneData.seats.map(seat => seat.seatColumn.charCodeAt())))

        if (airplane) {
            response.status(200)
            response.send({
                code: '200',
                data: airplaneData
            })
        } else {
            response.status(404)
            response.send({
                code: '404',
                data: {}
            })
        }
    } catch (error) {
        //httpError(response, error)
        console.log(error)
    }
}

export {
    getAirplane
}