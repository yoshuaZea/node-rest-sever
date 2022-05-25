const { Router } = require('express')
const { check } = require('express-validator')

const { uploadFile, updateImageCloudinary, showImage } = require('../controllers/upload.controller')
const { checkErrors, verifyUploadedFile } = require('../middlewares')
const { collectionsAllowed } = require('../helpers')

// Create a router
const router = Router()

// /uploads
router.post('/', 
    verifyUploadedFile,
    uploadFile
)

// Update user image
router.get('/:collection/:id',
    [
        check('collection').custom(c => collectionsAllowed(c, ['users', 'products'])),
        check('id', 'It is not a valid mongo ID').isMongoId()
    ],
    checkErrors,
    showImage
)

// Update user image
router.put('/:collection/:id',
    verifyUploadedFile,
    [
        check('collection').custom(c => collectionsAllowed(c, ['users', 'products'])),
        check('id', 'It is not a valid mongo ID').isMongoId()
    ],
    checkErrors,
    updateImageCloudinary
)

module.exports = router