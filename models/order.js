const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    productReferenceNo:String,
    orderReferenceNumber:String,
    orderAmount:Number,
    orderStatus:Number, //1-ordered,2-cancelled
    email:String,
    createdAt: {
        type: Date,
        default: null,
      },
    createdBy:{
        type: String,
        default: null,
      },
    updatedAt: {
        type: Date,
        default: null,
      },
    updatedBy:{
        type: String,
        default: null,
      },
    deletedAt: {
        type: Date,
        default: null,
      },
    deletedBy:{
        type: String,
        default: null,
      }
})
module.exports = mongoose.model("order",orderSchema);