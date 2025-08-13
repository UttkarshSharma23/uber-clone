const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
module.exports.authUser = async (req,res,next)=>{
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    //check existence of token
    if(!token){
        return res.status(401).json({ message: "Unauthorized access" });
    }

    //decode token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = user;

        return next();
        
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}