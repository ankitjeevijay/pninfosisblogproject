const mongoose = require('mongoose')



//define schema
const CategorySchema = new mongoose.Schema({
    cat_name:{

        type: String,
        required: true
    }
   
},{timestamps:true})

//  create collection

// category is name of collection
// categoryschema is the field of Category collection
const CategoryModel = mongoose.model('category',CategorySchema)

module.exports = CategoryModel