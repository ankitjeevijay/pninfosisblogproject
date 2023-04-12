const { json } = require('express');
const AboutModel = require('../../models/About')
const cloudinary = require('cloudinary').v2;



cloudinary.config({
  cloud_name: 'dkwdscz4l',
  api_key: '388856688969765',
  api_secret: '7S0v5WOk8Yw-0QyIr1HjBj1Wifw',

});



class AboutController {

  static displayAbout = async (req, res) => {
    try {
      const display = await AboutModel.find()
      res.render('admin/about/display', { d: display,message:req.flash('error') })
    } catch (error) {
      console.log(error)
    }

  }
  static aboutView = async (req, res) => {
    try {

      const view = await AboutModel.findById(req.params.id)
      res.render('admin/about/aboutview', { d: view })

    } catch (error) {
      console.log(error)
    }
  }
  static aboutInsert = async (req, res) => {
    try {

      //console.log(req.files.image)
      const {description, image} = req.body
      if(description && image){
        const file = req.files.image
        //   //console.log(file)
           const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
             folder: 'blogImage'
 
         })
 
       const insert = await AboutModel({
         description: req.body.description,
         image: {
           public_id: myimage.public_id,
           url: myimage.secure_url
       }
       })
       await insert.save()
       res.redirect('/admin/displayabout')
      }else{
        req.flash('error', 'All field are required')
        res.redirect('/admin/displayabout')
      }
       
    } catch (error) {
      console.log(error)
    }
  }
  static aboutEdit = async (req, res) => {
    try {

      const edit = await AboutModel.findById(req.params.id)
      res.render('admin/about/aboutedit', { d: edit })

    } catch (error) {
      console.log(error)
    }
  }
  static aboutUpdate = async (req, res) => {
    try {

       //first delete the image
       const about = await AboutModel.findById(req.params.id)
       const imageid = about.image.public_id
      // console.log(imageid)
      await cloudinary.uploader.destroy(imageid)

       //second update iamge
       const file = req.files.image
       const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
        folder: 'blogImage'

       })


      const update = await AboutModel.findByIdAndUpdate(req.params.id, {
        description: req.body.description,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url
      }
      })
      await update.save()
      res.redirect('/admin/displayabout')

    } catch (error) {
      console.log(error)
    }
  }
  static aboutDelete = async (req, res)=>{
    try{

       //delete image code
       const blog = await AboutModel.findById(req.params.id)
       const imageid = blog.image.public_id
       // console.log(imageid)
       await cloudinary.uploader.destroy(imageid)

      const result = await AboutModel.findByIdAndDelete(req.params.id)
      res.redirect('/admin/displayabout')

    }catch(error){
      console.log(error)
    }
  }





}

module.exports = AboutController