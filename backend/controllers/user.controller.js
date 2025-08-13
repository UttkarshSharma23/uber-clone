const userModel = require('../models/user.model');
const userService = require('../services/user.service.js');
const { validationResult } = require("express-validator");


// Register user
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullname, email, password } = req.body;

    // Already a user
    const isUserAlready = await userModel.findOne({ email });
    if (isUserAlready) {
        return res.status(400).json({ message: "User already exist" })
    }

    console.log(req.body)
    //hashing done
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
}


// Login user
module.exports.loginUser = async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email }).select('+password');

        if(!user){
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = user.generateAuthToken();
        res.status(200).json({ token, user });
}