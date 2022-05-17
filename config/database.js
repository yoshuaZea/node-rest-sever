const mongoose = require('mongoose')

const dbConnection = async () => {
    try {

        // Create a new connection
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        })

        console.log('Mongo database connected')
        
    } catch (error) {
        console.log(error)
        throw new Error('Something went wrong with the database')
    }
}

module.exports = {
    dbConnection
}