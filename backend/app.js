// Importing environment variables
const dotenv = require('dotenv');
dotenv.config();

// Importing necessary modules
const express = require("express");
const cors = require('cors');
const app = express();

// Importing cookie parser for handling cookies
const cookieParser = require('cookie-parser');

// Importing database connection
const connectToDb = require('./db/db');

// Importing routes
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes');


connectToDb();

// Middleware setup
app.use(cors());

// Parsing JSON data
app.use(express.json());

// Parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Using cookie parser middleware
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send("Hello");
})


// Using routes
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);



module.exports = app;