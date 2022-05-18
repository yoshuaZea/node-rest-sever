const jwt = require('jsonwebtoken')
const User = require('../models/user')

const verifyJwt = async (req, res, next) => {

    // Get authorization header with the token
    const authHeader = req.get('Authorization')

    if(!authHeader) {
        return res.status(401).json({
            status: 401,
            message: 'There is no token, unauthorized',
            errorCode: 'JWT-1'
        })
    }
    
    // Get token to verify
    // Bearer <token>
    const headerToken = authHeader.split(' ')[1]
    let checkToken

    try {
        // Validate secret key
        checkToken = jwt.verify(headerToken, process.env.SECRET_KEY)

        // If token is valid but it has any error
        if(!checkToken){
            return res.status(401).json({
                message: 'Token is not valid, you should authenticate again',
                errorCode: 'JWT-3'
            })
        }

        // Destructuring
        const { uid } = checkToken

        // Decode data from payload
        // let decoded = jwt.decode(headerToken, { 
        //     json: true,
        //     complete: true 
        // })

        // Verify user
        const user = await User.findById(uid)

        // Verify if uid is false
        if(!user){
            return res.status(401).json({
                message: 'The user does not exist',
                errorCode: 'USR-1'
            })
        }

        // Verify if uid is false
        if(!user.status){
            return res.status(401).json({
                message: 'The user account is not active',
                errorCode: 'USR-2'
            })
        }

        // Store temporaly in the request
        req.user = user
        
        // Run next middleware
        next()
        
    } catch (error) {

        // Destructuring
        let { name } = error
        let message = 'Token is invalid', status = 500

        // Other types of errors
        if(name === 'TokenExpiredError'){
            status = 401
            message = 'Token has expired'
        }

        if(name === 'JsonWebTokenError'){
            status = 403
        }

        return res.status(status).json({
            message,
            errorCode: 'JWT-2',
            error: error
        })
    }
}

module.exports = {
    verifyJwt
}