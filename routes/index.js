const express = require("express")
const router = express.Router()


// For LOGIN / LANDING page
router.get('/', (req, res) => {
    res.render('login', {
        layout:'login',
    })
})



// For DASHBOARD page
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

module.exports = router

