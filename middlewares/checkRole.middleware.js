const { request, response } = require('express')

const isAdmin = (req = request, res = response, next) => {

    if(!req.user){
        return res.status(500).json({
            message: 'You want to validate a role before to authenticate',
            errorCode: 'SERVER-ERROR'
        })
    }

    // Destructuring
    const { role, name } = req.user

    if(role !== 'ADMIN_ROLE'){
        return res.status(403).json({
            message: `The user ${name} is not an administrator to this action`,
            errorCode: 'CLIENT-ERROR-1'
        })
    }

    next()
}

const checkRole = (...roles) => {
    return (req = request, res = response, next) => {

        if(!req.user){
            return res.status(500).json({
                message: 'You want to validate a role before to authenticate',
                errorCode: 'SERVER-ERROR'
            })
        }

        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                message: `The user ${req.user.name} does not has permissions to this action`,
                errorCode: 'CLIENT-ERROR-2'
            })
        }

        next()
    }
}

module.exports = {
    isAdmin,
    checkRole
}