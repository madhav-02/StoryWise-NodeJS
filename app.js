const express = require("express")
const dotenv = require("dotenv")
const conncetDB = require("./config/db")
const morgan = require("morgan")
const exphandlebars = require("express-handlebars")

// Loading config details
dotenv.config({ path: './config/config.env'})

// Conencting to MongoDB 
conncetDB()

const app = express()

// Only in development mode
if(process.env.NODE_ENV === 'development') {  // Shows HTTP methods and response in console.
    app.use(morgan('dev'))
}

// Handlebars - It is a template engine - to generate dynamic HTML
app.engine('.hbs', exphandlebars.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs')

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in - ${process.env.NODE_ENV} mode on port - ${PORT}`))