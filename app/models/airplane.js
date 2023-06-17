import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql.js'
import Seat from './seat.js'

const Airplane = sequelize.define(
    'airplane',
    {
        airplane_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    { 
        freezeTableName: true,
        timestamps: false
    }
)

Airplane.hasMany(
    Seat,{
        foreignKey: 'airplane_id'
    }
)

Airplane.getAirplaneAndSeats = async (airplaneId) => {
    return Airplane.findOne({
        where: { airplane_id: airplaneId },
        include: Seat
    })
}

export default Airplane