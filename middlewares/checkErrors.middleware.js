const { validationResult } = require('express-validator')

const checkErrors = (req, res, next) => {
    // Check errors
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json(errors)
    }

    next()
}

module.exports = {
    checkErrors
}