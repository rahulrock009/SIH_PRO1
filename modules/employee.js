const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
     name:String,
     email: String,
     pass: String

})

module.exports  = mongoose.model("employees",employeeSchema) 