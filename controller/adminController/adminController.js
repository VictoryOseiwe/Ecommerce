
const mongoose = require('mongoose')
const productSchema = require('../../model/productSchema')
const categorySchema = require('../../model/categorySchema')
const userSchema = require('../../model/userSchema')



// render the login page for admin only if the admin's session is not present 
const admin = (req, res) => {
    res.redirect('/admin/login')
}



// render the login page for admin only if the admin's session is not present 
const login = (req, res) => {
    if (req.session.admin) {
        res.redirect('/admin/dashboard')
    } else {
        res.render('admin/login', { title: "Admin Login", alertMessage: "" })
    }
}


// login with admin's username and password
const loginPost = (req, res) => {
    if (req.body.username === process.env.ADMIN_USERNAME && req.body.password === process.env.ADMIN_PASSWORD) {
        req.session.admin = req.body.username;
        res.redirect('/admin/dashboard')
    } else {
        res.render('admin/login', { title: "Admin Login", alertMessage: "Invalid username or password" })
    }
}


// rendering the dashboard page
const dashboard = async (req, res) => {

    // customer details and count
    const customerCount = await userSchema.find().countDocuments();
    const activeCustomer = await userSchema.find({ isBlocked: false }).countDocuments()
    // category details and count
    const categoryCount = await categorySchema.find().countDocuments();
    const activeCategory = await categorySchema.find({ isActive: true }).countDocuments();
    // product details and count
    const productsCount = await productSchema.find().countDocuments();
    const activeProducts = await productSchema.find({ isActive: true }).countDocuments();

    const stats = {
        customerCount,
        activeCustomer,
        categoryCount,
        activeCategory,
        productsCount,
        activeProducts
    }

    res.render('admin/dashboard', { title: "Admin Dashboard", alertMessage: req.flash('errorMessage'), stats })

}


// render the order page 
const order = (req, res) => {

    res.render('admin/order', { title: "Order list", alertMessage: req.flash('errorMessage') })

}



// render the coupons page 
const coupons = (req, res) => {

    res.render('admin/coupons', { title: "Coupons", alertMessage: req.flash('errorMessage') })

}



// logout the admin session and redirect to the login page
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(`Error occurred while destroying the session ${err}`)
        } else {
            res.redirect('/admin/login')
        }
    })
}



module.exports = {
    login,
    admin,
    dashboard,
    order,
    coupons,
    loginPost,
    logout,

}