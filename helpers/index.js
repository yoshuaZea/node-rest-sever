const createJWT = require('./create-jwt')
const dbValidations = require('./db-validations')
const googleVerify = require('./google-verify')
const storeFile = require('./storeFile')

module.exports = {
    ...createJWT,
    ...dbValidations,
    ...googleVerify,
    ...storeFile
}