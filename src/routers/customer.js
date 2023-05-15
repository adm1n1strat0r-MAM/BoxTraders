const express = require("express");
const router = express.Router();
const customer = require("../controllers/customerController");
const authorization = require("../middlewares/authorization");

router.post('/customer', authorization.isAdmin, customer.CreateCustomer);

router.get('/customers', authorization.isAdmin, customer.GetAllCustomers);

router.get('/customer/:id', authorization.isAdmin, customer.GetCustomerById);

router.patch('/customers/:id', authorization.isAdmin, customer.UpdateCustomer);

router.get('/customers/:id', authorization.isAdmin, customer.DeleteCustomer);

module.exports = router;