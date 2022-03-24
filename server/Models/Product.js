
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        img: {
            type: Sequelize.STRING,
            allowNull: false
        },
        desc: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        stars: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    return Product
}