
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        fullname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        admin: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return User
}