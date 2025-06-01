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

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).select('+password');

    if (!existingUser) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await existingUser.comparePassword(password)

    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = existingUser.generateAuthToken();

    //TODO:  Try to remove hashed password too

    return res.status(200).json({
        token,
        user: existingUser
    });
}