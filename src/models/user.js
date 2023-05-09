const mongoose = require('mongoose');

const AccountType = ['manager', 'user'];

const userSchema = new mongoose.Schema({
    name:{type : String, required: true},
    username : {type : String, required: true, unique: true},
    password: {type : String, required: true},
    phone : {type : String, required: true},
    accounttype: {type : String, required: true, enum : AccountType, default : 'user'},
});

module.exports = mongoose.model('User', userSchema);
