import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql.js'

const Flight = sequelize.define(
    'flight',
    {
        flight_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        takeoff_date_time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        takeoff_airport: {
            type: DataTypes.STRING,
            allowNull: false
        },
        landing_date_time: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        landing_airport: {
            type: DataTypes.STRING,
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

export default Flight