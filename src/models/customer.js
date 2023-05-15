const mongoose = require("mongoose");

const customerSchema = mongoose.schema({
    name : {type : String, required: true},
    companyname : {type : String},
    phone:{type : String, required: true},
})