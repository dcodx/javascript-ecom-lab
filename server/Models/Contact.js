
module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contacts", {
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        subject: {
            type: Sequelize.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false
        },
    })

    return Contact
}