const jsonschema = require('jsonschema')

const express = require('express')

const axios = require('axios');

// const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
// const { BadRequestError } = require("../expressError");
// const { createToken } = require("../helpers/tokens");
// const userNewSchema = require("../schemas/userNew.json");
// const userUpdateSchema = require("../schemas/userUpdate.json");

const UserPosts = require('../Models/UserPosts')

const router = express.Router();


router.get('/user/allPosts', async (req, res, next) => {
    console.log('inroute')
    try{
        let response = await UserPosts.getAllPosts();
        console.log(response)
        return res.json(response)
    }catch(err){
        return next(err)
    }
})

router.get('/user/getPosts/:username', async (req, res, next) => {
    try{
        let username = req.params.username
        let response = await UserPosts.getUserPosts(username)
        return res.json(response)
    }catch(err){
        return next(err)
    }
})

router.post('/user/addPost', async (req, res, next) => {
    try{
        let {post_title, post_text, username, recipeToShare, recipe_url} = req.body
        let response = await UserPosts.addPost(username, post_text, post_title, recipeToShare, recipe_url);
        // return res.json(response)
    }catch (err){
        return next(err)
    }
})

router.post('/addComment', async (req, res, next) => {
    try{
        let username = req.body.username
        let comment = req.body.comment
        let postId = req.body.postId
        let response = await UserPosts.addComment(username, comment, postId)
        if(response){
            return res.json('success')
        }
    }catch(err){
        return next(err)
    }
})

router.get('/getComments/:postId', async (req, res, next) => {
    try{
        let postId = req.params.postId
        let response = await UserPosts.getComments(postId)
        return res.json(response)
    }catch(err){
        return next(err)
    }
})

module.exports = router