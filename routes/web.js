const express = require('express')
const AboutController = require('../controllers/admin/AboutController')
const AdminController = require('../controllers/admin/admincontroller')
const BlogController = require('../controllers/admin/BlogController')
const CategoryController = require('../controllers/admin/CategoryController')
const ContactController = require('../controllers/admin/ContactController')
const DetailsController = require('../controllers/admin/DetailsController')

const router = express.Router()
const FrontController = require('../controllers/FrontController')
const TeacherController = require('../controllers/TeacherController')
const AdminAuth = require('../middleware/auth')

// route frontController
router.get('/', FrontController.home)
router.get('/about', FrontController.about)
router.get('/contact', FrontController.contact)
router.get('/blog', FrontController.blog)
router.get('/login', FrontController.login)
router.get('/registration', FrontController.registration)
router.get('/details/:id', FrontController.detail)

// contact controller
router.post('/insertcontact', ContactController.insertContact)
router.get('/contactview/:id', ContactController.contactView)
router.get('/contactdelete/:id', ContactController.contactDelete)


//admin controller
router.get('/admin/dashboard', AdminAuth, AdminController.dashboard)
router.post('/aminregister', AdminController.adminRegister)
router.post('/veryfylogin', AdminController.veryfyLogin)
router.get('/logout', AdminController.logout)

// Blog controller
router.get('/admin/blogdisplay',  AdminAuth, BlogController.displayBlog)
router.post('/insertblog',  AdminAuth, BlogController.insertblog)
router.get('/blogview/:id',  AdminAuth, BlogController.blogview)
router.get('/blogedit/:id',  AdminAuth, BlogController.blogedit)
router.post('/blogupdate/:id',  AdminAuth, BlogController.blogupdate)
router.get('/blogdelete/:id',  AdminAuth, BlogController.blogdelete)

// category controller
router.get('/admin/categorydisplay',  AdminAuth, CategoryController.displayCategory)
router.post('/insertCategory',  AdminAuth, CategoryController.insertCategory)
router.get('/categoryView/:id',  AdminAuth, CategoryController.categoryView)
router.get('/categoryEdit/:id',  AdminAuth, CategoryController.categoryEdit)
router.post('/categoryupdate/:id',  AdminAuth, CategoryController.categoryUpdate)
router.get('/categoryDelete/:id',  AdminAuth, CategoryController.categoryDelete)


// Contact controller
router.get('/admin/displaycontact',  AdminAuth,ContactController.displayContact)

// About controller
router.get('/admin/displayabout', AdminAuth, AboutController.displayAbout)
router.get('/admin/aboutview/:id', AdminAuth, AboutController.aboutView)
router.post('/admin/aboutinsert',  AdminAuth, AboutController.aboutInsert)
router.get('/admin/aboutedit/:id',  AdminAuth, AboutController.aboutEdit)
router.post('/admin/aboutupdate/:id', AdminAuth, AboutController.aboutUpdate)
router.get('/admin/aboutdelete/:id', AdminAuth, AboutController.aboutDelete)
// Details controller
router.get('/admin/displaydetails',  AdminAuth, DetailsController.displayDetails)






//TeacherController

router.get('/teacher/display', TeacherController.display)

module.exports = router
