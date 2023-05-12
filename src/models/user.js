const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");


const AccountType = ['admin', 'user'];

const userSchema = new mongoose.Schema({
    name:{type : String, required: true},
    username : {type : String, required: true, unique: true},
    password: {type : String, required: true},
    phone : {type : String, required: true},
    role: {type : String, required: true, enum : AccountType, default : 'user'},
    tokens : [{
        token : {type : String, required : true}
    }]
});

// Generate the jwt token
userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ username: this.username, role: this.role }, config.ACCESS_TOKEN_SECRET);
    this.tokens.push({ token });
    await this.save();
    return token;
};
// Generate refresh token
userSchema.methods.generateRefreshToken = async function () {
    const token = jwt.sign({ username: this.username }, config.REFRESH_TOKEN_SECRET);
    this.tokens.push({ token });
    await this.save();
    return token;
};

// Define the comparePassword method
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model('User', userSchema);
