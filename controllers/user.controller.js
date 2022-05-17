const { request, response } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const userGet = async (req = request, res = response) => {

    try {
        // Destructuring for query params
        const { page = 0, limit = 5} = req.query

        const query = {
            status: true
        }
    
        // Query paginated
        // const users = await User.find(query)
        //                         .skip(Number(page))
        //                         .limit(Number(limit))

        // const total = await User.countDocuments(query)

        // Make requests to database because they're not dependient each other
        const responses = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(page))
                .limit(Number(limit))
        ])

        // Array destructuring
        const [total, users] = responses
    
        res.status(200).json({
            msg: 'get API',
            total,
            users
        })
        
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong')
    }
}

const userShow = async (req = request, res = response) => {
    try {
        // Destructuring for query params
        const { id } = req.params

        const user = await User.findById(id)
    
        res.status(200).json({
            msg: 'get show API',
            user
        })
        
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong')
    }
}

const userPost = async (req = request, res = response) => {
    try {
        // Destructuring
        const { name, email, password, role } = req.body
        
        // Create an instance of user
        const user = new User({
            name, email, password, role
        })

        // Encrypt password
        const salt = bcryptjs.genSaltSync(12)
        user.password = bcryptjs.hashSync(password, salt)

        // Save to database
        await user.save()

        res.status(201).json({
            msg: 'post API',
            user
        })

    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong')
    }
}

const userPut = async (req = request, res = response) => {
    try {
        const { id } = req.params

        // Destructuring, avoid to pass params to update process
        const { _id, password, google, email, ...rest } = req.body

        // Encrypt password
        if(password){
            const salt = bcryptjs.genSaltSync(12)
            rest.password = bcryptjs.hashSync(password, salt)
        }

        // Update record
        const user = await User.findByIdAndUpdate(id, rest, {
            new: true
        })
        
        res.json({
            msg: 'put API',
            user
        })

    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong')
    }
}

const userPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API'
    })
}

const userDelete = async (req = request, res = response) => {
    try {
        // Destructuring for query params
        const { id } = req.params

        // Hard delete
        // const user = await User.findByIdAndDelete(id)

        // Soft delete
        const user = await User.findByIdAndUpdate(id, 
            { status: false },
            { new: true }
        )
    
        res.json({
            msg: 'delete API',
            user
        })
        
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong')
    }
}

module.exports = {
    userGet,
    userShow,
    userPost,
    userPut,
    userPatch,
    userDelete
}