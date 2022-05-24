const { Router } = require('express')
const { check } = require('express-validator')

const { checkCategory } = require('../helpers/db-validations')

const { categoryGet,
    categoryShow,
    categoryPost,
    categoryPut,
    categoryDelete 
} = require('../controllers/category.controller')

// Middlewares
const { checkErrors, verifyJwt, checkRole, isAdmin } = require('../middlewares')

// Create a router
const router = Router()

// /api/categories - All roles
router.get('/', 
    verifyJwt,
    categoryGet
)

// Show a specific category - All roles
router.get('/:id',
    verifyJwt,
    check('id', 'It is not a valid mongo ID').isMongoId().custom(checkCategory),
    checkErrors,
    categoryShow
)

// Create a category - All roles
router.post('/', 
    verifyJwt,
    checkRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('name', 'The name of category is required').not().isEmpty(),
    checkErrors,
    categoryPost
)

// Update a category by id - All roles
router.put('/:id', 
    verifyJwt,
    checkRole('ADMIN_ROLE', 'SALES_ROLE'),
    [
        check('id', 'It is not a valid mongo ID').isMongoId().custom(checkCategory),
        check('name', 'The name of category is required').not().isEmpty(),
    ],
    checkErrors,
    categoryPut
)

// Delete a category by id - Only Admin
router.delete('/:id', 
    verifyJwt,
    isAdmin,
    check('id', 'It is not a valid mongo ID').isMongoId().custom(checkCategory),
    checkErrors,
    categoryDelete
)

module.exports = router