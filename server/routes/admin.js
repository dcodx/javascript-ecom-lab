const router = require('express').Router()
const bcrypt = require('bcrypt')
const moment = require('moment')
const _ = require("lodash")
const { db } = require('../config')
const http = require('http');
const needle = require('needle');
const { curly } = require('node-libcurl');


db.sequelize.sync()

const Product = db.products
const Review = db.reviews
const User = db.users
const Order = db.orders
const Contact = db.contacts

 

//UTILS

async function  image_exists(url) {
    
    try{
    const { statusCode, data, headers } = await curly.get(url);
        if(statusCode == 200)
        console.log(data)
        return data;
    }
    catch(e){return e}
}


router.get('/products', async (req, res) => {
    const data = await Product.findAll()
    return res.json(data)
})


router.get('/users', async (req, res) => {
    const users = await User.findAll()
    res.send(users)
})


router.put('/users', async (req, res) => {
    const { userToUpdate } = req.body
    const { id, fullname, email, password, admin } = userToUpdate

    const user = await User.findByPk(id)

    if (user.password === password) {
        await User.update(
            { fullname, email, password, admin },
            { where: { id } }
        )
        const users = await User.findAll()
        return res.send(users)
    }

    bcrypt.hash(password, 10, async (err, hash) => {
        await User.update(
            { fullname, email, password: hash, admin },
            { where: { id } }
        )

        const users = await User.findAll()
        return res.send(users)
    })

})

router.post('/addUser', async (req, res) => {
    const { userToUpdate } = req.body
    const { fullname, email, password, admin = false } = userToUpdate

    bcrypt.hash(password, 10, async (err, hash) => {
        await User.create({ fullname, email, password: hash, admin })
        const users = await User.findAll()
        res.send(users)
    })
})

router.delete('/user/:id', async (req, res) => {
    const { id } = req.params
    await User.destroy({ where: { id } })
    const users = await User.findAll()
    res.send(users)
})


router.put('/products', async (req, res) => {
    const { productToUpdate } = req.body
    const { id, img, name, price, desc, stars } = productToUpdate

    await Product.update(
        { img, name, price, desc, stars },
        { where: { id } }
    )
    const products = await Product.findAll()
    res.send(products)
})

router.post('/addProduct', async (req, res) => {
    const { productToUpdate } = req.body
    const { img, name, price, desc, stars } = productToUpdate
    var data = await image_exists(img);
    var prefix = "data:image/png;base64, ";
    if(data != 0){
        await Product.create({ img, name, price, desc, stars })
        const products = await Product.findAll()
        res.send(data)
    }
    else
    res.send(data)
})

router.delete('/product/:id', async (req, res) => {
    const { id } = req.params
    await Product.destroy({ where: { id } })
    const products = await Product.findAll()
    res.send(products)
})


router.get('/orders', async (req, res) => {
    const orders = await Order.findAll()
    res.send(orders)
})


router.get('/analytics', async (req, res) => {
    const orders = await Order.findAll()
    const users = await User.findAll()

    const datas = orders.map(({ date, total }) => {
        return { date: moment(Number(date)).format('M'), total }
    })

    const mm = datas.reduce(function (rv, x) {
        (rv[x['date']] = rv[x['date']] || []).push(x);
        return rv;
    }, [])

    let totals = 0
    let months = []
    for (let i = 0; i < 12; i++) {
        totals = 0
        if (mm[i]) {
            totals = _.sum(mm[i].map(m => m.total))
        }
        months.push(totals)
    }

    let this_year = _.sum(months) || 0
    let this_month = months[moment(new Date).format('M')] || 0
    let total_users = users.length || 0

    res.json({ months, this_year, this_month, total_users })
})




router.get('/contacts', async (req, res) => {
    const contacts = await Contact.findAll()
    res.send(contacts)
})

router.get('/reviews', async (req, res) => {
    const reviews = await Review.findAll()
    res.send(reviews)
})

module.exports = router