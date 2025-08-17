const express = require('express');

const router = express.Router();

const { body } = require("express-validator");


const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Register route for captain
router.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'),

  body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),

  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),

  body('vehicle.plate')
    .matches(/^[A-Z]{2}\s?\d{2}\s?[A-Z]{1,2}\s?\d{1,4}$/i)
    .withMessage('Please fill a valid vehicle plate number'),

  body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),

  body('vehicle.vehicleType').isLength({ min: 3 }).withMessage('Vehicle type must be at least 3 characters long')
],

  captainController.registerCaptain
)

// Login route for captain
router.post('/login', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], captainController.loginCaptain);


router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);


router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;