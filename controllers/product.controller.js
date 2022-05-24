const { request, response } = require("express")

const { Product } = require('../models')

const productGet = async (req = request, res = response) => {
    try {
        
        // Destructuring for query params
        const { page = 0, limit = 5} = req.query

        const query = {
            status: true
        }
    
        const responses = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .populate('user', ['name'])
                .populate('category', ['name'])
                .skip(Number(page))
                .limit(Number(limit))
        ])

        // Array destructuring
        const [total, products] = responses
    
        res.status(200).json({
            msg: 'Ok',
            total,
            products
        })

    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            msg: 'Something went wrong - GET CATEGORIES',
            error: error.message
        })
    }
}

const productShow = async (req = request, res = response) => {
    try {
        
        // Destructuring for query params
        const { id } = req.params

        // Searching a product
        const product = await Product.findById(id)
                                        .populate('category', ['name'])
                                        .populate('user', ['name'])
    
        res.status(200).json({
            msg: 'Ok',
            product
        })

    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            msg: 'Something went wrong - GET PRODUCT BY ID',
            error: error.message
        })
    }
}

const productPost = async (req = request, res = response) => {
    try {
        
        // Body destructuring
        const { status, user, ...body} = req.body

        // Check if category exist
        let product = await Product.findOne({ name: body.name })

        if(product){
            return res.status(400).json({
                msg: `The product ${body.name} already exist`
            })
        }

        // Data to create a new product
        const data = {
            ...body,
            name: body.name.toUpperCase(),
            user: req.user._id
        }

        // Create a new record
        product = new Product(data)

        // Save the record
        await product.save()
        
        res.status(201).json({
            msg: `Product ${body.name} created successfully`,
            product
        })

    } catch (error) {
        console.log(error)
        // throw new Error('Something went wrong')

        res.status(500).json({
            msg: 'Something went wrong - CREATE A PRODUCT',
            error: error.message
        })
    }
}

const productPut = async (req = request, res = response) => {
    try {

        // Destructuring for query params
        const { id } = req.params
        
        // Body destructuring
        const { status, user, ...data } = req.body

        data.name = data.name.toUpperCase()
        data.user = req.user.uid

        const product = await Product.findByIdAndUpdate(id, data, {
            new: true
        })

        res.status(200).json({
            msg: `Product ${data.name} updated successfully`,
            product
        })

    } catch (error) {
        console.log(error)
        // throw new Error('Something went wrong')

        res.status(500).json({
            msg: 'Something went wrong - UPDATE PRODUCT',
            error: error.message
        })
    }
}

const productDelete = async (req = request, res = response) => {
    try {
        
        // Destructuring for query params
        const { id } = req.params

        // Searching a product
        const product = await Product.findByIdAndUpdate(
            id, 
            { status: false }, 
            { new: true }
        )
    
        res.status(200).json({
            msg: `Product ${product.name} has been deleted successfully`,
            product
        })

    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            msg: 'Something went wrong - DELETE PRODUCT',
            error: error.message
        })
    }
}

module.exports = {
    productGet,
    productShow,
    productPost,
    productPut,
    productDelete
}