// Import all midlewares
const checkErrors = require('./checkErrors.middleware') 
const checkRole = require('./checkRole.middleware')
const verifyJwt = require('./verifyJwt.middleware')
const verifyUploadedFile = require('./verifyUploadedFile.middleware')


module.exports = {
    ...checkErrors,
    ...checkRole,
    ...verifyJwt,
    ...verifyUploadedFile
}