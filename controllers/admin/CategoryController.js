const { json } = require('express');
const CategoryModel = require('../../models/Category')


class CategoryController {

    static displayCategory = async (req, res) => {

        try {

            const data = await CategoryModel.find()
            // console.log(data)

            res.render('admin/category/display', { d: data })

        } catch (error) {

            console.log(error)
        }

    }

    static insertCategory = async (req, res) => {
        try {

            const result = new CategoryModel({
                cat_name: req.body.cat_name
            })
            await result.save()
            res.redirect('/admin/categorydisplay')


        } catch (error) {

            console.log(error)
        }
    }

    static categoryView = async (req, res) => {
        try {
            //console.log(req.params.id)
            const result = await CategoryModel.findById(req.params.id)
            //console.log(result)
            res.render('admin/category/catview', { view: result })
        } catch (error) {
            console.log(error)
        }
    }

    static categoryEdit = async (req, res) => {
        const edit = await CategoryModel.findById(req.params.id)
        // console.log(edit)
        res.render('admin/category/catedit', { E: edit })
    }

    static categoryUpdate = async (req, res) => {
        try {
            // console.log(req.body)
            // console.log(req.params.id)
            const update = await CategoryModel.findByIdAndUpdate(req.params.id, {
                cat_name: req.body.cat_name
            })
            await update.save()
            res.redirect('/admin/categorydisplay')


        } catch (error) {
            console.log(error)
        }
    }
    
    static categoryDelete = async (req, res) => {
        try {

            const result = await CategoryModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/categorydisplay')

        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = CategoryController