const express = require('express');
const router = express.Router();
const User = require("../controllers/userController");

router.post("/user", User.CreateUser);

router.get("/users", User.GetAllUsers);

router.get("/user/:userId", User.GetUserById);

router.patch("/user/:userId", User.UpdateUser);

router.delete("/user/:userId", User.DeleteUser);

module.exports = router;