const { Router } = require('express')

// Create a router
const router = Router()

const { search } = require('../controllers/search.controller')

router.get('/:collection/:term', search)

module.exports = router