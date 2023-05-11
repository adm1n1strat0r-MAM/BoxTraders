const bcrypt = require('bcrypt');
const User = require("../models/user");

exports.CreateUser = async (req, res) => {
    try {
        const {name, username, password, phone, role} = req.body;

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const newUser = new User({name, username, phone, role, password: hashedPassword });

        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.GetAllUsers = async (req, res) => {
    try {
        const findUsers = await User.find();
        !findUsers
            ? res.status(404).json({ "message": "record not found" })
            : res.status(200).send(findUsers);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.GetUserById = async (req, res) => {
    try {
        let findUser = await User.findOne({ _id: req.params.userId });
        !findUser
            ? res.status(404).json({ "message": "record not found" })
            : res.status(200).send(findUser);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.UpdateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            req.body,
            {
                new: true,
            }
        );
        !updatedUser
            ? res.status(400).json({ "message": "record entry failed" })
            : res.status(201).send(updatedUser);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.DeleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(
            req.params.userId
        );
        !deletedUser
            ? res.status(404).send(false)
            : res.status(200).send(deletedUser);
    } catch (err) {
        res.status(500).send(err);
    }
}