const jwt = require('jsonwebtoken')

const createJWT = (uid) => {
    return new Promise((resolve, reject) => {

        // Data to create token
        const payload = {
            uid
        }

        // Sign a new token with payload
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRE_TOKEN
        }, (err, token) => {
            if(err){
                console.log(err)
                reject('Token could not be created')
            } else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    createJWT
}