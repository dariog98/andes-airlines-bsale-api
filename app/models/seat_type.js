import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql.js'

const SeatType = sequelize.define(
    'seat_type',
    {
        seat_type_id: {
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

export default Purchase