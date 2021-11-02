const { func } = require('joi');
const { connect, connection } = require('mongoose');
const order = require('../models/order');
const {User,validate} = require('../models/user');
//order create
function create(req,res,next){
try {
  var productReferenceNo = req.body.productReferenceNo;
  var orderReferenceNumber = req.body.orderReferenceNumber;
  var orderAmount = req.body.orderAmount;
  var orderStatus =req.body.orderStatus;
  var email  =req.body.email;
  var createdAt = new Date();
  var createdBy  = req.body.createdBy;
  
  var orderData = new order({
    productReferenceNo,
    orderReferenceNumber,
    orderAmount,
    orderStatus,
    email:email,
    createdAt,
    createdBy
  })
  orderData.save().then((data)=>{
    res.status(200).send({msg: "Your order is created successfully..."})
  });
}catch(err){
    res.status(500).send({error: "Something Went to Wrong"})
}
}
//order update
function update(req,res,next){
        try {
            var productReferenceNo = req.body.productReferenceNo;
            var orderReferenceNumber = req.body.orderReferenceNumber;
            var orderAmount = req.body.orderAmount;
            var orderStatus =req.body.orderStatus;
            var email  =req.body.email;
            var updatedAt = new Date();
            var updatedBy  = req.body.updatedBy;

            var orderData = {
                productReferenceNo:productReferenceNo,
                orderReferenceNumber:orderReferenceNumber,
                orderAmount:orderAmount,
                orderStatus:orderStatus,
                email : email,
                updatedAt:updatedAt,
                updatedBy:updatedBy
            }

            order.findByIdAndUpdate(req.params.id,orderData, (err,data)=>{
                res.status(200).send({msg: "Your order is updated successfully..."})
            });
        }catch(err){
              res.status(500).send({error: "Something Went to Wrong"})
          }
}
//order cancel
function cancel(req,res,next){
    try {
        var orderStatus =req.body.orderStatus;
        var deletedAt = new Date();
        var deletedBy  = req.body.deletedBy;

        var orderData = {
            orderStatus:orderStatus,
            deletedAt:deletedAt,
            deletedBy:deletedBy
        }
        
        order.findByIdAndUpdate(req.params.id,orderData, (err,data)=>{
            res.status(200).send({msg: "Your order is cancelled successfully..."})
        });
    }catch(err){
          res.status(500).send({error: "Something Went to Wrong"})
    }
}
//get the order purchased count
function viewPurchasedListCount(req,res,next){
    try {
            order.aggregate([
                {$match: {email:req.params.email,orderStatus:1}},
                {$lookup: {
                    from: "users",
                    localField: "email",
                    foreignField: "email",
                    as: "user_info",
                  }
                },
                {
                  $unwind: "$user_info",
                },
                {$count: "Number of Product purchased"},

            ]).then((result) => {
                res.status(200).send(result)
            }).catch((error) => {
                res.status(500).send({error: "Something Went to Wrong"})
            });
        
    }catch(err){
          res.status(500).send({error: "Something Went to Wrong"})
    }
}
//get the serach and sort order
function viewPurchaseCustomerList(req,res,next){
     
    try{ 
        
        order.aggregate([
            {
                $match: {
                    $and : [ {
                                orderStatus : 1
                             },
                     {$or :[{
                           createdBy : { 
                            '$regex' :  new RegExp(req.body.searchValue) 
                           }
                        },
                        {
                            updatedBy: { 
                            '$regex' :  new RegExp(req.body.searchValue) 
                            }
                        },
                        {
                            email:{ 
                            '$regex' :  new RegExp(req.body.searchValue) 
                            },
                           
                        },
                        {
                            orderAmount:{ 
                            '$regex' :  new RegExp(req.body.searchValue) 
                            },
                           
                        },{
                            orderReferenceNumber:{ 
                                '$regex' :  new RegExp(req.body.searchValue) 
                                },
    
                        }]
                       }]
                       
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "email",
                    foreignField: "email",
                    as: "user_info",
                }
            },
            {
                $sort: {email:parseInt(req.body.sortList)}
            },
            {
                $unwind: "$user_info",
            },
        ]).then((result) => {
            res.status(200).send(result)
        }).catch((error) => {
            res.status(500).send({error: "Something Went to Wrong"})
        });
    }catch(err){
        res.status(500).send({error: "Something Went to Wrong"})
    }
}

module.exports.create = create;
module.exports.update = update;
module.exports.rem = cancel;
module.exports.viewPurchasedListCount = viewPurchasedListCount;
module.exports.viewPurchaseCustomerList = viewPurchaseCustomerList;
