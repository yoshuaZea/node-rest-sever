const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../config/database')

class Server {

    constructor(){
        // Instance of express to create a server
        this.app = express()
        this.port = process.env.PORT
        this.userRoutePath = '/api/users'

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

        // Public directory
        this.app.use(express.static('public'))
    }

    routes(){
        // Users
        this.app.use(this.userRoutePath, require('../routes/user.routes'))
        
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