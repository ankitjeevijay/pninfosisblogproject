const mongoose = require('mongoose')
//const url = "mongodb://127.0.0.1:27017/BlogProject"

const live_Url = "mongodb+srv://ankitjeevijay:ankitjee@cluster0.ew7pch5.mongodb.net/blog"


const ConnectDB = ()=>{
    return mongoose.connect(live_Url)
    //return mongoose.connect(url)
    

    .then(()=>{
        console.log("Database connected....")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports = ConnectDB


