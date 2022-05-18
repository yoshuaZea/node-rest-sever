const { Router } = require('express')
const { check } = require('express-validator')

const { login } = require('../controllers/auth.controller')
const { checkErrors } = require('../middlewares/checkErrors.middleware')

// Create a router
const router = Router()

// /auth
router.post('/login',
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required').notEmpty(),
    ],
    checkErrors,
    login
)


module.exports = router