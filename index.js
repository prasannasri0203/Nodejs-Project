const mongoose = require('mongoose');
const users = require('./routes/users');
const uploadData = require('./routes/filedata');
const auth = require('./routes/auth');
const productRoute = require("./routes/products");
const productDetaisRoute = require("./routes/product_details");
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const routerEmp = require('./routes/emp');
// enable CORS using npm package
var cors = require('cors');

app.use(cors());

mongoose.connect('mongodb://localhost/test_emp')
  .then(()=>console.log('now connected to mongodb'))
  .catch(err=>console.error('Something went Wrong',err));
  
app.use(express.json());

// app.use('*', function (req, res) {
//   res.status(404).send({error: "This url is not defined."})
// });

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/filedata',uploadData);
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended:true }));
app.use(methodOverride("_method"));
app.use('/',productRoute);
app.use( express.static( "public" ) );
app.use('/emp',routerEmp);
app.use('/api',productDetaisRoute);
const port = process.env.PORT || 4000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));

