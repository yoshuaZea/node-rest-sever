const verifyUploadedFile = (req, res, next) => {
    // Verify if existe a file on the request
    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No files were uploaded. - Verify uploaded file'
        })
    }

    next()
}

module.exports = {
    verifyUploadedFile
}