const express = require("express");
const router = express.Router();
const captainController = require("../controllers/captain.controller");
const { body } = require("express-validator");

router.post('/registerCaptain',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({ min: 3 }).withMessage('First name should be of atleast 3 character'),
        body('password').isLength({ min: 6 }).withMessage('Password must be of more than 6 characters'),
        body('vehicle.color').isLength({ min: 3 }).withMessage('Color should be of atleast 3 character'),
        body('vehicle.plate').isLength({ min: 10, max: 10 }).withMessage('Vehicle plate must be exactly 10 characters long'),
        body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be atleast 1'),
        body('vehicle.vehicleType').isIn(['car', 'auto', 'bike']).withMessage('Invalid vehicle type')
    ],
    captainController.registerCaptain
)



module.exports = router;