const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
      employeeName: {
        type: String,
        required: true
      },
      employeeSalary: {
        type: String,
        required: true
      },
      Adress: {
       type: String,
       required: true
      },
});

module.exports =  mongoose.model('Emp', empSchema);