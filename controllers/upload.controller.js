const { request, response } = require('express')
const fs = require('fs')
const path = require('path')

// Cloudinary
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { storeFile } = require('../helpers')
const { Product, User } = require('../models')



const uploadFilePreviousVersion = (req = request, res = response) => {
    try {
        // Verify if existe a file on the request
        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                msg: 'No files were uploaded.'
            })
        }

        if(!req.files.file) {
            return res.status(400).json({
                msg: 'No files were uploaded.'
            })
        }

        // Destructuring
        const { file } = req.files

        // Get type of extension
        const nameCutted = file.name.split('.')
        const extensionFile = nameCutted[nameCutted.length -1]


        // Verify extensions allowed
        const extensionsAllowed = ['png', 'jpg', 'jpeg', 'gif']

        if(!extensionsAllowed.includes(extensionFile)){
            return res.status(400).json({
                msg: `The extension ${extensionFile} is not allowed, it is just allowed ${extensionsAllowed}`
            })
        }

        // Temp name and rename file
        const tempName = uuid() + `.${extensionFile}`

        // Route where it will be store the file
        const uploadPath = path.join(__dirname, '../uploads/', tempName)

        // Move file to route uploads
        file.mv(uploadPath, (err) => {
            if (err) {
                return res.status(500).json({
                    msg: 'No files were uploaded.',
                    error: err
                })
            }

            // Success response
            res.status(200).json({
                msg: `File uploaded to ${uploadPath}`
            })
        
        })

    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            msg: 'Something went wrong - UPLOAD FILE',
            error: error.message
        })
    }
}

const uploadFile = async (req = request, res = response) => {
    try {
        // Use helper
        const pathFile = await storeFile(req.files, undefined, 'users')

        res.status(200).json({
            fileName: pathFile
        })

    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            msg: 'Something went wrong - UPLOAD FILE',
            error
        })
    }
}

const updateImage = async (req = request, res = response) => {
    try {

        // Destructuring
        const { collection, id } = req.params

        let model

        switch (collection) {
            case 'products':
                model = await Product.findById(id)

                if(!model){
                    return res.status(400).json({
                        msg: `The product does not exist with id: ${id}`
                    })
                }
                break
            case 'users':
                model = await User.findById(id)

                if(!model){
                    return res.status(400).json({
                        msg: `The user does not exist with id: ${id}`
                    })
                }
                break
            default:
                res.status(500).json({
                    msg: 'Contact support to solve this problem - Upload file'
                })
                break
        }

        // Delete previous image
        if(model.image){
            // Get full path
            const pathImage = path.join(__dirname, '../uploads', model.image)

            // If file exists, delete it
            if(fs.existsSync(pathImage)){
                fs.unlinkSync(pathImage)
            }
        }

        // Upload and update image
        const image = await storeFile(req.files, undefined, collection)
        model.image = `${collection}/${image}`

        // Save the changes
        await model.save()

        // Response
        res.status(200).json({
            model
        })
        
    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            msg: 'Something went wrong - UPDATE IMAGE',
            error
        })
    }
}

const updateImageCloudinary = async (req = request, res = response) => {
    try {

        // Destructuring
        const { collection, id } = req.params

        let model

        switch (collection) {
            case 'products':
                model = await Product.findById(id)

                if(!model){
                    return res.status(400).json({
                        msg: `The product does not exist with id: ${id}`
                    })
                }
                break
            case 'users':
                model = await User.findById(id)

                if(!model){
                    return res.status(400).json({
                        msg: `The user does not exist with id: ${id}`
                    })
                }
                break
            default:
                res.status(500).json({
                    msg: 'Contact support to solve this problem - Upload file'
                })
                break
        }

        // Delete previous image
        if(model.image){
            const nameArr = model.image.split('/')
            const name = nameArr[nameArr.length - 1]
            const [ public_id ] = name.split('.')

            // Delete imagen from cloud
            cloudinary.uploader.destroy(public_id)
        }

        // Destructuring 
        const { tempFilePath } = req.files.file

        // Upload to cloudinary, it recieves a path where an image is
        const resp = await cloudinary.uploader.upload(tempFilePath)
        const { secure_url } = resp

        // Upload and update image
        model.image = secure_url

        // // Save the changes
        await model.save()

        // Response
        res.status(200).json({
            model
        })
        
    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            msg: 'Something went wrong - UPDATE IMAGE',
            error
        })
    }
}

const showImage = async (req = request, res = response) => {
    try {

        // Destructuring
        const { collection, id } = req.params

        let model

        // Default image
        const pathImage = path.join(__dirname, '../assets/no-image.jpg')

        switch (collection) {
            case 'products':
                model = await Product.findById(id)

                if(!model){
                    return res.sendFile(pathImage)
                }
                break
            case 'users':
                model = await User.findById(id)

                if(!model){
                    return res.sendFile(pathImage)
                }
                break
            default:
                res.status(500).json({
                    msg: 'Contact support to solve this problem - Upload file'
                })
                break
        }

        // Delete previous image
        if(model.image){
            // Get full path
            const pathImage = path.join(__dirname, '../uploads', model.image)

            if(fs.existsSync(pathImage)){
                // Response
                return res.sendFile(pathImage)
            }
        }

        
        return res.sendFile(pathImage)
        // res.status(200).json({
        //     msg: 'Falta placeholder...'
        // })

    } catch (error) {
        console.log(error)
        
        res.status(500).json({
            msg: 'Something went wrong - SHOW IMAGE',
            error
        })
    }
}

module.exports = {
    uploadFile,
    updateImage,
    updateImageCloudinary,
    showImage
}