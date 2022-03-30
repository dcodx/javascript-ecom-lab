const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1]
    
    
    if (!token) return res.status(401).json('You are not authenticated')
    

    var decoded = jwt.decode(token,process.env.JWT_SEC);
    req.user = decoded;
    //return next();
    
    let secret = process.env.JWT_SEC;
    //TODO: remove for prod
    if(token.split('.')[2].length == 0)
        secret = ''
    
    jwt.verify(token,secret, { algorithms:['HS256','None'] }, (err, user) => {
        if (err) return res.status(403).json(err)
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