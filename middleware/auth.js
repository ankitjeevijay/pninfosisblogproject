const jwt = require('jsonwebtoken')

const AdminModel = require('../models/admin')

const AdminAuth = async (req, res, next) => {
    try {

        // console.log("hello middleware")
        const { token } = req.cookies
        //console.log(token)
        const verifyToken = jwt.verify(token, 'ankityadav123')

        const admin = await AdminModel.findOne({ _id: verifyToken.id })
        //console.log(admin)
        req.admin = admin
        next()

    } catch (error) {
        req.flash('error', 'unauthorizes admin')
        res.redirect('/login')
    }


}
module.exports = AdminAuth