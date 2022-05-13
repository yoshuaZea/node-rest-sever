const { Router } = require('express')
const router = Router()

const { userGet,
    userPost,
    userPut,
    userPatch,
    userDelete 
} = require('../controllers/user.controller')

// /api/users
router.get('/', userGet)

router.post('/', userPost)

router.put('/:id([0-9]+)', userPut)

router.patch('/:id([0-9]+)', userPatch)

router.delete('/:id([0-9]+)', userDelete)


module.exports = router