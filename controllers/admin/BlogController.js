
const { json } = require('express');
const BlogModel = require('../../models/Blog')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dkwdscz4l',
    api_key: '388856688969765',
    api_secret: '7S0v5WOk8Yw-0QyIr1HjBj1Wifw',

});

class BlogController {

    static displayBlog = async (req, res) => {

        const data = await BlogModel.find();
        res.render('admin/blog/display', { d: data })

    }

    static insertblog = async (req, res) => {
        try {

            const file = req.files.image
            //console.log(imagefile)
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'blogImage',

            })
            //console.log(myimage)
            // console.log(req.body)
            const{title, description,image} = req.body
            if(title, description, image){
                const result = new BlogModel({
                    title: req.body.title,
                    description: req.body.description,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url
                    }
                })
                await result.save()
                 //console.log(result)
                res.redirect('/admin/blogdisplay')
            }else{
                req.flash('error','All Fields are required')
                res.redirect('/admin/blogdisplay',res.redirect('/admin/blogdisplay'))
            }
           
        } catch (error) {

            console.log(error)

        }
    }

    static blogview = async (req, res) => {
        try {
            // console.log(req.params.id)
            const result = await BlogModel.findById(req.params.id)
            //console.log(result)
            res.render('admin/blog/view', { view: result })

        } catch (error) {
            console.log(error)
        }
    }

    static blogedit = async (req, res) => {
        try {
            //console.log(req.params.id)
            const result = await BlogModel.findById(req.params.id)
            // console.log(result)
            res.render('admin/blog/edit', { edit: result })

        } catch (error) {
            console.log(error)
        }
    }

    static blogupdate = async (req, res) => {
        try {
            // console.log(req.body)
            // console.log(req.params.id)
            //first delete the image
            const blog = await BlogModel.findById(req.params.id)
            const imageid = blog.image.public_id
           // console.log(imageid)
           await cloudinary.uploader.destroy(imageid)

           //second update iamge
           const file = req.files.image
           const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
            folder: 'blogImage'

           })

             const result = await BlogModel.findByIdAndUpdate(req.params.id, {
                 title: req.body.title,
                 description: req.body.description,
                 image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                }
             })

             await result.save()
               res.redirect('/admin/blogdisplay')


        } catch (error) {
            console.log(error)
        }
    }

    static blogdelete = async (req, res) => {
        try {

            //delete image code
            const blog = await BlogModel.findById(req.params.id)
            const imageid = blog.image.public_id
            // console.log(imageid)
            await cloudinary.uploader.destroy(imageid)

            const result = await BlogModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/blogdisplay')


        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = BlogController