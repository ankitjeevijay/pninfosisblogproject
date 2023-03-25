const express = require('express')
const app = express()
port = 3000
const web = require('./routes/web')
const ConnectDB = require('./db/Connectdb')
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary');
var session = require('express-session')
var flash = require('connect-flash')
//cookies 
const cookieParser = require('cookie-parser')


//Database connection
ConnectDB()

app.use(express.urlencoded({ extended: false }))

// file uploader
app.use(fileUpload({ useTempFiles: true }));

//cookies get
app.use(cookieParser())

//  for flash message
app.use(session({
    secret: 'secret',
    cookie: {maxAge: 60000 },
    resave: false,
    saveUninitialized: false,

}));
 app.use(flash());

//router load
app.use('/', web)


// ejs setup
app.set('view engine', 'ejs')

//public folder render
app.use(express.static('public'))



// server is start
app.listen(port, () => {
    console.log('server is running ok')
})








