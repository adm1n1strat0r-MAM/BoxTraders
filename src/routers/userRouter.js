const express = require('express');
const router = express.Router();
const User = require("../controllers/userController");
const auth = require("../controllers/authController");
const authorization = require("../middlewares/authorization");

router.post('/login', auth.SignIn);

router.post("/user", authorization.isAdmin, User.CreateUser);

router.get("/users", User.GetAllUsers);

router.get("/user/:userId", User.GetUserById);

router.patch("/user/:userId", User.UpdateUser);

router.delete("/user/:userId", User.DeleteUser);

module.exports = router;