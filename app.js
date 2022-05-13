require('dotenv').config()

const Server = require('./models/server')

// Create an instance of server
const server = new Server()
server.listen()
