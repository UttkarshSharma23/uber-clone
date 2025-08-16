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

