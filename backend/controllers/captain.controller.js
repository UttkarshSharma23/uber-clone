const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

const captainService = require('../services/captain.service');

const {validationResult} = require('express-validator');


module.exports.registerCaptain = async (req, res,next) => {
    const errors = validationResult(req);

    // Check for validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullname, email, password, vehicle} = req.body;

    // Check if the captain already exists
    const existingCaptain = await captainModel.findOne({ email });

    // If captain exists, return an error
    if (existingCaptain) {
        return res.status(400).json(
            { message: 'Captain already exists' }
        );
     }
    //console.log(req.body)
    const hashpassword = await captainModel.hashpassword(password);

    // Create a new captain using the service
    const captain = await captainService.createCaptain({
        email,  
        firstname: fullname.firstname,
        lastname: fullname.lastname,    
        password: hashpassword,
        color: vehicle.color,   
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });


    const token  = captain.generateAuthToken();
    res.status(201).json({ token, captain });
}


module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    // Check for validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if captain exists
    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password, captain.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate auth token
    const token = captain.generateAuthToken();
    

    res.cookie('token', token);

    res.status(200).json({ token, captain });
}


module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain : req.captain });
}


module.exports.logoutCaptain = async (req, res, next) => {

    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.clearCookie('token');

    res.status(200).json({ message: "Logged out successfully" });
}