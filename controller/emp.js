const { connect, connection } = require('mongoose');
const Emp = require('../models/emp');

function create(req,res,next){
  let empName = req.body.empName;
  let empEmail = req.body.empEmail;
  let empMobile = req.body.empMobile;
  let emp = new Emp({
    empName,
    empEmail,
    empMobile
  })
  emp.save().then((data)=>{
    res.send(data)
  })
}

function create_mysql(req,res,next){
  var params = req.body;
  connection.query('',function(err,result,field){
    if(err) throw err;
    console.log(result);
      res.send("Not Inserted...");
  });
}

function view(req,res,next){
    Emp.find({}).then((data)=>{
      res.send(data)
    })
}

function view_mysql(req,res,next){
  Emp.find({}).then((data)=>{
    res.send(data)
  })
}

function update(req,res,next){
    Emp.findByIdAndUpdate(req.params.id,req.body, (err,emp)=>{
      if (err) {
        return res.status(500).send({error: "Problem with Updating the   Employee recored "})
      };
      res.send({success: "Updation successfull"});
  })
}

function update_mysql(req,res,next){
  Emp.findByIdAndUpdate(req.params.id,req.body, (err,emp)=>{
    if (err) {
      return res.status(500).send({error: "Problem with Updating the   Employee recored "})
    };
    res.send({success: "Updation successfull"});
})
}

function remove(req,res,next){
    Emp.findByIdAndDelete(req.params.id, (err,emp)=>{
      if(err){
        return res.status(500).send({error: "Problem with Deleting the record"});
      }
      res.send({success: 'Employee deleted successfully'})
    })
  }
  function delete_mysql(req,res,next){
    Emp.findByIdAndDelete(req.params.id, (err,emp)=>{
      if(err){
        return res.status(500).send({error: "Problem with Deleting the record"});
      }
      res.send({success: 'Employee deleted successfully'})
    })
  }

module.exports.create = create;
module.exports.view = view;
module.exports.update = update;
module.exports.rem = remove;
module.exports.create_mysql =create_mysql;
module.exports.view_mysql =view_mysql;
module.exports.update_mysql =update_mysql;
module.exports.delete_mysql =delete_mysql;