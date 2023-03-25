const AdminModel = require('../../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




class AdminController{

    static dashboard = async (req, res)=>{
        try{
            const {name,email} = req.admin
            res.render('admin/dashboard',{n:name,e:email})
        }catch(error){
            console.log(error)
        }
       
    }

    static adminRegister = async (req, res)=>{
        try{
           
            const {name,email,password,confirmpassword} = req.body
            const admin = await AdminModel.findOne({email:email})

            if(admin){
                req.flash('error', 'Email already exists')
                res.redirect('/registration')
            }else{
                if(name && email && password && confirmpassword){
                    if(password == confirmpassword){

                        const hashpassword = await bcrypt.hash(password,10)

                        const register = await AdminModel({
                            name: name,
                            email: email,
                            password: hashpassword
                           
                        })
                        await register.save()
                        res.redirect('/login')

                    }else{
                        req.flash('error', 'password and confirmpassword does not match')
                        res.redirect('/registration')
                    }
                    
                }else{
                    req.flash('error', 'All field are required')
                    res.redirect('/registration')

                }

            }
           
        }catch(error){
            console.log(error)
        }
    }
    static veryfyLogin = async (req, res)=>{
        try{
           // console.log(req.body)
           const {email, password} = req.body
           if(email && password){
            
            const admin = await AdminModel.findOne({email:email})
            if(admin != null){

                const ismatched = await bcrypt.compare(password,admin.password)

                if(ismatched){
                    //generate jwt
                    const token = jwt.sign({id:admin._id}, 'ankityadav123')
                   // console.log(token)
                   res.cookie('token',token)
                    res.redirect('/admin/dashboard')

                }else{

                    req.flash('error', 'Email or password is incorrect')
                    res.redirect('/login')
                }

            }else{
                req.flash('error', 'You are nat register user')
                 res.redirect('/login')
            }

           }else{
            req.flash('error', 'All field are required')
            res.redirect('/login')

           }

        }catch(error){
            console.log(error)
        }
    }
    static logout = async (req, res)=>{
        try{
            res.clearCookie('token')
            res.redirect('/login')

        }catch(error){
            console.log(error)
        }
    }



}
module.exports = AdminController