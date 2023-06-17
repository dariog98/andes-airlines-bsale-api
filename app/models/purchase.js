import { DataTypes } from 'sequelize'
import { sequelize } from '../config/mysql.js'
import BoardingPass from './boardingpass.js'

const Purchase = sequelize.define(
    'purchase',
    {
        purchase_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        purchase_date: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    { 
        freezeTableName: true,
        timestamps: false
    }
)

Purchase.hasMany(
    BoardingPass, {
        foreignKey: 'purchase_id'
    }
)

BoardingPass.belongsTo(
    Purchase, {
        foreignKey: 'purchase_id'
    }
)

Purchase.getPurchasesOfFlight = (flightId) => {
    return Purchase.findAndCountAll({
        include: { model: BoardingPass, include: 'passenger' },
        //where: { 'boarding_passes.flight_id': flightId },
        //raw: true,
        //nest: true,
    })
}

export default Purchase