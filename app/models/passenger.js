import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql.js'

const Passenger = sequelize.define(
    'passenger',
    {
        passenger_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    { 
        freezeTableName: true,
        timestamps: false
    }
)

export default Passenger