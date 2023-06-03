const express = require("express")
const router = express.Router()
const passport = require("passport")

// Authenticate with google - GET /auth/google
router.get('/google', passport.authenticate('google',{ scope: ['profile'] }));        // This entire was present in docs

// Google Auth callback

router.get('/google/callback', passport.authenticate('google', {failureRedirect:'/'}) ,
(req,res)=>{
    res.redirect('/dashboard')
}
)


module.exports = router

