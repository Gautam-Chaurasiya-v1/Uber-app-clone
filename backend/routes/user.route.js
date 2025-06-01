const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller.js');
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post('/registerUser',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({ min: 3 }).withMessage('First name should be of atleast 3 character'),
        body('password').isLength({ min: 6 }).withMessage('Password must be of more than 6 characters')
    ],
    userController.registerUser
)

router.post('/loginUser',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 character')
    ],
    userController.loginUser
)

router.get('/userProfile',
    authMiddleware,
    userController.getUserProfile
)

router.get('/logoutUser',
    authMiddleware,
    userController.logoutUser
)


module.exports = router;