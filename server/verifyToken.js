const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1]

    if (!token) return res.status(401).json('You are not authenticated')

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) return res.status(403).json('Token is not valid')
        req.user = user

        return next()
    })
}


const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (Number(req.user.admin) === 1) return next()
        
        return res.status(403).json('You are not authorized')
    })
}

module.exports = { verifyToken, verifyTokenAndAdmin }