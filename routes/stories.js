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
router.post('/', ensureAuth, async (req, res) => {
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

// GET a single story
router.get('/:id', ensureAuth, async (req, res) => {
    try{
        let story = await Story.findById({_id : req.params.id})
            .populate('user')
            .lean()

        if(!story)
            return res.render('error/404')
        res.render('stories/show', {
            story
        })
    } catch(err){
        console.log(err)
        res.render('error/404')
    }
})

// Get the form page for editing the story. GET method.
router.get('/edit/:id', ensureAuth, async (req, res) => {

    try{
        const story = await Story.findOne({ _id : req.params.id}).lean()
        if(!story)
            return res.render('error/404')
        if(req.user.id != story.user)
            res.redirect('/stories')
        else
            res.render('stories/edit',{
                story
            })
    }catch(err){
        console.log(err)
        res.render('error/500')
    }
})

// Update Story - PUT request
router.put('/:id', ensureAuth,async (req, res) => {
    try{
        let story = await Story.findById(req.params.id).lean()
        if(!story){
         return res.render('error/404')
        }
        if(req.user.id != story.user)
             res.redirect('/stories')
         else
             story = await Story.findOneAndUpdate({_id : req.params.id}, req.body, {
                 new: true,
                 runValidators: true
             })
             res.redirect('/dashboard')
    }catch(err){
        console.log(err)
        res.render('error/500')
    }
})

// DELETE - Story
router.delete('/:id', ensureAuth, async(req, res) => {
    try{
        await Story.deleteOne({_id : req.params.id})
        res.redirect('/dashboard')
    }catch(err){
        console.log(err)
        res.render('error/500')
    }
})

// Get a particular Story
module.exports = router

