const express = require('express')
const cors = require('cors')
//CSRF middleware
const csrf = require('csurf');



const app = express()

app.use(cors())
//app.use(csrf());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const { verifyTokenAndAdmin } = require('./verifyToken')

app.use('/user', userRouter)
app.use('/admin', verifyTokenAndAdmin, adminRouter)



const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Running on port ${PORT}`))