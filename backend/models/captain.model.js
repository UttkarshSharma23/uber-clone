const moongose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema  = new moongose.Schema({
    fullname: {
        firstname: {
            type: String,      
            required: true,
            minlength: [3,'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,      
            required: true,
            minlength: [3,'Last name must be at least 3 characters long'],
        },
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },

    password: {
        type: String,   
        required: true,
        select : false,
        minlength: [6, 'Password must be at least 6 characters long'],
    },

    socketId: {
        type: String,
    },

    status:{
        type: String,
        enum : ['active', 'inactive'],
        default: 'inactive',
    },

    vehicle: {
        color:{
            type: String,
            required: true,
            minlength : [3, 'Color must be at least 3 characters long'],
        },
        plate:{
            type: String,
            required: true,
            match: [/^[A-Z0-9]{1,7}$/, 'Please fill a valid vehicle plate number'],
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,   
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
    },
    },

    location: {
        lat:{
            type: Number,
        },
        lng:{
            type: Number,
        },
    }
})


captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: '24h'}
    );
    
        return token;
}


captainSchema.method.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashpassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const Captain = moongose.model('captain', captainSchema);

module.exports = Captain;
