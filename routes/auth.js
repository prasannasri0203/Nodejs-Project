const config = require('config');
const configObj = require('../config/custom-environment-variables');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
// validate the exist record and insert data.
router.post('/', async (req, res) => {
   
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    //  Now find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }

    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    const token = jwt.sign({ _id: user._id },configObj.PrivateKey);
    res.header('x-auth-token', token).send(user);
});

function validate(req) {
    const schema = Joi.object().keys({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()

   });
    return schema.validate(req);
}

module.exports = router; 