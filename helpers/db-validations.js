const Role = require('../models/role')
const User = require('../models/user')

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


module.exports = {
    isValidRole,
    existEmail,
    checkUserById
}