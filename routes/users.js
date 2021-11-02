const bcrypt = require('bcrypt');
const Joi = require('joi'); 
const {User,validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/',async(req,res)=>{
    
    const {error} = validate(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }
    
    let user =await User.findOne({email:req.body.email});
    console.log(user);
    if(user){
        return res.status(400).send('That user already exists!');

    }else{
    
        user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    }
});

module.exports =router;
