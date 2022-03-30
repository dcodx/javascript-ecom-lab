const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { verifyToken } = require('../verifyToken')

const { db } = require('../config')
db.sequelize.sync()

const Product = db.products
const Review = db.reviews
const User = db.users
const Order = db.orders
const Contact = db.contacts






router.get('/products', async (req, res) => {
    const data = await Product.findAll()
    return res.json(data)
})

router.post('/search', async (req, res) => {
    const { query } = req.body
    try{
        const [results, metadata] = await db.sequelize.query(`SELECT * FROM products WHERE products.name LIKE '%${query}%' OR products.desc LIKE '%${query}%'`)
        return res.json(results)
    }
    catch(e){
        return res.json(e)
    }
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) return res.send('incorrect')

    bcrypt.compare(password, user.password, (err, result) => {
        if (!result) return res.send('incorrect')

        const { password, ...others } = user.dataValues
        const accessToken = jwt.sign({
            id: user.id,
            admin: user.admin
        }, process.env.JWT_SEC, { expiresIn: '3d' })

        return res.json({ ...others, accessToken })
    })
})

router.post('/register', async (req, res) => {
    const { fullname, email, password } = req.body

    const userExist = await User.findOne({ where: { email } })
    //verify email 




    if (userExist) return res.send('exist')

    bcrypt.hash(password, 10, async (err, hash) => {
        const user = await User.create({ fullname, email, password: hash, admin: false })

        const { password, ...others } = user.dataValues
        const accessToken = jwt.sign({
            id: user.id,
            admin: user.admin
        }, process.env.JWT_SEC, { expiresIn: '3d' })

        return res.json({ ...others, accessToken })
    })
})

router.get('/product/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    const [results, metadata] = await db.sequelize.query(`SELECT * FROM reviews INNER JOIN users on users.id = reviews.userId WHERE reviews.productId = ${id}`)

    return res.json({ product, reviews: results })
})

router.post('/contact', async (req, res) => {
    const { values } = req.body
    const { firstname, lastname, email, subject, message } = values

    await Contact.create({ firstname, lastname, email, subject, message })
    
    res.sendStatus(200)
})

router.post('/addReview', verifyToken, async (req, res) => {
    const { productId, desc, stars } = req.body

    const userId = req.user.id

    const exist = await Review.findOne({ where: { productId, userId } })
    if (exist) return res.send('exist')

    const canReview = await Order.findAll({ where: { userId } })

    const prds = canReview.map(p => {
        return { products: p.products }
    })

    for (let i = 0; i < prds.length; i++) {
        if (prds[i].products.split(',').includes(String(productId))) {
            await Review.create({ productId, userId, desc, stars })
            return res.sendStatus(200)
        }
    }

    return res.send('cantreview')
})


router.post('/saveOrder', verifyToken, async (req, res) => {
    const { token, total, date, userId, products } = req.body

    await Order.create({ token, total, date, userId, products })

    return res.sendStatus(200)
})

router.post('/changepass', verifyToken, async (req, res) => {
    const { confirmNewPass, currentPass, newPass } = req.body
    const { id } = req.user

    const user = await User.findByPk(id)

    if (confirmNewPass !== newPass) return res.send('incorrect')

    bcrypt.compare(currentPass, user.password, async (err, result) => {
        if (!result) return res.send('incorrect')

        bcrypt.hash(newPass, 10, async (err, hash) => {
            await User.update(
                { password: hash },
                { where: { id } }
            )
        })


        return res.sendStatus(200)
    })
})

router.post('/changeinfo', verifyToken, async (req, res) => {
    const { fullname, email } = req.body
    const { id } = req.user

    await User.update(
        { fullname, email },
        { where: { id } }
    )

    const user = await User.findByPk(id)

    const { password, ...others } = user.dataValues
    const accessToken = jwt.sign({
        id: user.id,
        admin: user.admin
    }, process.env.JWT_SEC, { expiresIn: '3d' })

    return res.json({ ...others, accessToken })
})


router.get('/health',function (req, res) {
  
  try{
    var func = eval("console.log('Everything ok: Date: " + req.headers['date'] +"')");
    return res.send(func); 
    }
  catch(e){console.log(e)  
}
   
})



module.exports = router