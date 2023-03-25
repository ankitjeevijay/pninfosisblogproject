const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/BlogProject"




const ConnectDB = ()=>{
    return mongoose.connect(url)

    .then(()=>{
        console.log("Database connected....")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports = ConnectDB


