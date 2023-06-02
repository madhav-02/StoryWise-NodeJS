const express = require("express")
const dotenv = require("dotenv")
const conncetDB = require("./config/db")
const morgan = require("morgan")
dotenv.config({ path: './config/config.env'})

conncetDB()
const app = express()

if(process.env.NODE_ENV === 'development') {  // Shows HTTP methods and response in console.
    app.use(morgan('dev'))
}

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in - ${process.env.NODE_ENV} mode on port - ${PORT}`))