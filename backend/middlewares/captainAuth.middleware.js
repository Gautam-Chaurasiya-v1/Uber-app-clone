const jwt = require("jsonwebtoken");
const Captain = require('../models/captain.model');
const BlacklistToken = require("../models/blacklistToken.model");

const captainAuthMiddleware = async (req, res, next) => {

    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized 1' });
    }

    const isBlacklisted = await BlacklistToken.findOne({ token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized 2' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const captain = await Captain.findById(decoded._id);

        if (!captain) {
            return res.status(401).json({ message: "Captain not found" });
        }

        req.captain = captain;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized 3" })
    }
}


module.exports = captainAuthMiddleware;