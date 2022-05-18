// Import all midlewares
const checkErrors = require('../middlewares/checkErrors.middleware') 
const verifyJwt = require('../middlewares/verifyJwt.middleware')
const checkRole = require('../middlewares/checkRole.middleware')


module.exports = {
    ...checkErrors,
    ...verifyJwt,
    ...checkRole
}