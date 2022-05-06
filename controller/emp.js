const { connect, connection } = require('mongoose');
const Emp = require('../models/emp');

function create(req,res,next){

  let name = req.body.name;
  let age = req.body.age;
  let photo = req.body.photo;
  let emp = new Emp({
    name,
    age,
    photo
  })
  emp.save().then((data)=>{
    res.send(data)
  })
}

function view(req,res,next){
    Emp.find({}).then((data)=>{
      res.send(data)
    })
}

function update(req,res,next){
    Emp.findByIdAndUpdate(req.params.id,req.body, (err,emp)=>{
      if (err) {
        return res.status(500).send({error: "Problem with Updating the Employee recored "})
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

module.exports.create = create;
module.exports.view = view;
module.exports.update = update;
module.exports.rem = remove;