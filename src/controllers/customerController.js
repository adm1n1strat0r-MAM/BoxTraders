const customer = require("../models/customer");

exports.CreateCustomer = async (req, res) => {
    try {
        const newCustomer = await customer(req.body);
        const savedCustomer = await newCustomer.save();
        !savedCustomer
            ? res.status(400).json({ message: "the record is failed to save" })
            : res.status(201).json(savedCustomer);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.GetAllCustomers = async (req, res) => {
    try {
        const customers = await customer.find();
        !customers
            ? res.status(404).json({ message: "reord not found" })
            : res.status(200).send(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.GetCustomerById = async (req, res) => {
    try {
        const customer = await customer.findOne({ _id: req.params.id });
        !customer
            ? res.status(404).json({ message: "reord not found" })
            : res.status(200).send(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.UpdateCustomer = async (req, res) => {
    try {
        const customer = await customer.findByIdAndUpdate({ id: req.params.id }, req.body, { new: true });
        !customer
            ? res.status(404).json({ message: "reord not found" })
            : res.status(200).send(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.DeleteCustomer = async (req, res) => {
    try {
        const customer = await customer.findByIdAndDelete(
            req.params.userId
        );
        !customer
            ? res.status(404).send(false)
            : res.status(200).send(customer);
    } catch (err) {
        res.status(500).send(err);
    }
}