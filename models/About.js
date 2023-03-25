const mongoose = require('mongoose')


const AboutSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String
        },

        url: {
            type: String
        }


    }

    
},{timestamps: true})




const AboutModel = mongoose.model('about',AboutSchema)

module.exports = AboutModel
