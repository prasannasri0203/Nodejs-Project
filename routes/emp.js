const express = require('express')
var router = express()
const create = require('../controller/emp');
const view = require('../controller/emp')
const update = require('../controller/emp')
const del= require('../controller/emp');
const bodyparser = require('body-parser');
var multer  = require('multer');
const Emp = require('../models/emp');
const { exist } = require('joi');

router.post('/add',function(req, res, next) {
  console.log(req.body);
  exist;
    let employeeName = req.body.employeeName;
    let employeeSalary = req.body.employeeSalary;
    let Adress = req.body.Adress;
    let emp = new Emp({
      employeeName,
      employeeSalary,
      Adress
    })
    emp.save().then((data)=>{
        res.send({success: "add successfully",status:200});
    })
    .catch((err)=>{
        res.send({success:"something went to wrong",status:500});
    });
  });

  router.get('/read',function(req, res, next) {
        
    Emp.find({}).then((data)=>{
        res.send({data:data,status:200}) 
    })
    .catch((err)=>{
        res.send({success:"something went to wrong",status:500});
    });
  });
  
  router.get('/edit/:id',function(req, res, next) {
    
    Emp.findById(req.params.id, function (err, docs) {
      if (err){
          console.log(err);
      }else{
        console.log("Result : ", docs);
        res.send({data:docs,status:200}) 
      }
    });
  });

  router.put('/update/:id',function(req, res, next) {

    const empData = {
        employeeName: req.body.employeeName,
        employeeSalary:  req.body.employeeSalary,
        Adress: req.body.Adress
      };

    Emp.findByIdAndUpdate(req.params.id,empData, (err,emp)=>{
    
        if (err) {
          return res.status(500).send({error: "Problem with Updating the register recored ","err":err})
        };
        res.send({success: "Update successfull",status:200});
    })
  });

  router.delete('/delete/:id',function(req, res, next) {

    Emp.findByIdAndDelete(req.params.id, (err,emp)=>{
      if(err){
        return res.status(500).send({error: "Problem with Deleting the record"});
      }
      return res.status(200).send({success: "Delete Sucessfully"});
    })
  });

module.exports = router;