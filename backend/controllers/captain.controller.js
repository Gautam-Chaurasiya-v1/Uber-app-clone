const Captain = require("../models/captain.model");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklistToken.model.js")
const captainService = require("../services/captain.service.js");



module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExists = await Captain.findOne({ email });

    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: "Captain Already Exist" });
    }

    const hashPassword = await Captain.hashPassword(password);

    const newCaptain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })

    const token = newCaptain.generateAuthToken();

    res.cookie('token', token);

    return res.status(201).json({ token, captain: newCaptain });

}


module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const existingCaptain = await Captain.findOne({ email }).select('+password');

    if (!existingCaptain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordCheck = await existingCaptain.comparePassword(password);

    if (!passwordCheck) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = existingCaptain.generateAuthToken();

    res.cookie('token', token);

    return res.status(200).json({ token, captain: existingCaptain });
}


module.exports.captainProfile = async (req, res) => {
    return res.status(200).json(req.captain);
}


module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    await BlacklistToken.create({ token });

    res.clearCookie('token');

    return res.status(200).json({ message: 'Logged Out' })
}

