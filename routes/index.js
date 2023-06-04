const express = require("express")
const router = express.Router()
const {ensureAuth, ensureGuest} = require("../middlewares/auth")
const Story = require("../models/Story")
// For LOGIN / LANDING page
router.get('/', ensureGuest, (req, res) => {   // Ensure guest because - if a logged in user is trying to go to the home page(that is login page) we shouldn't allow. Because the user is already logged in. So this middleware is to ensure that that doesn't happen.
    res.render('login', {
        layout:'login',
    })
})

// For DASHBOARD page
router.get('/dashboard', ensureAuth, async (req, res) => {

    try{
        const stories = await Story.find({user : req.user.id}).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        })
    }catch( err ) {
        console.log(err)
        res.render('error/500')
    }
    
})

module.exports = router

