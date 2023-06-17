import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql.js'

const Seat = sequelize.define(
    'seat',
    {
        seat_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        seat_column: {
            type: DataTypes.STRING,
            allowNull: false
        },
        seat_row: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        seat_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        airplane_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    { 
        freezeTableName: true,
        timestamps: false
    }
)

export default Seat