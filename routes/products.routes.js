const { Router } = require('express')
const { check } = require('express-validator')

const { checkProduct, checkCategory } = require('../helpers/db-validations')

const { productGet,
    productShow,
    productPost,
    productPut,
    productDelete 
} = require('../controllers/product.controller')

// Middlewares
const { checkErrors, verifyJwt, checkRole, isAdmin } = require('../middlewares')

// Create a router
const router = Router()

// /api/categories - All roles
router.get('/', 
    verifyJwt,
    productGet
)

// Show a specific product - All roles
router.get('/:id',
    verifyJwt,
    check('id', 'It is not a valid mongo ID').isMongoId().custom(checkProduct),
    checkErrors,
    productShow
)

// Create a product - All roles
router.post('/', 
    verifyJwt,
    checkRole('ADMIN_ROLE', 'SALES_ROLE'),
    [
        check('name', 'The name of product is required').not().isEmpty(),
        check('category', 'It is not a valid mongo ID').isMongoId().custom(checkCategory)
    ],
    checkErrors,
    productPost
)

// Update a product by id - All roles
router.put('/:id', 
    verifyJwt,
    checkRole('ADMIN_ROLE', 'SALES_ROLE'),
    [
        check('id', 'It is not a valid mongo ID').isMongoId().custom(checkProduct),
        check('name', 'The name of product is required').not().isEmpty()
    ],
    checkErrors,
    productPut
)

// Delete a product by id - Only Admin
router.delete('/:id', 
    verifyJwt,
    isAdmin,
    check('id', 'It is not a valid mongo ID').isMongoId().custom(checkProduct),
    checkErrors,
    productDelete
)

module.exports = router