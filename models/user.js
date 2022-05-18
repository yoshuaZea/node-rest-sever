const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        lowercase: true,
        uppercase: false,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
        trim: true
    },
    image: {
        type: String,
        required: false,
        trim: true
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    },
    isGoogle: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})

// OVERWRITE METHODS

// HIDE SOME FILEDS IN THE RESPONSES
UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject()

    // Change de name of _id
    user.uid = _id

    return user
}

module.exports = model('User', UserSchema)