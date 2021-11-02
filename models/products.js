const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name:String,
    image:Array,
    price:Number
})
module.exports = mongoose.model("Product",productSchema);