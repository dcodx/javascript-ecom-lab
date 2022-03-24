
module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("reviews", {
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        desc: {
            type: Sequelize.STRING,
            allowNull: false
        },
        stars: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    return Review
}