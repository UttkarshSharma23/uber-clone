const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
module.exports.authUser = async (req,res,next)=>{
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    //check existence of token
    if(!token){
        return res.status(401).json({ message: "Unauthorized access" });
    }

//NOTE:
    /*
     * check blacklist token this is done as the user can share the logout token with other person on other device
     * so that person can not use the token to access the user profile
     * This is a simple implementation, in production you might want to use a more robust solution
     * like storing blacklisted tokens in a database or cache 
     */ 
      
    const isBlacklisted = await userModel.findOne({token : token});

    //check if token is blacklisted
    if(isBlacklisted){
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