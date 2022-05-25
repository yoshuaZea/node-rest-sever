const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { dbConnection } = require('../config/database')

class Server {

    constructor(){
        // Instance of express to create a server
        this.app = express()
        this.port = process.env.PORT
        
        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            search:   '/api/search',
            uploads:      '/api/uploads',
            users:      '/api/users'
        }

        // Connect DB
        this.connectDatabase()

        
        // Middlewares
        this.middlewares()

        // Routes of the application
        this.routes()
    }

    async connectDatabase(){
        await dbConnection()
    }

    middlewares(){
        // Enable CORS
        this.app.use(cors())

        // Enable body parser and read mode (to body request)
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))

        // Fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true // It allows create new directories
        }))

        // Public directory
        this.app.use(express.static('public'))
    }

    routes(){
        // Auth
        this.app.use(this.paths.auth, require('../routes/auth.routes'))

        // Categories
        this.app.use(this.paths.categories, require('../routes/categories.routes'))

        // Products
        this.app.use(this.paths.products, require('../routes/products.routes'))

        // Search
        this.app.use(this.paths.search, require('../routes/search.routes'))
        
        // Uploads
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'))

        // Users
        this.app.use(this.paths.users, require('../routes/user.routes'))
        
        // Errors
        this.app.use('*', require('../routes/errors.routes'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Application running on http://localhost:${this.port}`)
        })
    }
}

module.exports = Server