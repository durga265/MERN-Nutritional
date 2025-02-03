const express = require('express');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Ensure correct import
const cors = require('cors');

// Importing models
const userModel = require('./models/userModel');
const foodModel = require('./models/foodModel'); 
const verifyToken = require('./verifyToken');
const trackingModel = require('./models/trackingModel');

// Database connection
mongoose.connect('mongodb://localhost:27017/Nutrition')
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
app.use(express.json());
app.use(cors());



// Endpoint for registering user
app.post('/register', async (req, res) => {
    let user = req.body;

    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(user.password, salt);
        user.password = hashedPassword;

        await userModel.create(user);
        res.status(201).send({ message: 'User Registered' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Some problem occurred' });
    }
});

// Endpoint for login
app.post('/login', async (req, res) => {
    let userCred = req.body;

    try {
        const user = await userModel.findOne({ email: userCred.email });
        if (user) {
            const isMatch = await bcryptjs.compare(userCred.password, user.password);
            if (isMatch) {
                const token = jwt.sign({ email: user.email }, 'kh4nfi3uyio', { expiresIn: '1h' });
                res.send({ message: 'Login successful', token: token });
            } else {
                res.status(403).send({ message: 'Incorrect password' });
            }
        } else {
            res.status(403).send({ message: 'User not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'An error occurred during login' });
    }
});


// Endpoint to fetch all products
app.get('/foods', verifyToken, async (req, res) => {
    try {
        let foods = await foodModel.find();
        res.send(foods);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Some problem while fetching info' });
    }
});

//endpoint to search food by name

app.get("/foods/:name",verifyToken,async (req,res)=>{

    try
    {
        let foods = await foodModel.find({name:{$regex:req.params.name,$options:'i'}})
        if(foods.length!==0)
        {
            res.send(foods);
        }
        else 
        {
            res.status(404).send({message:"Food Item Not Fund"})
        }
       
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"Some Problem in getting the food"})
    }
    

})

//endpoint to track a food
app.post("/track", verifyToken, async (req, res) => {
    const trackData = req.body;

    if (!trackData || !trackData.userId || !trackData.foodId || !trackData.quantity) {
        return res.status(400).send({ message: "Invalid input data." });
    }

    try {
        const data = await trackingModel.create(trackData);
        console.log("Data successfully added:", data);
        res.status(201).send({ message: "Food Added" });
    } catch (err) {
        console.error("Error adding food:", err);
        res.status(500).send({ message: "Some Problem in adding the food" });
    }
});




// // endpoint to fetch all foods eaten by a person 


const port = 8000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
