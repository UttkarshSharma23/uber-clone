const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullName : {
        firstName : {
            type : String,
            required : true,
            minlength : [3, 'First name must be aleast 3 characters long']
        },
        lastName : {
            type : String,
            minlength : [3, 'First name must be aleast 3 characters long']
        }
    },
    email : {
    type : String,
    required : true,
    unique : true,
    minlength : [5, ' Email must be of atleast 5 characters long']
    },
    // select is used so that this token is not send to user
    password : {
        type : String,
        required : true,
        select: false,
    },
    // Live tracking
    socketId : {
        type : String
    }
})


/* generating authToken */
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET)
    return token;
}


/* comparing the password*/
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password)
}

/* Hashing */
userSchema.statics.hashPassword = async function() {
    return await bcrypt.hash(password,10);
}


const userModel = mongoose.model('user',userSchema);


module.exports = userModel;