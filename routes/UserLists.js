const jsonschema = require('jsonschema')

const express = require('express')

const axios = require('axios');

// const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
// const { BadRequestError } = require("../expressError");
// const { createToken } = require("../helpers/tokens");
// const userNewSchema = require("../schemas/userNew.json");
// const userUpdateSchema = require("../schemas/userUpdate.json");

const UserListModel = require('../Models/UserListModel')

const router = express.Router();

router.get('/grocery/getItems/:username', async (req, res, next) => {
    try{
        const username = req.params.username
        let response = await UserListModel.getGroceries(username)
        return res.json(response)
    }catch (err){
        return next(err)
    }
})

router.post('/grocery/addItem', async (req, res, next) => {
    try{
        const username = req.body.username
        const item_id = req.body.item_id
        const title = req.body.title
        let response = await UserListModel.addGroceries(username, title, item_id)
        return res.json(response)
    }catch (err){
        return next(err)
    }
})

router.get('/recipes/getId/:recipeName', async (req, res, next) => {
    try{
        let recipeName = req.params.recipeName
        let response = await UserListModel.getRecipeId(recipeName)
        return res.json(response)
    }catch (err){
        return next(err)
    }
})

router.get('/recipes/getRecipes/:username', async (req, res, next) => {
    try{
        let username = req.params.username
        let response = await UserListModel.getRecipes(username)
        return res.json(response)
    }catch (err){
        return next(err)
    }
})

router.post('/recipes/addRecipe', async (req, res, next) => {
    try{
        let username = req.body.username
        let recipe_id = req.body.recipe_id
        let recipe_name = req.body.recipe_name
        let response = await UserListModel.addFavoriteRecipe(username, recipe_id, recipe_name)
        return res.json(response)
    }catch (err){
        return next(err)
    }
})

module.exports = router