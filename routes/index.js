const express = require("express")
const router = express.Router()
const {ensureAuth, ensureGuest} = require("../middlewares/auth")

// For LOGIN / LANDING page
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout:'login',
    })
})



// For DASHBOARD page
router.get('/dashboard', ensureAuth, (req, res) => {
   
    res.render('dashboard')
})

module.exports = router

