const ContactModel = require('../../models/contact')

class ContactController{

    static displayContact = async (req, res)=>{
        try{
            const result = await ContactModel.find()
            res.render('admin/contact/display',{d:result})
        }catch(error){
            console.log(error)
        }
    }

    static insertContact = async (req, res)=>{
        try{
            
            const insert = await ContactModel({
                userName: req.body.userName,
                emailId: req.body.emailId,
                mobileNo: req.body.mobileNo,
                userAddress: req.body.userAddress
            })
           // console.log(insert)
            await insert.save()
            res.redirect('/')


        }catch(error){
            console.log(error)
        }
    }
    static contactView = async (req, res)=>{
        try{
            const view = await ContactModel.findById(req.params.id)
            res.render('admin/contact/view',{d:view})

        }catch(error){
            console.log(error)
        }
    }

   static contactDelete = async (req, res)=>{
    try{

        const result = await ContactModel.findByIdAndDelete(req.params.id)
        res.redirect('/admin/displaycontact')

    }catch(error){
        console.log(error)
    }
   }

   







}

module.exports = ContactController