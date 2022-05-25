const { Category, Product, Role, User } = require('../models')

// Check existing role
const isValidRole = async (role = '') => {
    const exist = await Role.findOne({ role })
    if(!exist){
        throw new Error(`The role ${role} is not valid`)
    }
}

// Check if email exists
const existEmail = async (email = '') => {
    const exist = await User.findOne({ email })
    if(exist){
        throw new Error(`The email ${email} already exists`)
    }
}

// Check user by id
const checkUserById = async (id = '') => {
    const exist = await User.findById(id)
    if(!exist){
        throw new Error(`The ID ${id} does not exist`)
    }
}

// Check category by id
const checkCategory = async (id = '') => {
    const exist = await Category.findById(id)
    if(!exist){
        throw new Error(`The ID ${id} does not exist`)
    }
}

// Check product by id
const checkProduct = async (id = '') => {
    const exist = await Product.findById(id)
    if(!exist){
        throw new Error(`The ID ${id} does not exist`)
    }
}

// Verify collections
const collectionsAllowed = (collection, collections ) => {
    const allow = collections.includes(collection)

    if(!allow){
        throw new Error(`The collection ${collection} is not allowed, it just allowed ${collections}`)
    }

    return true
}

module.exports = {
    checkCategory, 
    checkProduct,
    checkUserById,
    isValidRole,
    existEmail,
    collectionsAllowed
}