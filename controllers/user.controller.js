const { request, response } = require('express')

const userGet = (req = request, res = response) => {

    const { edad, nombre, page = 1, limit = 10} = req.query

    res.json({
        msg: 'get API',
        edad,
        nombre, 
        page,
        limit
    })
}

const userPost = (req = request, res = response) => {

    const { nombre, edad } = req.body

    res.json({
        msg: 'post API',
        nombre,
        edad
    })
}

const userPut = (req = request, res = response) => {

    const { id } = req.params

    res.json({
        msg: 'put API',
        id
    })
}

const userPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API'
    })
}

const userDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API'
    })
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}