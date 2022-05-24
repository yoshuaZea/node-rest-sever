const { request, response } = require('express')
const { isValidObjectId } = require('mongoose')

const { Category, Product, Role, User } = require('../models')

const collectionsAllowed = [
    'categories',
    'products',
    'roles',
    'users'
]

const search = async (req = request, res = response) => {
    try {

        // Destructuring
        const { collection, term } = req.params

        if(!collectionsAllowed.includes(collection)){
            res.status(400).json({
                msg: `${collection} is not a valid param to make a search.`
            })
        }

        switch (collection) {
            case 'categories':
                searchCategories(term, res)
                break
            case 'products':
                searchProducts(term, res)
                break
            case 'roles':
                searchRoles(term, res)
                break
            case 'users':
                searchUsers(term, res)
                break
            default:
                res.status(500).json({
                    msg: 'Contact support to solve this problem'
                })
                break
        }

    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            msg: 'Something went wrong - SEARCHING',
            error: error.message
        })
    }
}

const searchCategories = async (term = '', res = response) => {
    const isMongoId = isValidObjectId(term)

    if(isMongoId){
        const category = await Category.findById(term)
        return res.status(200).json({
            results: category ? [ category ] : [],
            term
        })
    }


    // Any search
    const regex = new RegExp(term, 'i')

    const categories = await Category.find({ name: regex, status: true })

    return res.status(200).json({
        results: categories,
        term
    })
}

const searchProducts = async (term = '', res = response) => {
    const isMongoId = isValidObjectId(term)

    if(isMongoId){
        const product = await Product.findById(term).populate('category', 'nombre')
        return res.status(200).json({
            results: product ? [ product ] : [],
            term
        })
    }


    // Any search
    const regex = new RegExp(term, 'i')

    const products = await Product.find({ 
        $or: [
            { name: regex },
            { description: regex },
        ],
        $and: [{
            status: true
        }]
     })
                                  .populate('category', 'nombre')

    return res.status(200).json({
        results: products,
        term
    })
}

const searchRoles = async (term = '', res = response) => {
    const isMongoId = isValidObjectId(term)

    if(isMongoId){
        const role = await Role.findById(term)
        return res.status(200).json({
            results: role ? [ role ] : [],
            term
        })
    }


    // Any search
    const regex = new RegExp(term, 'i')

    const roles = await Role.find({ role: regex })

    return res.status(200).json({
        results: roles,
        term
    })
}

const searchUsers = async (term = '', res = response) => {
    const isMongoId = isValidObjectId(term)

    if(isMongoId){
        const user = await User.findById(term)
        return res.status(200).json({
            results: user ? [ user ] : [],
            term
        })
    }


    // Any search
    const regex = new RegExp(term, 'i')

    const users = await User.find({
        $or: [
            { name: regex },
            { email: regex }
        ],
        $and: [{
            status: true
        }]
    })

    return res.status(200).json({
        results: users,
        term
    })
}

module.exports = {
    search
}