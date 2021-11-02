const express = require('express');
const router = express.Router();
var multer = require('multer');
var productDetails = require("../models/product_details");
const xlsxFile = require('read-excel-file/node');
const excel = require("exceljs");
const reader = require('xlsx');
const jwt = require('jsonwebtoken');
const configObj = require('../config/custom-environment-variables');

// token middleware
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
//validate the file
const excelFilter = (req, file, cb) => {
  if (file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml"))
    {
      cb(null, true);
    } else {
      cb("Please upload only excel file.", false);
    }
  };
//file upload
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "E:/test/public/upload");
    },
    filename: (req, file, cb) => {
      console.log(file.originalname);
      cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
    },
  });
  
  var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
//add product details
router.post("/add_product_details",authenticateToken,uploadFile.single("file"),(req,res)=>{
    let path ="E:/test/public/upload/"+req.file.filename;
    const file = reader.readFile(path);
     
    let data = []
    const sheets = file.SheetNames
    for(let i = 0; i < sheets.length; i++)
    {
       const temp = reader.utils.sheet_to_json(
       file.Sheets[file.SheetNames[i]])
       temp.forEach((res) => {
        var productName = res.product_name;
        var productReferenceNo =res.product_reference_no;
        var productPrice = res.product_price;
        var productDescription = res.product_description;
        var newProduct = {prodcutName:productName,productReferenceNo:productReferenceNo,productPrice:productPrice,productDescription:productDescription};
        productDetails.find({productReferenceNo:res.product_reference_no}, function (err, docs) {
            if(docs.length){
                productDetails.updateOne(docs._id, newProduct, function(err, res) {
                    if (err) throw err;
                    console.log("1 document updated");
                }); 
            }else{
                productDetails.create(newProduct,(err,data)=>{
                    if (err) throw err;
                    console.log("1 document inserted");
                });
            }
            });
        });
    }
    res.send({success: "All the Data is uploaded database Successfully"});
});

module.exports = router;
