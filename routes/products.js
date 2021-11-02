const express = require('express');
const router = express.Router();
var multer = require('multer');
var Product = require("../models/products");

//Show product and homepage
router.get("/",(req, res)=>{
    Product.find({},(err,products)=>{
        if (err) {console.log(err);
        }else{
            res.render("product",{products: products});
        }
    });
});

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});

//add Product
router.post("/add",upload.array('image', 2),(req,res)=>{
    
    var name = req.body.name;
    var image = req.files;
    var price = req.body.price;

    var newProduct = {name:name,image:image,price:price};
    Product.create(newProduct,(err,data)=>{
        if(err){
            console.log(err);
        }else {
            console.log(data);
            res.redirect("/");
        }
    });
});

//Get EditForm
router.get("/:id/edit",(req,res)=>{
    Product.findById(req.params.id,function (err, product){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            res.render("edit",{product: product});
        }
    });
});

router.put("/:id/edit",upload.array('image', 2),(req, res)=>{
   
    var name = req.body.name;
    var image =req.files;
    var price = req.body.price;
    var editProduct = {name:name,image:image,price:price};
    
    Product.findByIdAndUpdate(req.params.id,editProduct,function(err,updatedata){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            res.redirect("/");
        }
    });
});

//Delete the product
router.delete("/:id",(req,res)=>{
    Product.findByIdAndRemove(req.params.id,function (err){
        if(err){
            console.log(err);
            res.redirect("/");
        }else {
            res.redirect("/");
            }
    });
    });

module.exports = router;

