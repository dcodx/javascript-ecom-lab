
module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
        total: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        date: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        products:{
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Order
}