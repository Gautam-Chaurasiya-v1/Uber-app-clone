const User = require("../models/user.model.js")
const userService = require("../services/user.service.js")
const { validationResult } = require("express-validator");


module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { fullname, email, password } = req.body;
    const { firstname, lastname } = fullname;

    const hashPassword = await User.hashPassword(password);

    const newUser = await userService.createUser({
        firstname,
        lastname,
        email,
        password: hashPassword
    })

    const token = newUser.generateAuthToken();

    res.status(201).json({ token, newUser });
}