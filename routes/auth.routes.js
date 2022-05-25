const { Router } = require('express')
const { check } = require('express-validator')

const { login, googleSignIn } = require('../controllers/auth.controller')
const { checkErrors } = require('../middlewares')

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

router.post('/login/google',
    [
        check('id_token', 'The token google is required').not().isEmpty()
    ],
    checkErrors,
    googleSignIn
)


module.exports = router