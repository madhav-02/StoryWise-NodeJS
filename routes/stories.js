const express = require("express")
const router = express.Router()
const {ensureAuth} = require("../middlewares/auth")
const Story = require("../models/Story")
const { route } = require("./auth")


// Get req /stories/add to show add story page.
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

// Post req to add stories
router.get('/stories', ensureAuth, async (req, res) => {
    try{
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    }catch( err ){
        console.log(err)
        res.render('error/500')
    }
})

// Get all public stories
router.get('/', ensureAuth, async (req, res) => {
    try{
        const stories = await Story.find({status: 'public'})
            .populate('user')
            .sort({createdAt: 'desc'})
            .lean()

        res.render('stories/index', {
            stories
        })
    }catch(err){
        console.log(err)
        res.render('error/500')
    }
})
module.exports = router

