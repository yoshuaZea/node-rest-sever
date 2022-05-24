const { request, response } = require("express")

const { Category } = require('../models')

const categoryGet = async (req = request, res = response) => {
    try {
        
        // Destructuring for query params
        const { page = 0, limit = 5} = req.query

        const query = {
            status: true
        }
    
        const responses = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .populate('user', ['name', 'email'])
                .skip(Number(page))
                .limit(Number(limit))
        ])

        // Array destructuring
        const [total, categories] = responses
    
        res.status(200).json({
            msg: 'Ok',
            total,
            categories
        })

    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            msg: 'Something went wrong - GET CATEGORIES',
            error: error.message
        })
    }
}

const categoryShow = async (req = request, res = response) => {
    try {
        
        // Destructuring for query params
        const { id } = req.params

        // Searching a category
        const category = await Category.findById(id).populate('user', ['name', 'email'])
    
        res.status(200).json({
            msg: 'Ok',
            category
        })

    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            msg: 'Something went wrong - GET CATEGORY BY ID',
            error: error.message
        })
    }
}

const categoryPost = async (req = request, res = response) => {
    try {
        
        // Body destructuring
        const name = req.body.name.toUpperCase()

        // Check if category exist
        let category = await Category.findOne({ name })

        if(category){
            return res.status(400).json({
                msg: `The category ${name} already exist`
            })
        }

        // Data to create a new category
        const data = {
            name,
            user: req.user._id
        }

        // Create a new record
        category = new Category(data)

        // Save the record
        await category.save()
        
        res.status(201).json({
            msg: `Category ${name} created successfully`,
            category
        })

    } catch (error) {
        console.log(error)
        // throw new Error('Something went wrong')

        res.status(500).json({
            msg: 'Something went wrong - CREATE A CATEGORY',
            error: error.message
        })
    }
}

const categoryPut = async (req = request, res = response) => {
    try {

        // Destructuring for query params
        const { id } = req.params
        
        // Body destructuring
        const { status, user, ...data } = req.body

        data.name = data.name.toUpperCase()
        data.user = req.user.uid

        const category = await Category.findByIdAndUpdate(id, data, {
            new: true
        })

        res.status(200).json({
            msg: `Category ${data.name} updated successfully`,
            category
        })

    } catch (error) {
        console.log(error)
        // throw new Error('Something went wrong')

        res.status(500).json({
            msg: 'Something went wrong - UPDATE CATEGORY',
            error: error.message
        })
    }
}

const categoryDelete = async (req = request, res = response) => {
    try {
        
        // Destructuring for query params
        const { id } = req.params

        // Searching a category
        const category = await Category.findByIdAndUpdate(
            id, 
            { status: false }, 
            { new: true }
        )
    
        res.status(200).json({
            msg: `Category ${category.name} has been deleted successfully`,
            category
        })

    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            msg: 'Something went wrong - DELETE CATEGORY',
            error: error.message
        })
    }
}

module.exports = {
    categoryGet,
    categoryShow,
    categoryPost,
    categoryPut,
    categoryDelete
}