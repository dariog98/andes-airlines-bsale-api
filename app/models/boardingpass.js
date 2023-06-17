import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql.js'
import Passenger from './passenger.js'

const BoardingPass = sequelize.define(
    'boarding_pass',
    {
        boarding_pass_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        purchase_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        passenger_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        seat_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        seat_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        flight_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    { 
        freezeTableName: true,
        timestamps: false
    }
)

BoardingPass.belongsTo(
    Passenger, {
        foreignKey: 'passenger_id'
    }
)

BoardingPass.getBoardingPassesOfFlight = (flightId) => {
    return BoardingPass.findAll({
        where: { flight_id: flightId },
        include: Passenger,
        raw: true,
        nest: true,
    })
}

export default BoardingPass