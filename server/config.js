const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');
const Order = require('./Models/Order');
const Product = require('./Models/Product')
const Review = require('./Models/Review');
const User = require('./Models/User');
const Contact = require("./Models/Contact")

require('dotenv').config()

console.log('Dialect:', process.env.DB_DIALECT);

const
    database = process.env.DB_NAME,
    username = process.env.DB_USERNAME,
    password = process.env.DB_PASSWORD,
    host = process.env.DB_HOST,
    dialect = process.env.DB_DIALECT

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    multipleStatements: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

const db = {}
let conn 

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = Product(sequelize, Sequelize)
db.reviews = Review(sequelize, Sequelize)
db.users = User(sequelize, Sequelize)
db.orders = Order(sequelize, Sequelize)
db.contacts = Contact(sequelize, Sequelize)



async function connectToDatabase() {
    try {
        conn = await mysql.createConnection({ user: username, password: password, host: host });
        await conn.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
        console.log('Connected to database, starting application...');
    } catch (err) {
        console.error('Error connecting to database, retrying in 5 seconds...', err);
        if (conn) {
            conn.end();
        }
        setTimeout(connectToDatabase, 5000);
    }
}

connectToDatabase();

module.exports = { db, username, password, database }