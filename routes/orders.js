const express = require('express')
var router = express()
const create = require('../controller/order');
const viewPurchasedListCount = require('../controller/order');
const update = require('../controller/order');
const del= require('../controller/order');
const viewPurchaseCustomerList = require('../controller/order');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const configObj = require('../config/custom-environment-variables');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token,configObj.PrivateKey, (err,user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }
  
router.use(bodyparser.json());
router.post('/create',authenticateToken,create.create);
router.patch('/update/:id',authenticateToken,update.update);
router.post('/cancel/:id',authenticateToken,del.rem);
router.get('/list/:email',authenticateToken,viewPurchasedListCount.viewPurchasedListCount);
router.post('/list',authenticateToken,viewPurchaseCustomerList.viewPurchaseCustomerList);

module.exports = router;  