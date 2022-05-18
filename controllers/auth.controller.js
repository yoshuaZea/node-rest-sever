const { request, response } = require("express")
const bcryptjs = require("bcryptjs")
const { createJWT } = require('../helpers/create-jwt')

const User = require("../models/user")

const login = async (req = request, res = response) => {
    try {

        // Destruturing
        const { email, password } = req.body

        // Check if user exits
        const user = await User.findOne({ email })

        if(!user){
            return res.status(404).json({
                msg: `The email ${email} does not exist`
            })
        }

        // Verify if user is active
        if(!user.status){
            return res.status(400).json({
                msg: `The account ${email} is not active`
            })
        }

        // Verify password
        const match = bcryptjs.compareSync(password, user.password)

        if(!match){
            return res.status(400).json({
                msg: `The password is incorrect`
            })
        }

        // Generate a JWT
        const token = await createJWT(user.id)
    
        res.status(200).json({
            msg: 'Login ok',
            token,
            user
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}

module.exports = {
    login
}