const { Router } = require('express')
const { check } = require('express-validator')

const { isValidRole, existEmail, checkUserById } = require('../helpers/db-validations')

const { userGet,
    userShow,
    userPost,
    userPut,
    userPatch,
    userDelete 
} = require('../controllers/user.controller')

// Middlewares
const { checkErrors, verifyJwt, checkRole, isAdmin } = require('../middlewares')

// Create a router
const router = Router()

// /api/users
router.get('/', 
    verifyJwt,
    userGet
)

router.get('/:id', 
    verifyJwt,
    [
        check('id', 'It is not a valid mongo ID').isMongoId().custom(checkUserById)
    ],
    checkErrors,
    userShow
)

router.post('/', 
    [
        check('name', 'The name is required').notEmpty(),
        check('email', 'The email is invalid').isEmail().custom(existEmail),
        check('password', 'The password is required').not().isEmpty().isLength({ min: 8 }).withMessage('The password must have at least 8 characters'),
        // check('role', 'The role is required').notEmpty().isIn(['ADMIN_ROLE', 'USER_ROLE']).withMessage('It is not a valid role')
        check('role', 'The role is required').notEmpty().custom(isValidRole)
    ],
    checkErrors,
    userPost
)

router.put('/:id',
    verifyJwt,
    [
        check('id', 'It is not a valid mongo ID').isMongoId().custom(checkUserById),
        check('name').isString().optional({ nullable: true }),
        check('password').isString().optional({ nullable: true }).isLength({ min: 8 }).withMessage('The password must have at least 8 characters'),
        // check('role', 'The role is required').notEmpty().isIn(['ADMIN_ROLE', 'USER_ROLE']).withMessage('It is not a valid role')
        check('role', 'The role is required').notEmpty().custom(isValidRole)
    ],
    checkErrors,
    userPut
)

router.patch('/:id', userPatch)

router.delete('/:id',
    verifyJwt,
    // isAdmin,
    checkRole('ADMIN_ROLE', 'SALES_ROLE'),
    [
        check('id', 'It is not a valid mongo ID').isMongoId().custom(checkUserById)
    ],
    checkErrors,
    userDelete
)


module.exports = router