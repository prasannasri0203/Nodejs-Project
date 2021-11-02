const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    prodcutName:String,
    productReferenceNo:Number,
    productPrice:Number,
    productDescription:String
})
module.exports = mongoose.model("ProductDetails",productSchema);