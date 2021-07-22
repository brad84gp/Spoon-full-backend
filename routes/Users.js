const jsonschema = require('jsonschema')

const express = require('express')

const { createToken } = require('../creaters/createToken')

const User = require("../Models/User")

const userJsonSchema = require('../jsonSchemas/userJsonSchema.json')
const userLoginJsonSchema = require('../jsonSchemas/userLoginJsonSchema.json')
const { ExpressError } = require('../expressError')

const router = express.Router();

router.post('/register',  async (req, res, next) => {
    try{
        const validator = jsonschema.validate(req.body, userJsonSchema)
        if(!validator.valid){
            throw new ExpressError(`${validator.errors[0].message}`)
        }
        let body = (req.body)
        const response = await User.registerUser(body);
        const _token = createToken(response)
        return res.json({response, _token})
    }catch (err){
        return next(err)
    }
})


router.post('/login', async (req, res, next) => {
    try{
        const validator = jsonschema.validate(req.body, userLoginJsonSchema)
        if(!validator.valid){
            console.log('json error')
            throw new ExpressError(`${validator.errors[0].message}`)
        }
        let body = (req.body)
        const response = await User.loginUser(body);
        const _token = createToken(response)
        return res.json({response, _token})
    }catch (err){
        return next(err)
    }
})

router.patch('/update/:username', async (req, res, next) => {
    try{
        const validator = jsonschema.validate(req.body, userJsonSchema)
        if(!validator.valid){
            throw new ExpressError(`${validator.errors[0].message}`)
        }
        let body = (req.body)
        let user = req.params.username
        let response = await User.editUserProfile(body, user)
        return res.json({ response : response, msg : 'Successfull update'})
    }catch(err){
        return next(err)
    }
})

router.delete('/delete/:username', async (req, res, next) => {
    try{
        let user = req.params.username
        let response = await User.deleteUser(user)
        if(response){
            return res.json({ "Message" : "Deleted successfully"})
        }
    }catch(err){
        return next(err)
    }
})



module.exports = router;