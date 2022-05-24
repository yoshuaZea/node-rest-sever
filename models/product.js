const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name of category is required']
    },
    status: {
        type: Boolean,
        required: [true, 'The status of category is required'],
        default: true
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: false
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'The category is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'The user who creates the new category is required']
    },
})

// HIDE SOME FILEDS IN THE RESPONSES
ProductSchema.methods.toJSON = function(){
    const { __v, status, ...data } = this.toObject()

    return data
}

module.exports = model('Product', ProductSchema)