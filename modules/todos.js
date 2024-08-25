const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
     text:String,
     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'employees' },

})

module.exports  = mongoose.model("todos",employeeSchema) 