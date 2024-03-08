// server.js 
// BASE SETUP
//===============================================================
// Import Packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion } = require('mongodb');
const User = require('../models/user');
const uri = "mongodb+srv://dimitaratanassovse:8b8vsTgJ8WuZpDKV@goodeats.u8zzylz.mongodb.net/?retryWrites=true&w=majority&appName=GoodEats";

mongoose.connect(uri)
.then(() => {
    console.log("Connected to GoodEats MongoDB successfully");
})
.catch(() => {
    console.log("Error connecting to MongoDB:", err);
});


// Configure app to use bodyParser()
// helps us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

// Setting Port
const PORT = process.env.PORT || 5000;

// ROUTES FOR OUR API
//===============================================================
const router = express.Router();    // Express Router Instance

// User Sign Up
router.post('/signup', async (req,res) => {
    try {
        const {username, email, password} = req.body;
        
        // Unique Email Check
        const existingEmail = await User.findOne({email});
        if (existingEmail) {
            return res.status(400).json({error: 'Email already exists'});
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password,10);
        
        // Create a User to store in DB
        const newUser = new User({username, email, password: hashedPassword});

        // Store User
        await newUser.save();

        // Respond w Success
        res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        console.error('Error creating user: ', error);
        res.status(500).json({error: 'Internal server error'});
    }
    
});
// Test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req,res) {
    res.json({message: 'hooray! welcome to GoodEats api!'});
})

// Register Routes
// all of our routes will be prefixed with /api
app.use('/goodeatsapi',router);

// START SERVER
//===============================================================
app.listen(PORT)
console.log('Live on port: ' + PORT);