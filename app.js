const path = require('path')
const express = require("express")
const dotenv = require("dotenv")
const conncetDB = require("./config/db")
const morgan = require("morgan")
const exphandlebars = require("express-handlebars")
const session = require("express-session")
const MongoStore = require('connect-mongo')(session)
const passport = require("passport")
const mongoose = require('mongoose');
const methodOverride = require("method-override")

// Loading config details
dotenv.config({ path: './config/config.env'})

// Load Passport Config
require("./config/passport")(passport)


// Conencting to MongoDB 
conncetDB()

const app = express()

// Body parser
app.use(express.urlencoded({extended : false}))
app.use(express.json())

//Method Override
app.use(methodOverride( (req, res) =>{
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    let method = req.body._method
    delete req.body._method
    return method
  }
}))

// Only in development mode
if(process.env.NODE_ENV === 'development') {  // Shows HTTP methods and response in console.
    app.use(morgan('dev'))
}

// Handlebars helpers
const { formatDate, truncate, stripTags, editIcon, select } = require("./helpers/handlebarhelper")

// Handlebars - It is a template engine - to generate dynamic HTML
app.engine('.hbs', exphandlebars.engine({helpers: {formatDate, truncate, stripTags, editIcon, select}, defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs')

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Set gloabal Variable
app.use( (req, res, next) => {
  res.locals.user = req.user || null
  next()
})

// Static folders
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'))

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in - ${process.env.NODE_ENV} mode on port - ${PORT}`))