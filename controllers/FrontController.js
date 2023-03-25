const AboutModel = require('../models/About')
const BlogModel = require('../models/Blog')
const CategoryModel = require('../models/Category')


class FrontController{

    static  home = async (req, res)=>{
        try{
            const blogs = await BlogModel.find().sort({_id:-1}).limit(8)
           // console.log(blogs)
            res.render('home',{b:blogs})

        }catch(error){
            console.log(error)
        }
       
    }


    static  about = async (req, res)=>{
        try{

            const about = await AboutModel.find()
           // console.log(about)
            res.render('about',{d:about})

        }catch(error){
            console.log(error)
        }
       
    }



    static contact = (req, res)=>{
        res.render('contact')
    }

    static blog = async (req, res)=>{
        try{ 
            
            const blog = await BlogModel.find().sort({_id:-1})
            res.render('blog',{b:blog})

        }catch(error){
            console.log(error)
        }
       
    }

    static login =async (req, res)=>{ 
        try{
            
            res.render('login',{message:req.flash('error')})
        }catch(error){
            console.log(error)
        }
       
    }




    static detail = async (req, res)=>{
        try{
            const blog = await BlogModel.findById(req.params.id) 
            const blogs = await BlogModel.find().sort({_id:-1}).limit(4)
            const category = await CategoryModel.find().sort({_id:-1}).limit(4)
            //console.log(category)
             res.render('readmore',{b:blogs, cat:category, v:blog})
        }catch(error){
            console.log(error)
        }
       
    }

    static registration =async (req, res)=>{
        try{

            res.render('registration',{message:req.flash('error')})
        }catch(error){
            console.log(error)
        }
       
    }
}

module.exports = FrontController