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

router.get('/logout', (req, res, next) => {
   req.logout( (err)=>{
    if(err)
        return next(err)
   })
    res.redirect('/')
})
module.exports = router

