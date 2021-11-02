const express = require('express')
var router = express()
const create = require('../controller/emp');
const view = require('../controller/emp')
const update = require('../controller/emp')
const del= require('../controller/emp');
const bodyparser = require('body-parser');

router.use(bodyparser.json())
router.post('/create',create.create)
router.get('/',view.view)
router.patch('/:id',update.update)
router.delete('/delete/:id',del.rem)

router.post('/create_mysql',create.create_mysql)
router.get('/view_mysql',view.view_mysql)
router.patch('/update_mysql/:id',update.update_mysql)
router.delete('/delete_mysql/:id',del.delete_mysql)
module.exports = router;