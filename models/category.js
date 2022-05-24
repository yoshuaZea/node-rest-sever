const { Schema, model } = require('mongoose')

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'The name of category is required']
    },
    status: {
        type: Boolean,
        required: [true, 'The status of category is required'],
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The user who creates the new category is required']
    }
})

// HIDE SOME FILEDS IN THE RESPONSES
CategorySchema.methods.toJSON = function(){
    const { __v, status, ...data } = this.toObject()

    return data
}

module.exports = model('Category', CategorySchema)