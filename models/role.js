const { Schema, model } = require('mongoose')

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true.valueOf, 'The role is required'],
        uppercase: true
    }
})

module.exports = model('Role', RoleSchema)