const mongoose = require('mongoose')



//define schema
const ContactSchema = new mongoose.Schema({
    userName: {

        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true 
    },
    userAddress: {
        type: String,
        required: true
    }

}, { timestamps: true })

//  create collection

// contact is name of collection
// contactschema is the field of blog collection
const ContactModel = mongoose.model('contact', ContactSchema)

module.exports = ContactModel