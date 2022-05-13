const { Router } = require('express')
const router = Router()

// *
router.get('', (req, res) => {
    res.status(404).json({
        msg: 'Page not found'
    })
})

router.post('', (req, res) => {
    res.status(404).json({
        msg: 'Page not found'
    })
})

router.put('', (req, res) => {
    res.status(404).json({
        msg: 'Page not found'
    })
})

router.patch('', (req, res) => {
    res.status(404).json({
        msg: 'Page not found'
    })
})

router.delete('', (req, res) => {
    res.status(404).json({
        msg: 'Page not found'
    })
})

module.exports = router