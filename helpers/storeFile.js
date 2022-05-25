const path = require('path')
const { v4: uuid } = require('uuid')

const storeFile = (files, extensionsAllowed = ['png', 'jpg', 'jpeg', 'gif'], dirname = '') => {
    return new Promise((resolve, reject) => {
        if(!files.file) {
            return reject('No files were uploaded.')
        }
    
        // Destructuring
        const { file } = files
    
        // Get type of extension
        const nameCutted = file.name.split('.')
        const extensionFile = nameCutted[nameCutted.length -1]
    
        if(!extensionsAllowed.includes(extensionFile)){
            return reject(`The extension ${extensionFile} is not allowed, it is just allowed ${extensionsAllowed}`)
        }
    
        // Temp name and rename file
        const tempName = uuid() + `.${extensionFile}`
    
        // Route where it will be store the file
        const uploadPath = path.join(__dirname, '../uploads/', dirname, tempName)
    
        // Move file to route uploads
        file.mv(uploadPath, (err) => {
            if (err) {
                return reject('No files were uploaded.')
            }
    
            // Success response
            resolve(tempName)
        })
    })
}

module.exports = {
    storeFile
}